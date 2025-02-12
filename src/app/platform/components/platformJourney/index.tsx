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
        <h2 className="font-heading text-3xl font-bold leading-[52px] md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-xl leading-8 text-grey-900/80 lg:text-[1.375rem]">
          {intro}
        </p>
      </div>
      <div className="grid w-full grid-cols-1 items-center gap-12  md:mt-14 lg:mt-16 lg:grid-cols-2">
        <div className="mt-14 space-y-12  lg:mt-0">
          <div className="space-y-4 text-grey-900/80">
            {features.map((feature, index) => (
              <div key={index} className="max-w-sm space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-grey-900">
                  {feature.title}
                </h3>
                <p className="text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* TODO - make image bigger and apply border/outline */}
        <div className="">
          <AspectRatio
            ratio={5.6 / 4}
            className="relative border-2 border-gray-100 rounded-xl overflow-hidden"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="rounded-xl object-cover object-center lg:object-right border-2 overflow-hidden border-white "
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default PlatformJourney;
