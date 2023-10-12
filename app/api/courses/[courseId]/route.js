import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    // pulling the courseId from params
    const { courseId } = params;
    // pulling the values from req object
    const values = await req.json();

    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    // updating the course title
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    // console.log("COURSE-ID: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { courseId } = params;
    const { userId } = auth();

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) return new NextResponse("Not found", { status: 404 });

    // then delete all the chapters videos
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("COURSE DELETE", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
