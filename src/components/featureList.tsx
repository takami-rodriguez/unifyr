import React from "react";
import { bgGradient } from "@/data/styleHelpers";
import Image from 'next/image';
type FeatureListProps = {
  block: {
    title: string;
    description: string;
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
};

const FeatureList = async ({ block }: FeatureListProps) => {
  const { title, features, description } = block;
  return (
    <section className="mx-auto max-w-[1400px] lg:px-5">
      <div className="space-y-6 rounded-2xl py-10 sm:pt-12 sm:pb-20 px-4 lg:px-0" style={bgGradient}>
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="space-y-4">
          <h2 className="text-center font-heading font-bold text-5xl">
            {title}
          </h2>
          <p className="text-[22px] leading-[32px] max-w-2xl text-center mx-auto">{description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 px-4 lg:px-0">
            {features.map((feature, index) => (
              <div key={index} className="flex space-x-4">
                <div className="h-10 w-10 relative">
                <Image src={feature.icon} fill alt={feature.title} className="object-top md:-mt-1"/>
                </div>
                <div className="max-w-sm space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
