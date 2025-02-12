"use client";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import Image from "next/image";
import { gradientText } from "@/data/styleHelpers";
import useWindowSize from "@/lib/hooks/useWindowSize";
import BGRadialSVG from "@/components/bgRadiant";
import { NavLink } from "@/data/navLinks";
import Link from "next/link";
import WistiaVideo from "@/components/wistiaVideo";

const Hero = () => {
  const { tablet, mobile } = useWindowSize();
  return (
    <div className="relative">
      <div className="absolute -top-24 right-10 z-0 w-full md:right-32 md:top-0 md:w-1/2">
        <BGRadialSVG />
      </div>
      <div className="relative z-50">
        <h1 className="mx-auto max-w-2xl pt-6 font-heading text-5xl font-extrabold leading-[3.5rem] md:pt-20 md:text-center md:text-7xl md:leading-[5rem]">
          <span style={gradientText}>Growth</span> happens in good company
        </h1>
        <p className="mx-auto mt-8 max-w-2xl font-extralight text-grey-900/80 md:text-center md:text-xl md:leading-8">
          ZiftONE is the industry-leading solution for partner relationship
          management (PRM), through-channel marketing automation (TCMA), and
          partner learning management—deeply integrated with the tools you
          already use.
        </p>
        <div className="mt-8 flex w-full flex-col items-center justify-center py-1 md:flex-row md:space-x-[10px]">
          <Link href={NavLink.BookACall} className="w-full md:w-auto">
            <Button variant={"primary"} fullWidth={tablet || mobile}>
              <div className="w-full md:w-[124px]">Book a call</div>
            </Button>
          </Link>
          <Link href={NavLink.Resources} className="w-full md:w-auto">
            <Button variant="outline" fullWidth={tablet || mobile}>
              <div className="w-full md:w-[124px]">Resources</div>
            </Button>
          </Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <WistiaVideo id="zhjsfv098n" />
        </Suspense>
        <div className="flex flex-col items-center justify-center md:flex-row md:items-end md:space-x-6">
          <Image src="/images/google.svg" alt="hero" width={211} height={40} />
          <div className="order-first pb-6 text-3xl font-semibold md:order-last md:pb-0">
            450+ G2 Reviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
