import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { renderTitleHtml } from "@/lib/serverhelpers";
import DualButtons, { ButtonTypeProps } from "./buttons";
import { bgGradient } from "@/data/styleHelpers";

type PlatformHeroProps = {
  block: {
    title: string;
    titleHighlight: string;
    description: string;
    image: string;
    button1: ButtonTypeProps;
    button2: ButtonTypeProps;
  };
};

const PlatformHero = async ({ block }: PlatformHeroProps) => {
  const __html = await renderTitleHtml(block.title, block.titleHighlight);
  return (
    <section className="mx-auto max-w-[1400px] lg:px-5">
      <div className="sm:py-19 rounded-2xl px-24 py-10" style={bgGradient}>
        <div className="grid grid-cols-1 gap-4 p-6 md:gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center gap-6">
            <h2
              className="font-heading text-4xl font-bold md:text-5xl md:leading-[56px]"
              dangerouslySetInnerHTML={{
                __html,
              }}
            />
            <p className="leading-relaxed text-grey-900/80 md:text-xl">
              {block.description}
            </p>
            <DualButtons button1={block.button1} button2={block.button2} />
          </div>
          <AspectRatio ratio={6 / 4} className="relative">
            <Image
              src={block.image}
              alt={""}
              fill
              className={cn("rounded-[25px] object-cover object-center")}
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default PlatformHero;
