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
          title="Let’s make upgrading your PRM easy"
          highlightWord="easy"
        />
        <p className="text-lg text-grey-900/80">
          ZiftONE customers often transition from an existing PRM solution that
          fails to offer the partner portal customizability and native
          integrations with existing tools they need to scale. Join us to grow
          your channel program and enjoy{" "}
          <span className="font-bold">50% off MSRP</span> your first year.
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
  );
};

export default G2Page;
