import React from "react";
import { gradientText } from "@/data/styleHelpers";
import { Check } from "lucide-react";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { SEOData } from "@/types/seo";
import LandingPageForm from "../../components/forms/lpForm";
import G2Leaders from "../(home)/components/g2Leaders";

const listItems = [
  "ZiftONE provides suppliers with PRM, TCMA, and LMS built to scale.",
  "Unifyr+ helps partners manage many suppliers and stay atop them all.",
  "Unifyr Pro gives agencies a marketplace to find business in the channel.",
];

const metaData: SEOData = {
  title: "Book a call",
  description:
    "Get started with supplier or partner relationship management today. Experience the industry-leading product in PRM, ZiftONE.",
};

export async function generateMetadata(
  { params: {} }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(metaData, parent);
}

const GetADemo = async () => {
  return (
    <div className="mx-auto max-w-5xl pb-32 pt-12 md:pb-20">
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-7">
        <div className="space-y-10 lg:col-span-4">
          <h3 className="font-heading text-[4.375rem] font-bold leading-[5rem]">
            Successful partner channel programs{" "}
            <span style={gradientText}>start</span> here
          </h3>
          <p className="text-lg text-grey-900/80">
            The orchestration of partner ecosystems is cornerstone to the
            largest and most successful businesses, but reaching channel
            operations maturity doesn’t happen overnight.
          </p>
          <p className="text-lg text-grey-900/80">
            Businesses rely on{" "}
            <span className="font-bold text-grey-900">
              scalable, deeply integrated
            </span>{" "}
            partner relationship management platforms to enable their channel
            managers in achieving mutual growth through channel partnerships.
          </p>
          <p className="text-lg text-grey-900/80">
            Partners require intelligent tools to manage multiple supplier
            relationships and maximize workflow efficiency. Unifyr offers the
            industry-leading solutions to the toughest channel problems.
          </p>
          <ul className="space-y-4 text-lg text-grey-900/80">
            {listItems.map((item, index) => (
              <li key={item + index} className="flex items-center space-x-3">
                <div className="h-[20px] min-w-[20px] rounded-full bg-gradient p-1 text-white">
                  <Check size={"md"} />
                </div>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <LandingPageForm name email whoAmI message id="1859" withRouting />
          <div className="mt-10 lg:mt-5">
            <G2Leaders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetADemo;
