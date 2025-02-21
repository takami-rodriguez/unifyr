import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border-[2px]  ring-offset-white transition-colors  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        primary: "bg-gradient text-white border-grey-secondary/30 ",
        purple: "bg-primary text-white border-grey-secondary/30 ",
        secondary: "bg-secondary text-white border-grey-secondary/30",
        unifyrPlus: "bg-green-700 text-white border-grey-secondary/30  border-2",
        outline:
          " border-grey-900 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
        disabled: "bg-grey-300 text-grey-500 border-grey-300",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "px-8 py-3 text-lg leading-6",
        lg: "h-11 rounded-md px-8 text-lg ",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  noBorder?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      noBorder,
      fullWidth,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div
        className={clsx({
          "rounded-2xl border border-gray-100 bg-grey-100 p-1": !noBorder,
          "w-full": fullWidth,
        })}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }), {
            "border-none": noBorder,
            "w-full": fullWidth,
          })}
          ref={ref}
          {...props}
          // style={{boxShadow: "0px 0px 1px 0px #000"}}
        />
      </div>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
