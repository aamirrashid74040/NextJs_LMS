import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!userId || !courseOwner)
      return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachement.delete({
      where: {
        courseId: params.courseId,
        id: params.attId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
