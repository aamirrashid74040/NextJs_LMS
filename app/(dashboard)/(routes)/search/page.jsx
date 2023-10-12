import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";

const Search = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="mt-5 px-6 block md:hidden">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories data={categories} />
      </div>
    </>
  );
};

export default Search;
