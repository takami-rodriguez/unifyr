import ImageText from "@/components/imageText";
import Hero from "./components/hero";
import Partners from "./components/partners";
import { homeSections } from "./data";
import FeaturesAccordionSection from "@/app/(home)/components/featuresAccordionSection";
import FeaturesAndTabs from "@/app/(home)/components/featuresAndTabs";
import CaseStudy from "./components/caseStudies";
import Banner from "@/components/banner";
import HomeCarousel from "./components/carousel";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { SEOData } from "@/types/seo";

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


export default function Home() {
  return (
    <main className="">
      <Hero />
      <HomeCarousel />
      <Partners />
      {homeSections.map((section) => (
        <ImageText key={section.title} {...section} />
      ))}
      <FeaturesAccordionSection />
      <div className="py-20">
        <FeaturesAndTabs />
      </div>
      <CaseStudy />
      <div className="py-12 ">
        <Banner />
      </div>
    </main>
  );
}
