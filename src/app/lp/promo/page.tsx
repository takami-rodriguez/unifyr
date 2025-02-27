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
import { PlatformWithWistiaId } from "@/types/platformTemplate";
import Partners from "@/components/partners";
import { boxShadow } from "@/data/styleHelpers";

const G2Page = async () => {
  return (
    <>
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-7">
        <div className="space-y-6 lg:col-span-4">
          <LPPageTitle
            title="Upgrade from your existing PRM and save at least 20%"
            highlightWord="Upgrade"
          />
          <p className="text-lg text-grey-900/80">
            Many new ZiftONE customers switched from alternative PRM platforms
            because they faced major challenges with ease of use, scaling,
            enablement, partner engagement, and support.
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
          <div className="border-1 mb-4 rounded-lg border-2 border-white bg-green-50 p-4">
            <span className="font-bold">Time-limited discount offer:</span>{" "}
            Receive at least 20% off your current PRM contract and receive
            plenty of help making the switch.
          </div>
          <LandingPageForm name email message id="1862" />
          <div className="mt-10 lg:mt-5">
            <G2Leaders />
          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-10 max-w-5xl space-y-6 rounded-2xl border-[1.5px] border-white bg-white/30 px-4 lg:mt-20 lg:px-14"
        style={boxShadow}
      >
        <div className="lg:-mx-2">
          <Partners />
        </div>
      </div>
      <PlatformVideoSection block={data.introSection as PlatformWithWistiaId} />
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
