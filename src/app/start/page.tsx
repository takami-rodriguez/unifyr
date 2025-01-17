import React from "react";
import GetInTouch from "@/components/forms/getInTouch";
import { gradientText } from "@/data/styleHelpers";
import { Check } from "lucide-react";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { SEOData } from "@/types/seo";

const listItems = [
  "For small businesses through to the largest enterprises, ZiftONE is PRM built to scale.",
  "For partners with any number of suppliers, Unifyr+ reinvents partner channel sales.",
  "For agencies seeking business with the smartest suppliers, Unifyr Pro is your marketplace.",
];

const metaData: SEOData = {
  title: "",
  plugin: "",
  og_image: "",
  og_title: "",
  description: "",
  twitter_image: "",
  twitter_title: "",
  og_description: "",
  twitter_description: "",
}

export async function generateMetadata(
{ params: {  } }: PageProps,
parent: ResolvingMetadata
): Promise<Metadata> {
return getDynamicPageSEOData(metaData,parent);
}


const GetADemo = async () => {
  return (
    <div className="max-w-5xl mx-auto pt-12 pb-32 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-7 items-center gap-16 w-full">
        <div className="space-y-10 lg:col-span-4">
          <h3 className="font-heading text-[4.375rem] leading-[5rem] font-bold ">
            Successful partner channel programs <span style={gradientText}>start</span> here
          </h3>
          <p className="text-grey-900/80 text-lg">
              The orchestration of partner ecosystems is cornerstone to the largest and most successful businesses, but reaching channel operations maturity doesn’t happen overnight. Businesses rely on <span className="font-bold text-grey-900">scalable, deeply integrated</span> partner relationship management platforms to enable their channel managers in achieving mutual growth through channel partnerships. Partners require intelligent tools to manage multiple supplier relationships and maximize workflow efficiency. Unifyr offers the industry-leading solutions to the toughest channel problems.
          </p>
          <ul className="text-grey-900/80 text-lg space-y-4">
            {listItems.map((item, index) => (
              <li key={item + index} className="flex space-x-3 items-center">
                <div className="bg-gradient p-1 rounded-full text-white h-[20px] min-w-[20px]" >
                  <Check size={"md"} />
                </div>
                <p>{item}</p>
              </li>
            ))}
          </ul>
          {/* <G2Leaders /> */}
        </div>
        <div className="lg:col-span-3">
          <GetInTouch id="1859"/>
        </div>
      </div>
    </div>
  );
};

export default GetADemo;
