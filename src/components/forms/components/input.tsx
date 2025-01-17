import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  error?: string
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md bg-white px-4 py-3  ring-offset-white file:border-0 file:bg-transparent  file:font-medium file:text-neutral-350 placeholder:text-[#999BB0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-350 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50  ",
          { "border-red-500": props.error },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
