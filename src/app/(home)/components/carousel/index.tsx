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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnersIcon from "@/components/icons/partners";
import SupplierIcon from "@/components/icons/supplier";
import AgencyIcon from "@/components/icons/agency";
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
  image: string;
}

const slides: SlideContent[] = [
  {
    title: "PRM that makes no compromise",
    titleHighlight: "PRM",
    image: "/images/home/carousel/supplier.svg",
    description:
      "ZiftONE's PRM, TCMA, and LMS platform reveals the full story behind channel activity, turning partner engagement into business intelligence. ZiftONE integrates natively with Unifyr+ to provide partners with the latest content and updates.",
    cta: "Discover ZiftONE",
  },
  {
    title: "Where channel expertise meets new opportunity",
    titleHighlight: "opportunity",
    image: "/images/home/carousel/agency.svg",
    description:
      "Find new business helping partners and suppliers grow. Through Unifyr Pro, you join a network of forward-thinking partners and suppliers eager to benefit from your experience in building exceptional partner programs that prove value.",
    cta: "Discover Unifyr Pro",
  },
  {
    title: "The first platform for unified supplier management",
    titleHighlight: "first",
    image: "/images/home/carousel/partner.svg",
    description:
      "We've redesigned how partners engage with their suppliers. Through one interface, partners orchestrate all of their supplier relationships with the assistance of a personalized AI advisor that understands each supplier on a deeper level.",
    cta: "Discover Unifyr+",
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
      id: "supplier",
      title: "Supplier",
    },
    {
      id: "agency",
      title: "Agency",
    },
    {
      id: "partner",
      title: "Partner",
    },
  ];
  const getIcon = (tabId: string) => {
    switch (tabId) {
      case "supplier":
        return <SupplierIcon selected={tabs[selectedIndex].id === tabId} />;
      case "agency":
        return <AgencyIcon selected={tabs[selectedIndex].id === tabId} />;
      case "partner":
        return <PartnersIcon selected={tabs[selectedIndex].id === tabId} />;
    }
  };
  return (
    <div className="relative z-50 mx-auto mt-10 max-w-[1400px]">
      <div className="overflow-hidden rounded-2xl py-8" style={bgGradient}>
        <Tabs value={tabs[selectedIndex].id} className="flex justify-center">
          <TabsList hasIcon>
            {tabs.map((tab, index) => (
              <TabsTrigger
                value={tab.id}
                key={tab.id}
                onClick={() => onTabsButtonClick(index)}
              >
                <span className="flex items-center md:space-x-2">
                  <span className="hidden md:block">{getIcon(tab.id)}</span>
                  <div>{tab.title}</div>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Carousel
          opts={{
            loop: true,
          }}
          className="relative mb-12 mt-8 h-full px-1 md:px-14"
          carouselRef={emblaRef}
          api={emblaApi}
        >
          <CarouselContent className="ml-[calc(2rem * -2)] flex items-center">
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                style={{
                  transform: "translate3d(0, 0, 0)",
                  flex: "0 0 90%",
                }}
              >
                <Card className="border-0 bg-transparent bg-white shadow-none">
                  <CardContent
                    className={cn(
                      "grid grid-cols-1 gap-4 p-6 md:gap-8 lg:grid-cols-2",
                      {
                        "max-h-[80%]": selectedIndex !== index,
                      },
                    )}
                  >
                    <div className="flex flex-col items-start justify-center gap-6">
                      <h2
                        className="font-heading text-4xl font-bold md:text-5xl md:leading-[56px]"
                        dangerouslySetInnerHTML={{
                          __html: slide.title.replace(
                            new RegExp(`\\b${slide.titleHighlight}\\b`, "i"),
                            (match) =>
                              renderToString(
                                <span style={gradientText}>{match}</span>,
                              ),
                          ),
                        }}
                      />
                      <p className="leading-relaxed text-grey-900/80 md:text-xl">
                        {slide.description}
                      </p>
                      {/* <Button variant={"outline"} fullWidth={tablet || mobile}>
                        {slide.cta}
                      </Button> */}
                    </div>
                    <img
                      src={slide.image}
                      alt={slide.cta}
                      className="rounded-2xl object-contain object-center lg:object-right"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute -bottom-14 left-5 mx-auto flex w-[90%] justify-between px-16 md:left-14">
            <CarouselPrevious
              className="relative border-0 bg-transparent text-primary hover:bg-white/20"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <CarouselNext
              className="relative border-0 bg-transparent text-primary hover:bg-white/20"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
