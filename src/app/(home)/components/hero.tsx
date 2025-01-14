"use client";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import Image from "next/image";
import { gradientText } from "@/data/styleHelpers";
import HeroVideo from "./heroVideo";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import BGRadialSVG from "@/components/bgRadiant";
import { NavLink } from "@/data/navLinks";
import Link from "next/link";

const Hero = () => {
  const { tablet, mobile } = useWindowSize();
  return (
    <div className="relative">
      <div
        className={cn("absolute -top-24 md:top-0 w-full md:w-1/2 z-0 left-10 md:left-32")}
      >
        <BGRadialSVG />
      </div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl max-w-2xl mx-auto font-heading font-extrabold md:text-center pt-20 leading-[3.5rem] md:leading-[5rem]">
          <span style={gradientText}>Growth</span> happens in good company.
        </h1>
        <p className=" md:text-xl max-w-2xl mx-auto mt-8 md:text-center font-extralight md:leading-8 text-grey-900/80">
          <strong>ZiftONE</strong> is the industry-leading solution for
          relationship partner management (PRM), through-channel marketing
          automation (TCMA), and learning management (LMS)—deeply integrated
          with the tools you already use.
        </p>
        <div className="flex flex-col md:flex-row w-full items-center justify-center md:space-x-[10px] mt-8 py-1">
          <Link href={NavLink.BookACall} className="w-full md:w-auto">
            <Button variant={"primary"} fullWidth={tablet || mobile}>
              <div className="w-full md:w-[124px]">Book a call</div>
            </Button>
          </Link>
          <Link href={NavLink.BookACall} className="w-full md:w-auto">
            <Button variant="outline" fullWidth={tablet || mobile}>
              Discover ZiftONE
            </Button>
          </Link>
        </div>
        {/* TODO - add image placeholder */}
        <Suspense fallback={<div>Loading...</div>}>
          <HeroVideo />
        </Suspense>
        <div className="flex justify-center items-end space-x-6">
          {/* TODO - SVG please */}
          <Image src="/images/google.png" alt="hero" width={211} height={40} />
          <div className="text-3xl font-semibold">450+ G2 Reviews</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
