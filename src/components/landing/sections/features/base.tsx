import React from "react";
import { bgGradient } from "@/data/styleHelpers";
import { cn } from "@/lib/cn";
import { BlockData } from "@/components/landing/types";

export type LandingFeatureListProps = {
  className?: string;
} & BlockData;

const Features = ({
  title,
  description,
  children,
  className,
}: React.PropsWithChildren<LandingFeatureListProps>) => {
  return (
    <section className={cn("mx-auto max-w-[1400px] lg:px-5", className)}>
      <div
        className="space-y-6 rounded-2xl px-4 py-10 sm:pb-20 sm:pt-12 lg:px-0"
        style={bgGradient}
      >
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="space-y-4">
            <h2 className="text-center font-heading text-4xl font-bold md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-center text-lg leading-[32px] md:text-[22px]">
              {description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-20 px-4 sm:grid-cols-2 md:grid-cols-3 lg:px-0">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
