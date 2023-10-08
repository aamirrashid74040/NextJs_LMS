import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { courseId, chapterId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownereCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!ownereCourse) return new NextResponse("Unauthorized", { status: 401 });

    const unPublishedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });

    // un publish the entire course if all the chapters of particular course are unpublished
    const allPublishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (!allPublishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(unPublishedChapter);
  } catch (error) {
    console.log("CHAPTER_PUBLISH", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
