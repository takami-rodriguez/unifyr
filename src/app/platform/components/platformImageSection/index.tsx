

"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React, { ReactNode } from "react";

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type PlatformImageSectionProps = {
  block: {
    title: string;
    description: string;
    imageUrl: string;
    features: FeatureItem[];
  };
};

const PlatformImageSection = ({ block }: PlatformImageSectionProps) => {
  const { title, description, imageUrl, features } = block;
  return (
    <section className="mx-auto max-w-5xl py-12">
      <h2 className="pb-6 text-center font-heading text-4xl  md:text-5xl md:leading-[3.5rem] font-extrabold">
        {title}
      </h2>
      <p className="mx-auto max-w-[800px] text-center md:text-[1.375rem]">
        {description}
      </p>
      <div className="mx-auto my-12 max-w-[800px]">
      <AspectRatio
        className="relative rounded-2xl border border-gray-100 bg-grey-100 p-1"
        ratio={16 / 9}
      >
        <Image src={imageUrl} alt={title} fill className="object-cover object-center rounded-2xl" />
      </AspectRatio>
    </div>
      <div className="mt-14">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-14 lg:space-y-0 lg:space-x-28">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-5">
              {feature.icon}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformImageSection;
