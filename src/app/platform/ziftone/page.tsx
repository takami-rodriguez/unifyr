import React from "react";
import PlatformHero from "../components/platformHero";
import PlatformVideoSection from "../components/platformVideoSection";
import ImageText from "@/components/imageText";
import Banner from "@/components/banner";
import CaseStudy from "@/app/(home)/components/caseStudies";
import PlatformJourney from "../components/platformJourney";
import FeatureList from "@/components/featureList";
import PlatformAccordion from "../components/platformAccordion";
import { ziftOnePlatform as data } from "./pageData";





const ZiftOnePlatformPage = async () => {
  return (
    <main>
      <PlatformHero block={data.hero} />
      <PlatformVideoSection block={data.introSection} />
      <div className="my-10">
        {data.imagesTexts.map((section) => (
          <ImageText key={section.title} {...section} />
        ))}
      </div>
      <PlatformJourney block={data.journey} />
      <div className="py-32">
        <FeatureList block={data.features} />
      </div>
      <PlatformAccordion block={data.platformAccordion} />
      <div className="py-12">
        <Banner />
      </div>
      <CaseStudy />
    </main>
  );
};

export default ZiftOnePlatformPage;
