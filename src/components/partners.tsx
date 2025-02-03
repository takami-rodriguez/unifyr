"use client";
import { partnerImages } from "@/data/partners";
import Image from "next/image";
import React from "react";

const Partners = () => {
  return (
    <div className="bg-grey lg:py-30 relative z-10 pt-14">
      <div className="w-full px-5 sm:px-0">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="text-[2rem] font-semibold">
            {"Trusted by the world’s brightest companies"}
          </h3>
        </div>
      </div>
      <div className="mx-auto mt-1 flex w-full max-w-[1400px] flex-wrap items-center justify-center px-10 py-8 md:space-x-[3.375rem] md:px-0 lg:py-12">
        {partnerImages?.map((image) => (
          <div
            key={image.url}
            className="relative mb-10 h-12 w-1/2 px-2 md:mb-0 md:w-32 md:px-0"
          >
            <Image
              src={image.url}
              alt={image.alt || ""}
              className="object-contain object-center"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
