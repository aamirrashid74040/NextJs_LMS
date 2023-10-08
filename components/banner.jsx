import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { AlertTriangle, CheckCheckIcon } from "lucide-react";
import React from "react";

const bannerVarients = cva(
  "text-sm border text-center p-4 w-full flex items-center",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-300 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconsOptions = {
  warning: AlertTriangle,
  success: CheckCheckIcon,
};

const Banner = ({ label, variant }) => {
  const Icon = iconsOptions[variant || "warning"];
  return (
    <div className={cn(bannerVarients({ variant }))}>
      <Icon className="h-5 w-5 mr-2" />
      {label}
    </div>
  );
};

export default Banner;
