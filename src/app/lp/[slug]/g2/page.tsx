import React from "react";
import LandingPageForm from "@/components/forms/lpForm";
import G2Leaders from "@/app/(home)/components/g2Leaders";
import LPPageTitle from "../components/pageTitle";
import LPImage from "../components/lpImage";
import { Metadata } from "next";
import LPListItems from "../components/lpListItems";

export const metaData: Metadata = {
  title: "G2 Landing Page",
  description:
    "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam et",
};

const G2Page = async () => {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-7">
      <div className="space-y-6 lg:col-span-4">
        <LPPageTitle title="Lorem ipsum dolor sit amet" highlightWord="Lorem" />
        <p className="text-lg text-grey-900/80">
          {
            "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam et faucibus auctor. Curabitur a nisi eu lacus tempor blandit. Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. "
          }
        </p>
        <LPImage src={"/images/image.png"} alt={""} />
        <LPListItems
          items={[
            "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
            "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
            "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. nisi, vel tincidunt nunc viverra nec. ",
          ]}
        />
      </div>
      <div className="lg:col-span-3">
        <LandingPageForm name email message  id={"g2_FORM_ID"} />
        <div className="mt-10 lg:mt-5">
          <G2Leaders />
        </div>
      </div>
    </div>
  );
};

export default G2Page;
