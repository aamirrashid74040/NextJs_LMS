"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
const CategoryItem = ({ label, value }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId");
  const title = searchParams.get("title");

  const isSelected = categoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          title,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2 rounded-full border border-slate-300 text-sm text-slate-600 hover:border-sky-600 transition truncate",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-700"
      )}
    >
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
