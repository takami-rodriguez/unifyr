import Image from "next/image";
import React from "react";

const Testimonial = async () => {
  return (
    <section className="mx-auto max-w-5xl space-y-20 py-5 md:py-12">
      <div className="space-y-8 text-center">
        <blockquote className="mx-auto max-w-[970px] font-heading text-3xl font-bold md:text-5xl">
          {
            "“ZiftONE streamlined our partner program, boosting engagement across 22+ countries.”"
          }
        </blockquote>
        <div className="flex flex-col items-center md:gap-4">
          <div className="mx-auto w-32">
            <Image
              src="/images/partners/Panasonic.svg"
              alt="Panasonic Connect Europe"
            />
          </div>
          <div className="text-lg">Panasonic Connect Europe</div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
