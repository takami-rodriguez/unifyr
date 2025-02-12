"use client";
import { partnerImages } from "@/data/partners";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Partners = () => {
  const pathname = usePathname();
  return (
    <div className="bg-grey lg:py-30 relative z-10 pt-12">
      <div className="w-full px-5 sm:px-0">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="text-[2rem] font-semibold">
            {"Trusted by the world’s brightest companies"}
          </h3>
        </div>
      </div>
      <div className={cn("mx-auto mt-1 flex w-full max-w-[1400px]  flex-wrap items-center justify-center  py-8 md:space-x-[3.375rem] md:px-0 lg:py-12",{
        "px-10": pathname === "/",
        "px-7": pathname !== "/",
      })}>
        {partnerImages?.map((image,idx) => (
          <div
            key={image.url}
            className={cn("relative mb-10 h-12 w-1/2 max-w-[130px] px-2 md:mb-0 md:w-32 md:px-0")}
          >
            <Image
              src={image.url}
              alt={image.alt || ""}
              className={cn("object-contain object-center",{
                "py-0.5":idx === 0,
              })}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
