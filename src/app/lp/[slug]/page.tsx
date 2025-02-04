import React from "react";
import { Check } from "lucide-react";
import { PageProps } from "@/types/page";
import {
  getAllLPPageSlugs,
  getLPData,
  LandingPageSlug,
} from "@/queries/landingPage";
import LandingPageForm from "./components/lpForm";
import G2Leaders from "@/app/(home)/components/g2Leaders";
import LPPageTitle from "./components/pageTitle";
import Partners from "@/components/partners";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";
import { boxShadow } from "@/data/styleHelpers";
import Testimonial from "@/components/testimonial";

// TODO - do we need SEO data for landing pages?

// const metaData: SEOData = {
//   title: "Book a call",
//   description:
//     "Get started with supplier or partner relationship management today. Experience the industry-leading product in PRM, ZiftONE.",
// };

// export async function generateMetadata(
//   { params: {} }: PageProps,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   return getDynamicPageSEOData(metaData, parent);
// }

export function generateStaticParams() {
  console.log("generateStaticParams", getAllLPPageSlugs());
  return getAllLPPageSlugs();
}
export const dynamicParams = false;

const LandingPageTemplate = async ({ params }: PageProps) => {
  const data = await getLPData((await params).slug as LandingPageSlug);
  const listItems = data?.listItems;
  return (
    <main className="mx-auto max-w-5xl pb-32 pt-12 md:pb-20">
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-7">
        <div className="space-y-6 lg:col-span-4">
          <LPPageTitle data={data} />
          {data.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-grey-900/80">
              {paragraph}
            </p>
          ))}
          {
            data.image && (
              <AspectRatio ratio={5.8 / 2.3} className="relative rounded-3xl border-[8px] border-[#F5F3FB] overflow-hidden -mx-3">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover object-center border-[8px] rounded-2xl border-white"
                />
              </AspectRatio>
            )
          }
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
          <LandingPageForm id={data.formId} />
          <div className="mt-5">
            <G2Leaders />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "mt-20 space-y-6 rounded-2xl border-[1.5px] border-white bg-white/30 px-14 -mx-2",
        )}
        style={boxShadow}
      >
        <Partners />
      </div>
      <div className="mt-20">
        <Testimonial />
      </div>
    </main>
  );
};

export default LandingPageTemplate;
