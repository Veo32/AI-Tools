"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
