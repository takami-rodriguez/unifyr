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
    <section className="relative mx-auto max-w-5xl">
      <div
        className={cn(
          "absolute left-0 top-10 z-0 w-full md:-top-20 md:h-[120%] lg:w-1/2",
        )}
      >
        <BGRadialSVG />
      </div>
      <div className="max-w-3xl space-y-[22px]">
        <h2 className="font-heading text-3xl font-bold leading-[52px] md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-[1.375rem] leading-8 text-grey-900/80">
          {intro}
        </p>
      </div>
      <div className="grid grid-cols-1 w-full items-center gap-12 md:grid-cols-2 mt-6">
        <div className="space-y-12">
          <div className="space-y-4 text-grey-900/80">
            {features.map((feature, index) => (
              <div key={index} className="max-w-sm space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-gray-400">
                  {feature.title}
                </h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <AspectRatio ratio={5.6/4} className="relative mx-auto w-full max-w-md">
         <Image src={image} alt={title} fill className="object-contain object-center lg:object-right "/>
        </AspectRatio>
      </div>
    </section>
  );
};

export default PlatformJourney;
