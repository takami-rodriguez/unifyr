import React from "react";
import PlatformHero from "../components/platformHero";
import PlatformVideoSection from "../components/platformVideoSection";
import ImageText from "@/components/imageText";
import Banner from "@/components/banner";
import PlatformJourney from "../components/platformJourney";
import FeatureList from "@/components/featureList";
import PlatformAccordion from "../components/platformAccordion";
import { ziftOnePlatform as data } from "./pageData";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { ResolvingMetadata, Metadata } from "next";

const meta = {
  title: "ZiftONE Platform",
  description:
    "ZiftONE is the only platform that combines the power of channel marketing and sales automation to deliver a single, integrated solution for channel organizations.",
}

export async function generateMetadata(
  { }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(meta, parent);
}

const ZiftOnePlatformPage = async () => {
  return (
    <main>
      <PlatformHero block={data.hero} />
      <PlatformVideoSection block={data.introSection} />
      <div className="mb-10">
        {data.imagesTexts.map((section, i) => (
          <ImageText key={section.title} {...section}  rounded={i===0}/>
        ))}
      </div>
      <PlatformJourney block={data.journey} />
      <div className="py-20">
        <FeatureList block={data.features} />
      </div>
      <PlatformAccordion block={data.platformAccordion} />
      <div className="py-20">
        <Banner />
      </div>
      {/* <CaseStudy /> */}
    </main>
  );
};

export default ZiftOnePlatformPage;
