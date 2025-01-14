"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnersIcon from "@/components/icons/partners";
import SupplierIcon from "@/components/icons/supplier";
import AccordionSection from "./accordionSection";
import { accordionSections } from "@/app/(home)/data";

const tabs: {
  id: "supplier" | "partner";
  title: string;
}[] = [
  {
    id: "supplier",
    title: "Supplier",
  },
  {
    id: "partner",
    title: "Partner",
  },
];
const FeaturesAccordionSection = () => {
  const [selectedId, setSelectedId] = React.useState<"supplier" | "partner">(
    "supplier"
  );
  return (
    <div className="">
      <Tabs className="flex justify-center" value={selectedId}>
        <TabsList hasIcon>
          {tabs.map((tab) => (
            <TabsTrigger
              value={tab.id}
              key={tab.id}
              onClick={() => setSelectedId(tab.id)}
              hasIcon
            >
              <span className="flex items-center space-x-2 ">
                <span className="hidden md:block">
                  {tab.title === "Supplier" ? (
                    <SupplierIcon selected={selectedId === tab.id} />
                  ) : (
                    <PartnersIcon selected={selectedId === tab.id} />
                  )}
                </span>
                <span>{tab.title}</span>
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
