import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
export async function PUT(req, { params }) {
  try {
    const courseId = params.courseId;
    const { list } = await req.json();
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownerCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownerCourse) return new NextResponse("Unauthorized", { status: 401 });

    // updating the position one by one
    for (let item in list) {
      await db.chapter.update({
        where: { id: list[item].id },
        data: { position: list[item].position },
      });
    }

    return new NextResponse("Reordered success", { status: 200 });
  } catch (error) {
    console.log("[REORDER CHAPTERS]", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
