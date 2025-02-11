import React from "react";
import Image from "next/image";
type FullWidthImageProps = {
  filename: string;
  alt: string;
};

const FullWidthImage = async ({ filename, alt }: FullWidthImageProps) => {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-2xl sm:h-[300px] md:h-[545px]">
      <Image
        src={filename}
        fill
        alt={alt}
        className="object-cover object-center"
      />
    </div>
  );
};

export default FullWidthImage;
