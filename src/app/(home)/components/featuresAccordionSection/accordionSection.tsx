"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { ImageType } from "@/types/images";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { NavLink } from "@/data/navLinks";

export type AccordionSectionProps = {
  para: string;
  mainTitle: string;
  button: {
    label: string;
    link: string;
  };
  content: {
    title: string;
    content: string;
    image: ImageType;
    _uid: string;
  }[];
  colour: "blue500" | "yellow500";
  leftImage?: boolean;
  _uid: string;
};

const AccordionSection = ({ blok }: { blok: AccordionSectionProps }) => {
  const [selectedId, setSelectedId] = React.useState<string>(
    blok.content[0]!._uid
  );
  const selected = blok.content.find((c) => c._uid === selectedId)
  return (
    <div className="max-w-5xl mx-auto space-y-14">
      <div className="mt-10 space-y-4 flex flex-col items-center max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-semibold md:text-center md:leading-[1.125]">{blok.mainTitle}</h3>
        <div className=" max-w-xl mx-auto   md:text-center">
          <span className={cn("text-xl md:text-center font-sans font-light text-grey-900/80")}>
            {blok.para}
          </span>
        </div>
        <div className="pt-6">
          <Link href={NavLink.BookACall}>
            <Button
              variant={blok.colour === "yellow500" ? "yellow" : "secondary"}
            >
              {blok.button.label}
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
        <div
          className={cn("hidden lg:block col-span-1  relative h-full w-full ", {
            "lg:order-last": !blok.leftImage,
          })}
        >
          <AspectRatio
            ratio={540 / 475}
            className="relative rounded-2xl overflow-hidden"
          >
            <Image
              src={selected!.image.url}
              alt={selected!.image.alt || ""}
              fill
              className={cn("object-contain object-center rounded-2xl")}
            />
          </AspectRatio>
        </div>
        <div className="col-span-1 flex flex-col justify-center h-full lg:py-30 ">
          <Accordion
            type="single"
            defaultValue={selectedId}
            onValueChange={setSelectedId}
          >
            {blok.content.map((feature) => (
              <AccordionItem
                key={feature._uid}
                className={cn("", {
                  ["border-l-[3px] border-secondary"]:
                    selectedId === feature._uid && blok.colour === "blue500",
                  ["border-l-[3px] border-green-700"]:
                    selectedId === feature._uid && blok.colour === "yellow500",
                  "border-l-[3px] border-grey": selectedId !== feature._uid,
                })}
                value={feature._uid}
              >
                <div className="ml-4">
                  <AccordionTrigger
                    className={cn("text-2xl font-bold leading-9", {
                      "py-8 text-[#9FA2A9]": selectedId !== feature._uid,
                      "py-2 text-black": selectedId === feature._uid,
                    })}
                    removeChevron
                  >
                    {feature.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col lg:flex-none">
                      <div className="text-base sm:text-lg text-grey-900/80 font-extralight">
                        {feature.content}
                      </div>
                      <div className="lg:hidden relative min-h-[294px]  sm:min-h-[450px] lg:min-h-[700px] h-full w-full">
                        <Image
                          src={feature!.image.url}
                          alt={feature!.image.alt || ""}
                          fill
                          className="object-contain object-center "
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
