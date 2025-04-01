import React from "react";
import { bgGradient } from "@/data/styleHelpers";
import { cn } from "@/lib/cn";
import { BlockData } from "@/components/landing/types";

export type LandingFeatureListProps = {
  className?: string;
} & BlockData;

const Dark = ({
  title,
  description,
  children,
  className,
}: React.PropsWithChildren<LandingFeatureListProps>) => {
  return (
    <section
      className={cn(
        "mx-auto max-w-[1400px] rounded-3xl bg-gray-950 p-16 text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl space-y-16">
        <div className="space-y-16">
          <h2 className="text-center font-heading text-4xl font-bold text-white md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-center text-lg leading-[32px] text-white md:text-[22px]">
            {description}
          </p>
        </div>
        {children && <hr className="border-white/35"/>}
        {children}
      </div>
    </section>
  );
};

export default Dark;
