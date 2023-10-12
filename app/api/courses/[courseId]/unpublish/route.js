import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 400 });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course)
      return new NextResponse("Not found the course", { status: 404 });

    const unPublishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(unPublishedCourse);
  } catch (error) {
    console.log("COURSE UNPUBLISH", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
