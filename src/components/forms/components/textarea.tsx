import * as React from "react";

import { cn } from "@/lib/utils";
interface TextAreaProps extends React.ComponentProps<"textarea"> {
  error?: string;
}
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-md bg-white px-4 py-3 ring-offset-white placeholder:text-grey-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        { "border-red-500": props.error },
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
