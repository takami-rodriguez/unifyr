"use client";

import WistiaVideo from "@/components/wistiaVideo";
import React, { ReactNode, Suspense } from "react";

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type PlatformVideoSectionProps = {
  block: {
    title: string;
    description: string;
    wistiaVideoId: string;
    features: FeatureItem[];
  };
};

const PlatformVideoSection = ({ block }: PlatformVideoSectionProps) => {
  const { title, description, wistiaVideoId, features } = block;
  return (
    <section className="mx-auto max-w-5xl py-12">
      <h2 className="pb-6 text-center font-heading text-4xl  md:text-5xl md:leading-[3.5rem] font-extrabold">
        {title}
      </h2>
      <p className="mx-auto max-w-[800px] text-center md:text-[1.375rem]">
        {description}
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <WistiaVideo id={wistiaVideoId} />
      </Suspense>
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

export default PlatformVideoSection;
