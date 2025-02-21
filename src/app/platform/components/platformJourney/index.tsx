import React from "react";
import { cn } from "@/lib/utils";
import BGRadialSVG from "@/components/bgRadiant";
import Image from "next/image";

type PlatformJourneyProps = {
  block: {
    title: string;
    image: string;
    intro: string;
    features: {
      title: string;
      description: string;
    }[];
  };
};

const PlatformJourney = async ({ block }: PlatformJourneyProps) => {
  const { title, intro, features, image } = block;
  return (
    <section className="relative z-20 mx-auto max-w-5xl">
      <div
        className={cn(
          "absolute right-0 top-10 z-0 w-full md:-top-20 md:h-[120%] lg:w-1/2",
        )}
      >
        <BGRadialSVG />
      </div>
      <div className="relative z-20 max-w-3xl space-y-[22px]">
        <h2 className="font-heading text-4xl font-bold leading-[52px] md:text-5xl lg:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-xl leading-8 text-grey-900/80 lg:text-[1.375rem]">
          {intro}
        </p>
      </div>
      <div className="grid w-full grid-cols-1 items-center gap-12 md:mt-14 lg:mt-16 lg:grid-cols-7">
        <div className="mt-14 space-y-12 lg:col-span-3 lg:mt-0">
          <div className="space-y-8 text-grey-900/80">
            {features.map((feature, index) => (
              <div key={index} className="max-w-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-grey-900">
                  {feature.title}
                </h3>
                <p className="text-base lg:max-w-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative lg:col-span-4">
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              className=""
            />
        </div>
      </div>
    </section>
  );
};

export default PlatformJourney;
