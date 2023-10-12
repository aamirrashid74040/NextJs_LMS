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
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course)
      return new NextResponse("Not found the course", { status: 404 });

    // it will return true if one of the chapter is published
    const hasPublishedChapters = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedChapters
    ) {
      return new NextResponse("Missing fields exists", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("COURSE PUBLISH", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}