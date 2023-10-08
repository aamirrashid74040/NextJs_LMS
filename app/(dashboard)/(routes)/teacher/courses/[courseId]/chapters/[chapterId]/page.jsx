import React, { Fragment } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Video, View } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import TitleForm from "./_components/title-form";
import DescForm from "./_components/desc-form";
import AccessForm from "./_components/access-form";
import VideoForm from "./_components/video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";

const ChapterIdPage = async ({ params }) => {
  const { userId } = auth();
  const { courseId, chapterId } = params;
  if (!userId) return redirect("/");

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) return redirect("/");
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionFieldText = `Complete all the fields (${completedFields}/${totalFields})`;

  // this will only true if all the required field filled
  const isCompleted = requiredFields.every(Boolean);

  return (
    <Fragment>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is currently not visiable as it is not published yet."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              className="text-slate-700 text-sm flex items-center gap-x-2 hover:opacity-70"
              href={`/teacher/courses/${courseId}`}
            >
              <ArrowLeft className="h-5 w-5" />
              Back to course page
            </Link>
            <div className="flex items-center w-full justify-between mt-4 ">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-xl md:text-2xl font-medium text-slate-600">
                  Course Setup
                </h1>
                <span className="text-slate-600 text-sm">
                  {completionFieldText}
                </span>
              </div>
              <ChapterActions
                disabled={!isCompleted}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h1 className="text-xl font-semibold text-slate-700">
                Customise course chapter
              </h1>
            </div>
            <TitleForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
            <DescForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
            <div>
              <div className="flex items-center gap-x-2 mt-5">
                <IconBadge icon={View} />
                <h1 className="text-xl font-semibold text-slate-700">
                  Access & Permissions
                </h1>
              </div>
              <AccessForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h1 className="text-xl font-semibold text-slate-700">
                Chapter Video
              </h1>
            </div>
            {/* hhh */}
            <VideoForm
              initialData={chapter}
              chapterId={chapterId}
              courseId={courseId}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChapterIdPage;
