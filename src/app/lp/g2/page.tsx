import React from "react";
import LandingPageForm from "@/components/forms/lpForm";
import G2Leaders from "@/app/(home)/components/g2Leaders";
import LPPageTitle from "../components/pageTitle";
import LPImage from "../components/lpImage";
import LPListItems from "../components/lpListItems";

const G2Page = async () => {
  return (
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
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1">
            <LPImage src={"/images/home/features/unifyrpro.webp"} alt={""} />
          </div>
          <div className="col-span-1">
            <LPImage src={"/images/home/features/ziftone.webp"} alt={""} />
          </div>
        </div>
        <LPListItems
          items={[
            "A partner portal built for your channel partnership requirements.",
            "Bespoke integrations with the tools you already use or plan to use.",
            "Support to succeed in the channel independent of size.",
          ]}
        />
      </div>
      <div className="lg:col-span-3">
        <LandingPageForm name email message id={"1862"} />
        <div className="mt-10 lg:mt-5">
          <G2Leaders />
        </div>
      </div>
    </div>
  );
};

export default G2Page;
