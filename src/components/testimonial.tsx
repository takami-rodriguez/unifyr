import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

const Testimonial = async () => {
  return (
    <section className="mx-auto max-w-5xl space-y-20 py-5 md:py-12">
      <div className="space-y-8 text-center">
        <blockquote className="mx-auto max-w-[970px] font-heading text-3xl font-bold md:text-5xl">
          {
            "“ZiftONE streamlined our partner program, boosting engagement across 22+ countries.”"
          }
        </blockquote>
        <div className="flex flex-col items-center md:gap-3">
          <div className="mx-auto max-h-[40px] w-full max-w-[251px]">
            <AspectRatio
              ratio={251 / 40}
              className="relative mx-6 sm:mx-4 md:mx-0"
            >
              <Image
                src="/images/partners/Panasonic.svg"
                alt="Panasonic"
                fill
              />
            </AspectRatio>
          </div>
          <div className="text-lg">
            <p className="">Chief Revenue Officer, Panasonic Connect</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
