import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, AlertCircle, Check } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus:border-primary",
        outline: "border border-input bg-background",
        subtle: "border-transparent bg-muted hover:bg-muted/80",
        ghost: "border-none bg-transparent focus-visible:ring-0 shadow-none",
      },
      state: {
        normal: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-600 focus-visible:ring-green-600",
        warning: "border-yellow-500 focus-visible:ring-yellow-500",
      },
      size: {
        sm: "h-8 text-xs px-2",
        md: "h-10 text-sm px-3",
        lg: "h-12 text-base px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "normal",
      size: "md",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  label?: string;
  description?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      leftIcon,
      rightIcon,
      loading,
      label,
      description,
      errorMessage,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "relative flex items-center rounded-md transition-all",
            inputVariants({ variant, size, state })
          )}
        >
          {leftIcon && (
            <span className="absolute left-3 flex items-center text-muted-foreground">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            aria-invalid={state === "error"}
            aria-describedby={
              description ? `${inputId}-desc` : errorMessage ? `${inputId}-error` : undefined
            }
            className={cn(
              "w-full bg-transparent outline-none placeholder:text-muted-foreground",
              leftIcon && "pl-8",
              rightIcon && "pr-8",
              loading && "pr-10",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            {...props}
          />

          {loading && (
            <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-muted-foreground" />
          )}

          {!loading && rightIcon && (
            <span className="absolute right-3 text-muted-foreground">
              {rightIcon}
            </span>
          )}
        </div>

        {description && (
          <p id={`${inputId}-desc`} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {state === "error" && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-xs text-destructive"
          >
            <AlertCircle className="h-3.5 w-3.5" /> {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
