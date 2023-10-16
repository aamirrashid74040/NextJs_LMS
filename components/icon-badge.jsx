import { LucideIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// variants for background color of the icon badge
const backgroundVariants = cva(
  "rounded-md flex items-center justify-center overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-sky-100",
        success: "bg-emerald-100",
        secondary: "bg-slate-100",
      },
      size: {
        default: "p-2",
        sm: "p-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-sky-700",
      success: "text-emerald-700",
      secondary: "text-slate-900",
    },
    size: {
      default: "h-8 w-8",
      sm: "h-4 w4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const IconBadge = ({ icon: Icon, variant, size }) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))}></Icon>
    </div>
  );
};
