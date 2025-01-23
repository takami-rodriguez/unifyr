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
    blok.content[0]!._uid,
  );
  const selected = blok.content.find((c) => c._uid === selectedId);
  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center space-y-4">
        <h3 className="text-3xl font-semibold md:text-center md:text-5xl md:leading-[1.125]">
          {blok.mainTitle}
        </h3>
        <div className="mx-auto max-w-xl md:text-center">
          <span
            className={cn(
              "font-sans text-xl font-light text-grey-900/80 md:text-center",
            )}
          >
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
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div
          className={cn("relative col-span-1 hidden h-full w-full lg:block", {
            "lg:order-last": !blok.leftImage,
          })}
        >
          <AspectRatio
            ratio={540 / 475}
            className="relative overflow-hidden rounded-2xl"
          >
            <Image
              src={selected!.image.url}
              alt={selected!.image.alt || ""}
              fill
              className={cn("rounded-2xl object-contain object-center")}
            />
          </AspectRatio>
        </div>
        <div className="lg:py-30 col-span-1 flex h-full flex-col justify-center">
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
                  "border-grey border-l-[3px]": selectedId !== feature._uid,
                })}
                value={feature._uid}
              >
                <div className="ml-4">
                  <AccordionTrigger
                    className={cn("text-left text-2xl font-bold leading-9", {
                      "py-8 text-[#9FA2A9]": selectedId !== feature._uid,
                      "py-2 text-black": selectedId === feature._uid,
                    })}
                    removeChevron
                  >
                    {feature.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col lg:flex-none">
                      <div className="text-base font-extralight text-grey-900/80 sm:text-lg">
                        {feature.content}
                      </div>
                      <div className="relative h-full min-h-[294px] w-full sm:min-h-[450px] lg:hidden lg:min-h-[700px]">
                        <Image
                          src={feature!.image.url}
                          alt={feature!.image.alt || ""}
                          fill
                          className="object-contain object-center"
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
