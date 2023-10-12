"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce({ value, delay: 500 });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId");
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [categoryId, debouncedValue, pathname, router]);

  return (
    <div className="relative">
      <Search className="absolute text-slate-600 h-4 w-4 top-3 left-3" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[320px] rounded-full pl-8 bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search here..."
      />
    </div>
  );
};

export default SearchInput;
