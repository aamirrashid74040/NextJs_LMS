import { db } from "@/lib/db";
import { getCourseProgress } from "./get-course-progress";

export const getAllCourses = async ({ userId, title, categoryId }) => {
  try {
    const allCourses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const courseWithProgress = await Promise.all(
      allCourses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPerc = await getCourseProgress(course.id, userId);
        return {
          ...course,
          progress: progressPerc,
        };
      })
    );
    return courseWithProgress;
  } catch (error) {
    console.log("GET_ALL_COURSES", error.message);
    return [];
  }
};
