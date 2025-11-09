"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        success: "bg-green-200/30 dark:bg-green-800/30",
        warning: "bg-yellow-200/30 dark:bg-yellow-800/30",
        destructive: "bg-red-200/30 dark:bg-red-800/30",
        secondary: "bg-secondary/30",
        subtle: "bg-muted",
      },
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: true,
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  showLabel?: boolean;
  labelPosition?: "inside" | "outside";
  indeterminate?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      variant,
      size,
      rounded,
      showLabel = false,
      labelPosition = "outside",
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percent = Math.min(100, Math.max(0, value));

    return (
      <div className="w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ variant, size, rounded }), className)}
          value={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={indeterminate ? undefined : percent}
          aria-valuetext={indeterminate ? "Loading…" : `${percent}%`}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full transition-all duration-500 ease-in-out",
              indeterminate
                ? "animate-progress-indeterminate"
                : "bg-primary"
            )}
            style={{
              width: indeterminate ? "40%" : `${percent}%`,
              transform: indeterminate ? "translateX(0%)" : "none",
            }}
          />
          {showLabel && labelPosition === "inside" && (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-primary-foreground">
              {`${percent}%`}
            </span>
          )}
        </ProgressPrimitive.Root>

        {showLabel && labelPosition === "outside" && (
          <span className="mt-1 block text-xs font-medium text-muted-foreground text-right">
            {indeterminate ? "Loading…" : `${percent}%`}
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress, progressVariants };
