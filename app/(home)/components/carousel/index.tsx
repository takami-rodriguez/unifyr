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
import { EmblaCarouselType } from "embla-carousel";
import { usePrevNextButtons } from "./usePrevNextButtons";

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
    title: "Streamline your supplier operations",
    titleHighlight: "streamline",
    description:
      "Our platform offers advanced tools to optimize your supplier management processes, reducing complexity and increasing efficiency across your entire supply chain.",
    cta: "Learn More",
  },
  {
    title: "AI-powered insights for better decisions",
    titleHighlight: "AI-powered",
    description:
      "Leverage cutting-edge artificial intelligence to gain deep insights into your supplier relationships, helping you make data-driven decisions that drive business growth.",
    cta: "Explore AI Features",
  },
];

export default function HomeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);

  const { selectedIndex, scrollSnaps, onTabsButtonClick } = useTabButton(
    emblaApi,
    () => {}
  );
  console.log(selectedIndex);
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
    <div className="px-5 mt-10">
      <div
        className=" rounded-[3rem] overflow-hidden py-8"
        style={{
          background:
            "radial-gradient(461.91% 160.49% at 17.47% -33.36%, rgba(215, 14, 134, 0.04) 0%, rgba(36, 56, 139, 0.05) 99.68%)",
        }}
      >
        <Tabs value={tabs[selectedIndex].id} className="flex justify-center">
          <TabsList>
            {tabs.map((tab, index) => (
              <TabsTrigger
                value={tab.id}
                key={tab.id}
                onClick={() => onTabsButtonClick(index)}
              >
                <span className="flex items-center gap-2">
                  {tab.icon}
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
          className="relative my-8 h-full"
          emblaRef={emblaRef}
          emblaApi={emblaApi}
        >
          <CarouselContent className="flex ml-[calc(2rem * -2)] items-center">
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                
                style={{
                  transform: "translate3d(0, 0, 0)",
                  flex: "0 0 80%",
                }}
                
              >
                <Card  className={cn("border-0 bg-transparent shadow-none bg-white",{
                  "max-h-[80%]": selectedIndex !== index,
                })}>
                  <CardContent className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 p-6", {
                    "opacity-0": selectedIndex !== index,
                    "opacity-100": selectedIndex === index,
                  })}>
                    <div className="flex flex-col items-start justify-center gap-6">
                      <h2 className="text-5xl font-heading leading-tight">
                        The{" "}
                        <span
                          style={{
                            background:
                              "radial-gradient(330.41% 146% at 12.59% -31.25%, #D70E86 0%, #703B96 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {slide.titleHighlight}
                        </span>{" "}
                        {slide.title.split(" ").slice(1).join(" ")}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
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

          <div className="absolute -bottom-10 left-14 w-[90%] mx-auto flex justify-between px-8">
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
