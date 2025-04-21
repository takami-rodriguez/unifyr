import { cn } from "@/lib/cn";
import { FC, ReactNode } from "react";

type HeadingTextProps = {
  centerHeader?: boolean;
  header?: ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

const HeadingText: FC<HeadingTextProps> = ({
  header,
  children,
  centerHeader,
  className,
  ...props
}) => {
  return (
    <div className={cn("space-y-10 text-xl leading-9", className)} {...props}>
      {header && (
        <h3
          className={cn("font-heading text-5xl font-semibold", {
            "text-center": centerHeader,
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
