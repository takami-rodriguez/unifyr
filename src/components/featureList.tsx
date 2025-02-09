import React from "react";
import { bgGradient } from "@/data/styleHelpers";

type FeatureListProps = {
  block: {
    title: string;
    features: {
      title: string;
      description: string;
      icon: React.ReactNode;
    }[];
  };
};

const FeatureList = async ({ block }: FeatureListProps) => {
  const { title, features } = block;
  return (
    <section className="mx-auto max-w-[1400px] lg:px-5">
      <div className="space-y-6 rounded-2xl py-10 sm:py-20" style={bgGradient}>
        <div className="mx-auto max-w-5xl space-y-16">
          <h2 className="text-center font-heading text-4xl font-bold sm:text-5xl">
            {title}
          </h2>
          <div className="grid grid-cols-3 gap-20">
            {features.map((feature, index) => (
              <div key={index} className="flex space-x-4">
                {feature.icon}
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
