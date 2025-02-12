"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import DualButtons, { ButtonTypeProps } from "./buttons";
import { renderToString } from "react-dom/server";
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

const PlatformHero = ({ block }: PlatformHeroProps) => {
  return (
    <section className="mx-auto max-w-[1400px] lg:px-5 rounded-2xl" style={bgGradient}>
      <div className="sm:py-19 bg- rounded-2xl lg:px-24 py-10">
        <div className="grid grid-cols-1 gap-4 p-6 md:gap-8 lg:grid-cols-7">
          <div className="flex flex-col items-start justify-center gap-6 lg:col-span-4">
            <h2
              className="font-heading text-4xl font-bold md:text-[70px] md:leading-[80px]"
              dangerouslySetInnerHTML={{
                __html: block.title.replace(
                  new RegExp(`\\b${block.titleHighlight}\\b`, "i"),
                  (match) =>
                    renderToString(
                      <span className="text-secondary">{match}</span>,
                    ),
                ),
              }}
            />
            <p className="leading-relaxed text-grey-900/80 md:text-[1.375rem]">
              {block.description}
            </p>
            <DualButtons button1={block.button1} button2={block.button2} />
          </div>
          <AspectRatio ratio={6 / 4} className="relative lg:col-span-3">
            <Image
              src={block.image}
              alt={""}
              fill
              className={cn("rounded-[25px] object-contain object-center")}
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default PlatformHero;
