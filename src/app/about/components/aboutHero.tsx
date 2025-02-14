
import FullWidthImage from "@/components/fullWidthImage";
import React from "react";

type HeroFullBleedImageProps = {
  block: {
    title: string;
    image: {
      src: string;
      alt?: string;
    };
  };
};

const HeroFullBleedImage = ({
  block,
}: HeroFullBleedImageProps) => {
  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="z-100 relative space-y-4 text-center">
        <h1 className="leading[4rem] md:py-30 py-10 font-heading text-4xl font-black sm:text-5xl lg:text-[4.375rem]">
          {block.title}
        </h1>
        <FullWidthImage filename={block.image.src} alt={block.image.alt!} />
      </div>
    </div>
  );
};

export default HeroFullBleedImage;
