"use client";
import Image from "next/image";
import React from "react";
import { partnerImages } from "../data";

const Partners = () => {
  return (
    <div className="bg-grey pt-14 relative z-10 lg:py-30">
      <div className="w-full  px-5 sm:px-0">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-[2rem] font-semibold">
            {"Trusted by the world’s largest companies"}
          </h3>
        </div>
      </div>
      <div className="py-8 lg:py-12 mt-1 flex flex-col justify-center md:flex-row w-full items-center space-y-10 md:space-y-0 md:space-x-[3.375rem] mx-auto max-w-[1400px]">
        {partnerImages?.map((image) => (
          <div key={image.url} className=" relative h-10 w-28 md:h-12 md:w-32">
            <Image
              src={image.url}
              alt={image.alt || ""}
              className=" object-contain object-center"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
