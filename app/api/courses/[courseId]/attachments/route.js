import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!userId || !courseOwner)
      return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachement.create({
      data: {
        url,
        name: url?.split("/").pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENTS: ", error?.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
