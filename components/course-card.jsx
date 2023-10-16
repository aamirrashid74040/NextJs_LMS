import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconBadge } from "./icon-badge";
import { Book } from "lucide-react";
import { formatPrice } from "@/lib/formats";

const CourseCard = ({ course }) => {
  console.log(course);
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="p-3 border transition h-full rounded-md hover:shadow-md overflow-hidden group">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill alt={course.title} src={course.imageUrl} />
        </div>
        <div className="flex flex-col mt-2">
          <h1 className="text-slate-600 text-lg font-medium md:text-base line-clamp-2 group-hover:text-sky-600 transition">
            {course.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {course.category.name}
          </p>
          <div className="my-3 flex items-center text-sm">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={Book} />
              <span className="italic">
                {course.chapters.length}
                {course.chapters.length === 1 ? " Chapter" : " Chapters"}
              </span>
            </div>
          </div>
          {course.progress !== null ? (
            <div>TODO: Progress</div>
          ) : (
            <p className="text-md md:text-sm  font-medium text-muted-foreground">
              {formatPrice(course.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
