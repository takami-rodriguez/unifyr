"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import PartnersIcon from "../icons/partners";
import SupplierIcon from "../icons/supplier";
import AccordionSection from "./accordionSection";
import { accordionSections } from "@/app/(home)/data";

const tabs: {
  id: "supplier" | "partner";
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "partner",
    title: "Partner",
    icon: <PartnersIcon />,
  },
  {
    id: "supplier",
    title: "Supplier",
    icon: <SupplierIcon />,
  },
];
const FeaturesAccordionSection = () => {
  const [selectedId, setSelectedId] = React.useState<"supplier" | "partner">(
    "supplier"
  );
  return (
    <div className="">
      <Tabs className="flex justify-center" value={selectedId}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              value={tab.id}
              key={tab.id}
              onClick={() => setSelectedId(tab.id)}
              className=""
            >
              <span className="flex items-center space-x-2 ">
                {tab.icon}
                {tab.title}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <AccordionSection blok={accordionSections[selectedId]} />
    </div>
  );
};

export default FeaturesAccordionSection;
