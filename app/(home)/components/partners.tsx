"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { partnerImages } from "../data";

const Partners = () => {
  return (
    <div className="bg-grey pt-14 pb-20  sm:px-10 lg:px-20 relative z-10 lg:py-30">
      <div className="w-full  px-5 sm:px-0">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-medium">{"Trusted by the world’s largest companies"}</h3>
        </div>
      </div>
      <div
        className=" lg:py-12 py-8 mt-1  "
      >
        <Carousel orientation={"horizontal"} opts={{ loop: true }}>
          <CarouselContent>
            {partnerImages?.map((image) => (
              <CarouselItem
                key={image.url}
                className="basis-1/2 md:basis-1/3 lg:basis-1/6 relative h-12 lg:h-16 "
              >
                <Image
                  src={image.url}
                  alt={image.alt || ""}
                  className=" object-contain object-center"
                  fill
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Partners;
