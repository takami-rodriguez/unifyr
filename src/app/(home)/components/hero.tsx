import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { gradientText } from "@/data/styleHelpers";
import HeroVideo from "./heroVideo";

const Hero = () => {
  return (
    <div>
      <h1 className="text-5xl md:text-7xl max-w-2xl mx-auto font-heading font-extrabold md:text-center pt-20 leading-[3.5rem] md:leading-[5rem]">
        <span style={gradientText}>Growth</span> happens in
        good company.
      </h1>
      <p className=" md:text-xl max-w-2xl mx-auto mt-8 md:text-center font-extralight md:leading-8 text-grey-900/80">
        <strong>ZiftONE</strong> is the industry-leading solution for relationship partner management (PRM), through-channel
        marketing automation (TCMA), and learning management (LMS)—deeply
        integrated with the tools you already use.
      </p>
      <div className="flex flex-col md:flex-row w-full items-center justify-center space-x-[10px] mt-8 py-1">
        <Button variant={"primary"}>
          <div className=" w-full md:w-[124px]">Book a call</div>
        </Button>
        <Button variant="outline">Discover ZiftONE</Button>
      </div>
      <HeroVideo />

      <div className="flex justify-center items-end space-x-6">
        <Image src="/images/google.png" alt="hero" width={211} height={40} />
        <div className="text-3xl font-medium">450+ G2 Reviews</div>
      </div>
    </div>
  );
};

export default Hero;
