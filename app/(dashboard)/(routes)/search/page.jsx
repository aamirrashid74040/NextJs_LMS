import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getAllCourses } from "@/db-actions/get-courses";
import CoursesList from "@/components/courses-list";

const Search = async ({ searchParams }) => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getAllCourses({
    userId,
    ...searchParams,
  });
  // console.log(courses);
  return (
    <>
      <div className="mt-5 px-6 block md:hidden">
        <SearchInput />
      </div>
      <div className="p-6 space-y-3">
        <Categories data={categories} />

        <CoursesList courses={courses} />
      </div>
    </>
  );
};

export default Search;
