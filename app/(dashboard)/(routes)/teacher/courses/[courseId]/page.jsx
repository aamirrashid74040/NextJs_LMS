import React from "react";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSign,
  LayoutDashboard,
  ListChecksIcon,
  Paperclip,
} from "lucide-react";
import TitleForm from "./_components/title-form";
import DescForm from "./_components/desc-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChapterForm from "./_components/chapters-form";

const CoursePage = async ({ params }) => {
  // only the creator of the course can see and modify the coures
  // fetching the id of user
  const { userId } = auth();

  if (!userId) return redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      attachements: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  // fetching the categories
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) return redirect("/");

  // required fields
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionFieldText = `Complete all the fields (${completedFields}/${totalFields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-xl md:text-2xl font-medium text-slate-600">
            Course Setup
          </h1>
          <span className="text-slate-600 text-sm">{completionFieldText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <div>
          <div className="flex items-center gap-x-2 ">
            <IconBadge icon={LayoutDashboard} />
            <h1 className="text-xl font-semibold text-slate-700">
              Customise your course
            </h1>
          </div>
          {/* title form */}
          <TitleForm initialData={course} courseId={course.id} />
          <DescForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecksIcon} />
              <h1 className="text-xl font-semibold text-slate-700">
                Course Chapters
              </h1>
            </div>
            <ChapterForm initialData={course} courseId={course.id} />
          </div>
          {/* price container */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h1 className="text-xl font-semibold text-slate-700">
                Set the Price
              </h1>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Paperclip} />
                <h1 className="text-xl font-semibold text-slate-700">
                  Resources & Attachments
                </h1>
              </div>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
