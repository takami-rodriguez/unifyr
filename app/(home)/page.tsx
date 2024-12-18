import ImageText from "@/components/imageText";
import Hero from "./components/hero";
import Partners from "./components/partners";
import { homeSections } from "./data";
import FeaturesAccordionSection from "@/components/featuresAccordionSection";
import FeaturesAndTabs from "@/components/featuresAndTabs";
import CaseStudy from "./components/caseStudies";
import Banner from "@/components/banner";
import HomeCarousel from "./components/carousel";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <HomeCarousel />
      <Partners />
      {homeSections.map((section) => (
        <ImageText key={section.title} {...section} />
      ))}
      <FeaturesAccordionSection  />
      <div className="py-20">
        <FeaturesAndTabs />
      </div>
      <CaseStudy />
      <div className="py-12 ">

      <Banner/>
      </div>
    </div>
  );
}
