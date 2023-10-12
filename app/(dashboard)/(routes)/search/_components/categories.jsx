"use client";
import React from "react";
import CategoryItem from "./category-item";

const Categories = ({ data }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {data.map((category) => (
        <CategoryItem
          key={category.id}
          label={category.name}
          value={category.id}
        />
      ))}
    </div>
  );
};

export default Categories;
