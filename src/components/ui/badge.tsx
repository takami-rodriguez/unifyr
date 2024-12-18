import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-neutral-200  text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300",
  {
    variants: {
      variant: {
        primary:
          "bg-grey-400/50  dark:bg-grey-700  ",
        outline: "bg-transparent text-grey-500 dark:text-grey-300 font-bold ",
      },
      size: {
        sm: "px-4 py-2.5",
        md: "px-4 py-2",
        lg: "px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
      
    />
  );
}

export { Badge, badgeVariants };
