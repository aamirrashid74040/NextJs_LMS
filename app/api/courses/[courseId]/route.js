import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

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
    console.log("COURSE-ID: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
