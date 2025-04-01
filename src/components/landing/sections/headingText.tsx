import { cn } from "@/lib/cn";
import { FC, ReactNode } from "react";

type HeadingTextProps = {
  centered?: boolean;
  header?: ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

const HeadingText: FC<HeadingTextProps> = ({
  header,
  children,
  centered,
  className,
  ...props
}) => {
  return (
    <div className={cn("space-y-10 text-xl leading-9", className)} {...props}>
      {header && (
        <h3
          className={cn("font-heading text-5xl font-semibold", {
            "text-center": centered,
          })}
        >
          {header}
        </h3>
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

export default HeadingText;
