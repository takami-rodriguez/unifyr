"use client";
import Image from "next/image";
import React from "react";
import { partnerImages } from "../data";

const Partners = () => {
  return (
    <div className="bg-grey pt-14 relative z-10 lg:py-30">
      <div className="w-full  px-5 sm:px-0">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-[2rem] font-medium">
            {"Trusted by the world’s largest companies"}
          </h3>
        </div>
      </div>
      <div className="py-8 lg:py-12 mt-1 flex w-full items-center space-x-6 mx-auto max-w-[1200px]">
        {partnerImages?.map((image) => (
          <div key={image.url} className=" relative h-12 w-64">
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
