"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary px-4 py-2.5 text-primary-foreground hover:bg-teal-700 focus-visible:outline-teal-700",
        secondary: "bg-zinc-100 px-4 py-2.5 text-zinc-950 hover:bg-zinc-200 focus-visible:outline-zinc-500",
        outline: "border border-zinc-300 bg-white px-4 py-2.5 text-zinc-950 hover:bg-zinc-50 focus-visible:outline-zinc-500",
        ghost: "px-3 py-2 text-zinc-700 hover:bg-zinc-100"
      },
      size: {
        default: "h-10",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
