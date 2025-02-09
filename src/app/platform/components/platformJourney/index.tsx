import React from "react";
import PlatformJourneyImage from "./image";
import { cn } from "@/lib/utils";
import BGRadialSVG from "@/components/bgRadiant";

type PlatformJourneyProps = {
  block: {
  title: string
  intro: string
  features: {
    title: string
    description: string
  }[]
}}

const PlatformJourney = async ({block}:PlatformJourneyProps) => {
  const {title,intro, features} = block
  return (
    <section className="px-4 sm:px-10 lg:px-20 relative">
      <div
        className={cn(
          "absolute top-10 z-0 w-full md:-top-20 md:h-[120%] lg:w-1/2 left-0",
        )}
      >
        <BGRadialSVG />
      </div>
      <div className="max-w-3xl space-y-[22px]">

      <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl leading-[52px]">
            {title}
          </h2>
          <p className="text-[1.375rem] max-w-2xl leading-8 text-grey-900/80">
             {intro}
            </p>
      </div>
      <div className="grid w-full items-center gap-12 md:grid-cols-2">
        <div className="space-y-12">
          
          <div className="space-y-4 text-grey-900/80">
            {
              features.map((feature, index) => (
                <div key={index} className="space-y-3 max-w-sm">
                  <h3 className="text-xs uppercase tracking-wider text-gray-400">
                    {feature.title}
                  </h3>
                  <p className="text-sm">
                    {feature.description}
                  </p>
                </div>
              ))
            }
        </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="animate-spin-slow absolute inset-0">
            <PlatformJourneyImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformJourney;
