import { BlockData } from "@/components/landing/types";
import { FC, HTMLAttributes } from "react";
import HeadingText from "@/components/landing/sections/headingText";
import { cn } from "@/lib/cn";

type ComparisonProps = BlockData & HTMLAttributes<HTMLDivElement>;

export const Comparison: FC<ComparisonProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-16", className)} {...props}>
      <div className="flex gap-12">
        <div className="flex-0 w-[510px] rounded-xl bg-slate-300"></div>
        <div className="mx-auto flex-1 space-y-16 py-24">
          <HeadingText header={title}>{description}</HeadingText>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Comparison;
