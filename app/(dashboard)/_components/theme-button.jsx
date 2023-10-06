"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const handleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };
  return (
    <button
      onClick={handleTheme}
      className="p-2 text-sm rounded-xl bg-slate-100 hover:bg-slate-200"
    >
      {resolvedTheme === "light" ? (
        <span className="flex items-center gap-x-1 text-slate-600 font-semibold">
          Dark <Moon size={18} />
        </span>
      ) : (
        <span className="flex items-center gap-x-1 text-slate-600 font-semibold">
          Light <Sun size={18} />
        </span>
      )}
    </button>
  );
};

export default ThemeButton;
