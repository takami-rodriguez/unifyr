import React from "react";
import PlatformHero from "../components/platformHero";
import ImageText from "@/components/imageText";
import Banner from "@/components/banner";
import PlatformJourney from "../components/platformJourney";
import FeatureList from "@/components/featureList";
import PlatformAccordion from "../components/platformAccordion";
import { unifyrPlusPlatform as data } from "./pageData";
import PlatformImageSection from "../components/platformImageSection";

const UnifyrPlusPage = async () => {
  return (
    <main>
      <PlatformHero block={data.hero} />
      <PlatformImageSection block={data.introSection} />
      <div className="my-10">
        {data.imagesTexts.map((section) => (
          <ImageText key={section.title} {...section} rounded />
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
      {/* <CaseStudy /> */}
    </main>
  );
};

export default UnifyrPlusPage;
