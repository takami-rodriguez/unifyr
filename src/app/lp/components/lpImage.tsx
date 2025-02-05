import React from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const LPImage = async ({ src, alt }: { src: string; alt: string }) => {
  return (
    <AspectRatio
      ratio={5 / 2.9}
      className="relative -mx-3 overflow-hidden rounded-3xl border-[8px] border-[#F5F3FB]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-2xl border-[8px] border-white object-cover object-center"
      />
    </AspectRatio>
  );
};

export default LPImage;
