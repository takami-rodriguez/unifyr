import React from "react";
import { ResolvingMetadata, Metadata } from "next";
import { PageProps } from "@/types/page";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { SEOData } from "@/types/seo";
import LeadershipTeam from "./components/leadership";
import HeroFullBleedImage from "./components/aboutHero";
import { aboutPageData } from "./pageData";

const metaData: SEOData = {
  title: "About",
  description:
    "Unifyr provides industry-leading supplier and partner management solutions for high-performance channel programs.",
};

export async function generateMetadata(
  {}: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(metaData, parent);
}

const AboutPage = async () => {
  return (
    <div className="mb-1 overflow-x-hidden">
      <HeroFullBleedImage block={aboutPageData.hero} />
      <div className="mx-auto space-y-8 py-12 font-medium sm:max-w-[823px] md:py-[71px]">
        {aboutPageData.intro.map((p, i) => (
          <p
            key={i}
            className="text-lg leading-8 text-grey-900/80 md:text-[1.375rem]"
          >
            {p}
          </p>
        ))}
      </div>
      <div className="mb-20">
        <LeadershipTeam block={aboutPageData.leadership} />
      </div>
    </div>
  );
};

export default AboutPage;
