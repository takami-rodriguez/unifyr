import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { gradientText } from "@/data/styleHelpers";

const Hero = () => {
  return (
    <div>
      <h1 className="text-7xl font-heading text-center pt-20 leading-[5rem]">
        <span style={gradientText}>Growth</span> happens in <br />
        good company.
      </h1>
      <p className=" text-xl max-w-3xl mx-auto mt-8 text-center font-extralight leading-8 text-grey-900/80">
        Unifyr provides everything you need to build{" "}
        <span className="font-medium">profitable </span> channel partnerships.{" "}
        <br /> Our platform merges a vibrant network of partners and agencies
        with <br /> industry-leading PRM and TCMA capabilities.
      </p>
      <div className="flex items-center justify-center space-x-[10px] mt-8 py-1">
        <Button variant={"primary"}>
          <div className="w-[124px]">Book a call</div>
        </Button>
        <Button variant="outline">Discover ZiftONE</Button>
      </div>
      <div className="max-w-5xl my-12 mx-auto px-32">
        <AspectRatio className="relative" ratio={16 / 9}>
          <Image
            src="/images/image.png"
            alt="hero"
            className="object-cover object-center rounded-2xl"
            fill
          />
        </AspectRatio>
      </div>

      <div className="flex justify-center items-end space-x-6">
        <Image src="/images/google.png" alt="hero" width={211} height={40} />
        <div className="text-3xl font-medium">450+ G2 Reviews</div>
      </div>
    </div>
  );
};

export default Hero;
