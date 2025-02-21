import Banner from "@/components/banner";
import FeatureList from "@/components/featureList";
import ImageText from "@/components/imageText";
import React from "react";
import PlatformAccordion from "./platformAccordion";
import PlatformHero from "./platformHero";
import PlatformImageSection from "./platformImageSection";
import PlatformJourney from "./platformJourney";
import {
  PlatformImageSectionBlock,
  PlatformTemplateProps,
  PlatformWithWistiaId,
} from "@/types/platformTemplate";
import PlatformVideoSection from "./platformVideoSection";

const PlatformTemplate = ({ data }: { data: PlatformTemplateProps }) => {
  return (
    <main>
      <PlatformHero block={data.hero} />
      {"wistiaVideoId" in data.introSection ? (
        <PlatformVideoSection
          block={data.introSection as PlatformWithWistiaId}
        />
      ) : (
        <PlatformImageSection
          block={data.introSection as PlatformImageSectionBlock}
        />
      )}

      <div className="mb-10">
        {data.imagesTexts.map((section) => (
          <ImageText key={section.title} {...section} rounded />
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

export default PlatformTemplate;
