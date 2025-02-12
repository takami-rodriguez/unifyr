import React from "react";
import { cn } from "@/lib/utils";
import BGRadialSVG from "@/components/bgRadiant";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  const { title, intro, features,image } = block;
  return (
    <section className="relative mx-auto max-w-5xl z-20">
      <div
        className={cn(
          "absolute right-0 top-10 z-0 w-full md:-top-20 md:h-[120%] lg:w-1/2",
        )}
      >
        <BGRadialSVG />
      </div>
      <div className="max-w-3xl space-y-[22px] relative z-20">
        <h2 className="font-heading text-3xl font-bold leading-[52px] md:text-4xl lg:text-5xl ">
          {title}
        </h2>
        <p className="max-w-2xl text-xl lg:text-[1.375rem] leading-8 text-grey-900/80">
          {intro}
        </p>
      </div>
      <div className="grid grid-cols-1 w-full items-center gap-12 lg:grid-cols-7 md:mt-14 lg:mt-6">
        <div className="space-y-12 mt-14 lg:mt-0 lg:col-span-3">
          <div className="space-y-4 text-grey-900/80">
            {features.map((feature, index) => (
              <div key={index} className="max-w-sm space-y-3">
                <h3 className="text-sm uppercase tracking-wider text-grey-900 font-bold">
                  {feature.title}
                </h3>
                <p className="text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* TODO - make image bigger and apply border/outline */}
        <AspectRatio ratio={5.6/4} className="relative mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-grey-100  lg:col-span-3">
         <Image src={image} alt={title} fill className="object-contain object-center lg:object-right rounded-xl "/>
        </AspectRatio>
      </div>
    </section>
  );
};

export default PlatformJourney;
