import React from "react";
import CourseCard from "./course-card";

const CoursesList = ({ courses }) => {
  return (
    <div>
      {courses.length === 0 && (
        <div className="text-sm text-center text-muted-foreground mt-5">
          No Course Found
        </div>
      )}
      {courses.length !== 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesList;
