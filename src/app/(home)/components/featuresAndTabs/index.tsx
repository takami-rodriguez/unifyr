"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { bgGradient } from "@/data/styleHelpers";
import { useMemo, useState } from "react";
import { tabsData, TabValue } from "./data";
import Features from "./features";

const tabs = [
  {
    title: "ZiftONE",
    value: TabValue.zift,
  },
  {
    title: "Unifyr Pro",
    value:TabValue.unifyrPro,
  },
  {
    title: "Unifyr+",
    value: TabValue.unifyrPlus,
  },
];

export default function FeaturesAndTabs() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  const selectedData = useMemo(() => tabsData[selectedTab],[selectedTab])

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="rounded-[3rem] overflow-hidden" style={bgGradient}>
        <div className=" mx-auto px-10 lg:px-24 py-6 ">
          <div className="flex items-center justify-center">
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
        <div className=" mx-auto px-6 lg:px-16  md:py-12">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="space-y-6 max-w-lg pt-8">
              <h4 className="text-4xl font-semibold sm:text-5xl md:leading-[1.125] ">
                {selectedData.title}
              </h4>
              <p className="text-gray-900/80 font-light text-xl">
              {selectedData.description}
              </p>
            </div>
            <div className="flex items-center justify-center ">
              <AspectRatio className="relative" ratio={519 / 365}>
                <Image
                  src={selectedData.image}
                  alt="hero"
                  className="object-cover object-center rounded-[25px] border-2 border-white"
                  fill
                />
              </AspectRatio>
            </div>
          </div>
          <Features features={selectedData.features} />
        </div>
      </div>
    </div>
  );
}
