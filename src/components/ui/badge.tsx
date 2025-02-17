import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md  text-xs font-bold transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-grey-400/50",
        secondary: "bg-blue-300/50 text-secondary  ",
        unifyrPlus: "bg-green-300/50 text-green-700  ",
        outline: "bg-transparent text-grey-500  font-bold ",
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
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
