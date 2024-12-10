import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const Hero = () => {
  return (
    <div>
      <h1 className="text-7xl font-heading text-center pt-20 leading-[5rem]">
        <span className="text-pink">Growth</span> happens in <br />
        good company.
      </h1>
      <p className=" text-lg max-w-xl mx-auto mt-8 text-center font-extralight leading-8">
        Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus.
        Vivamus cursus ante eget orci egestas malesuada.
      </p>
      <div className="flex items-center justify-center space-x-[10px] mt-8">
        <Button variant={"primary"}>Primary action</Button>
        <Button variant="outline" >
          Secondary action
        </Button>
      </div>
      <div className="max-w-7xl my-12 mx-auto px-32">
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
        <div className="text-3xl">3,000+ G2 Reviews</div>
      </div>
    </div>
  );
};

export default Hero;
