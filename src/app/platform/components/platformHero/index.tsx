"use client";

import React from "react";
import DualButtons from "./buttons";
import { renderToString } from "react-dom/server";
import { bgGradient } from "@/data/styleHelpers";
import { NavLink } from "@/data/navLinks";
import { usePathname } from "next/navigation";
import { PlatformHeroBlock } from "@/types/platformTemplate";

type PlatformHeroProps = {
  block: PlatformHeroBlock;
};

const PlatformHero = ({ block }: PlatformHeroProps) => {
  const pathname = usePathname();
  const getHighlightColor = () => {
    switch (pathname) {
      case NavLink.PlatformZiftOne:
        return "text-secondary";
      case NavLink.PlatformUnifyrPlus:
        return "text-green-700";
      case NavLink.PlatformUnifyrOne:
        return "text-pink";
      default:
        return "primary";
    }
  };
  return (
    <section className="mx-auto max-w-[1400px] rounded-2xl" style={bgGradient}>
      <div className="rounded-2xl sm:py-6 lg:px-16 lg:py-6">
        <div className="grid grid-cols-1 gap-4 p-6 md:gap-8 lg:grid-cols-12">
          <div className="flex flex-col items-start justify-center gap-6 lg:col-span-7">
            <h1
              className="font-heading text-5xl font-extrabold leading-[3.5rem] md:text-7xl md:leading-[5rem]"
              dangerouslySetInnerHTML={{
                __html: block.title.replace(
                  new RegExp(`\\b${block.titleHighlight}\\b`, "i"),
                  (match) =>
                    renderToString(
                      <span className={getHighlightColor()}>{match}</span>,
                    ),
                ),
              }}
            />
            <div className="space-y-6 lg:pr-28">
              <p className="leading-relaxed text-grey-900/80 md:text-[1.375rem]">
                {block.description}
              </p>
              <DualButtons button1={block.button1} button2={block.button2} />
            </div>
          </div>
          <div className="flex justify-center lg:col-span-5">
            <img
              src={block.image}
              alt={""}
              className="rounded-[25px] object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHero;
