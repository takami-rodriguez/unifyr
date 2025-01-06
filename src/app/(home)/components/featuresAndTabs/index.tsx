"use client";
import { Diamond, RefreshCw, Target } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Arrow from "@/components/icons/arrow";
import { bgGradient } from "@/data/styleHelpers";
import { useState } from "react";
import { tabsData, TabValue } from "./data";

const tabs = [
  {
    title: "ZiftONE",
    value: TabValue.zift,
  },
  {
    title: "Unifyr+",
    value: TabValue.unifyrPlus,
  },
  {
    title: "Unifyr Pro",
    value:TabValue.unifyrPro,
  },
];

export default function FeaturesAndTabs() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  return (
    <div className="px-5 max-w-[1200px] mx-auto">
      <div className="rounded-[3rem] overflow-hidden" style={bgGradient}>
        <div className="container mx-auto px-24 py-6 ">
          <div className="flex items-center ">
            <Tabs defaultValue="zift">
              <TabsList>
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    onClick={() => setSelectedTab(tab.value)}
                    key={tab.value + index}
                    value={tab.value}
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="container mx-auto px-24 py-12">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="space-y-6 max-w-lg pt-8">
              <h4 className="text-4xl font-bold sm:text-5xl leading-14 ">
                {tabsData[selectedTab].title}
              </h4>
              <p className="text-gray-900/80 font-light text-xl">
              {tabsData[selectedTab].description}
              </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl border-2 border-white">
              <AspectRatio className="relative" ratio={16 / 9}>
                <Image
                  src="/images/image.png"
                  alt="hero"
                  className="object-cover object-center rounded-xl"
                  fill
                />
              </AspectRatio>
            </div>
          </div>
          <div className="mt-24 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {tabsData[selectedTab].features.map((feature, index) => (
              <div key={index} className="space-y-4">
                {feature.icon}
                <h2 className="text-[22px] ">{feature.title}</h2>
                <p className="text-gray-900/80 w-[290px]">
                  {feature.description}
                </p>

                <Link href={feature.link} className="flex font-semibold py-2">
                  Learn more <Arrow />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
