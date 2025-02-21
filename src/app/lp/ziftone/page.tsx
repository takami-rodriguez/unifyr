import React from "react";
import LandingPageForm from "@/components/forms/lpForm";
import G2Leaders from "@/app/(home)/components/g2Leaders";
import LPPageTitle from "../components/pageTitle";
import LPImage from "../components/lpImage";
import LPListItems from "../components/lpListItems";
import PlatformVideoSection from "@/app/platform/components/platformVideoSection";
import ImageText from "@/components/imageText";
import PlatformJourney from "@/app/platform/components/platformJourney";
import FeatureList from "@/components/featureList";
import { ziftOnePlatform as data } from "../../platform/ziftone/pageData";

const G2Page = async () => {
  return (
    <>
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-7">
        <div className="space-y-6 lg:col-span-4">
          <LPPageTitle
            title="ZiftONE leads PRM innovation since 2006"
            highlightWord="innovation"
          />
          <p className="text-lg text-grey-900/80">
            {
              "ZiftONE is the only PRM solution with bespoke implementations and deeply integrated, privacy-first AI features designed to propel your business toward channel success now and ever forward as you grow and scale."
            }
          </p>
          <LPImage
            src={"/images/home/features/unifyr-element-ziftone.png"}
            alt={""}
          />
          <LPListItems
            items={[
              "A partner portal built for your channel partnership requirements.",
              "Bespoke integrations with the tools you already use or plan to use.",
              "Support to succeed in the channel independent of size.",
            ]}
          />
        </div>
        <div className="lg:col-span-3 lg:pt-36">
          <LandingPageForm name email message id={"1862"} />
          <div className="mt-10 lg:mt-5">
            <G2Leaders />
          </div>
        </div>
      </div>

      <PlatformVideoSection block={data.introSection} />
      <div className="my-10">
        {data.imagesTexts.map((section, i) => (
          <ImageText key={section.title} {...section} rounded={i === 0} />
        ))}
      </div>
      <PlatformJourney block={data.journey} />
      <div className="py-20">
        <FeatureList block={data.features} />
      </div>
    </>
  );
};

export default G2Page;
