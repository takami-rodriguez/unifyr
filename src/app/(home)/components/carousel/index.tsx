"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnersIcon from "@/components/icons/partners";
import SupplierIcon from "@/components/icons/supplier";
import AgencyIcon from "@/components/icons/agency";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useTabButton } from "./useTabButton";
import { usePrevNextButtons } from "./usePrevNextButtons";
import { bgGradient, gradientText } from "@/data/styleHelpers";
import { renderToString } from "react-dom/server";

interface SlideContent {
  title: string;
  titleHighlight: string;
  description: string;
  cta: string;
}

const slides: SlideContent[] = [
  {
    title: "The first platform for unified supplier management",
    titleHighlight: "first",
    description:
      "We've fundamentally reimagined how partners engage with their supplier ecosystem. Through one interface, you're able to orchestrate all of your supplier relationships with the assistance of a personalized AI advisor that understands each one on a deep level.",
    cta: "Discover Unify+",
  },
  {
    title: "Channel program management that sets a new standard",
    titleHighlight: "innovative",
    description:
      "ZiftONE's innovative PRM and TCMA platform reveals the full story behind channel activity, turning data into actionable intelligence. With our carefully curated network of partners and agencies, you'll find perfect allies to amplify your channel success.",
    cta: "Discover ZiftONE",
  },
  {
    title: "Where channel expertise meets new opportunity",
    titleHighlight: "expertise",
    description:
      "Your mastery of channel partnerships deserves a platform of equal caliber. Through Unifyr Pro, you'll join a network of forward-thinking suppliers eager to benefit from your experience in building exceptional partner programs that prove value and scale.",
    cta: "Discover Unifyr Pro",
  },
];

export default function HomeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);

  const { selectedIndex, onTabsButtonClick } = useTabButton(emblaApi, () => {});
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, () => {});

  const tabs = [
    {
      id: "partner",
      title: "Partner",
      icon: <PartnersIcon />,
    },
    {
      id: "supplier",
      title: "Supplier",
      icon: <SupplierIcon />,
    },
    {
      id: "agency",
      title: "Agency",
      icon: <AgencyIcon />,
    },
  ];

  return (
    <div className="mt-10 mx-auto max-w-[1200px]">
      <div className="rounded-[3rem] overflow-hidden py-8" style={bgGradient}>
        <Tabs value={tabs[selectedIndex].id} className="flex justify-center">
          <TabsList>
            {tabs.map((tab, index) => (
              <TabsTrigger
                value={tab.id}
                key={tab.id}
                onClick={() => onTabsButtonClick(index)}
              >
                <span className="flex items-center space-x-2 ">
                  <span className="hidden md:block">{tab.icon}</span>
                  {tab.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Carousel
          opts={{
            loop: true,
          }}
          className="relative my-8 h-full px-14"
          carouselRef={emblaRef}
          api={emblaApi}
        >
          <CarouselContent className="flex ml-[calc(2rem * -2)] items-center">
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                style={{
                  transform: "translate3d(0, 0, 0)",
                  flex: "0 0 90%",
                }}
              >
                <Card
                  className={cn("border-0 bg-transparent shadow-none bg-white")}
                >
                  <CardContent
                    className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 p-6", {
                      "max-h-[80%]": selectedIndex !== index,
                    })}
                  >
                    <div className="flex flex-col items-start justify-center gap-6">
                      <h2
                        className="text-5xl font-heading leading-[56px]"
                        dangerouslySetInnerHTML={{
                          __html: slide.title.replace(
                            new RegExp(`\\b${slide.titleHighlight}\\b`, "i"),
                            (match) =>
                              renderToString(
                                <span style={gradientText}>{match}</span>
                              )
                          ),
                        }}
                      />
                      <p className="text-grey-900/80 leading-relaxed text-xl">
                        {slide.description}
                      </p>
                      <Button variant={"outline"}>{slide.cta}</Button>
                    </div>
                    <AspectRatio
                      ratio={5 / 4}
                      className="relative rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={"/images/image.png"}
                        alt={""}
                        fill
                        className={cn("object-cover object-center rounded-2xl")}
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute -bottom-10 left-14 w-[90%] mx-auto flex justify-between px-16">
            <CarouselPrevious
              className="relative  bg-transparent border-0 hover:bg-white/20 text-primary"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <CarouselNext
              className="relative  bg-transparent border-0 hover:bg-white/20 text-primary"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
