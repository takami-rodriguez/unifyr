import React from "react";
import Image from "next/image";

type FeaturesProps = {
  features: {
    link: string;
    icon: string;
    title: string;
    description: string;
  }[];
};

const Features = ({ features }: FeaturesProps) => {
  return (
    <div className="my-10 grid gap-12 md:mt-14 md:grid-cols-3 md:gap-8 lg:gap-12">
      {features.map((feature, index) => (
        <div key={index} className="space-y-4">
          <Image
            src={feature.icon}
            alt={feature.title}
            width={44}
            height={44}
          />
          <h2 className="text-[22px]">{feature.title}</h2>
          <p className="w-[290px] text-gray-900/80">{feature.description}</p>

          {/* <Link href={feature.link} className="flex font-semibold py-2">
            Learn more <Arrow />
          </Link> */}
        </div>
      ))}
    </div>
  );
};

export default Features;
