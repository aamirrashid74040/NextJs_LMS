import { db } from "@/lib/db";

export const getCourseProgress = async (courseId, userId) => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const completedChapters = await db.useProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPerc = (completedChapters / publishedChapterIds.length) * 100;
    return progressPerc;
  } catch (error) {
    console.log("COURSE_PROGRESS", error.message);
    return 0;
  }
};
