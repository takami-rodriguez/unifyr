import Arrow from "@/components/icons/arrow";
import Link from "next/link";
import React, { ReactNode } from "react";

type FeaturesProps = {
  features: {
    link: string;
    icon: ReactNode;
    title: string;
    description: string;
  }[];
};

const Features = ({ features }: FeaturesProps) => {
  return (
    <div className="mt-10 md:mt-24 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
      {features.map((feature, index) => (
        <div key={index} className="space-y-4">
          {feature.icon}
          <h2 className="text-[22px] ">{feature.title}</h2>
          <p className="text-gray-900/80 w-[290px]">{feature.description}</p>

          <Link href={feature.link} className="flex font-semibold py-2">
            Learn more <Arrow />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Features;
