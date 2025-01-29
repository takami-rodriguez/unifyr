import React from "react";
import { gradientText } from "@/data/styleHelpers";
import { Check } from "lucide-react";
import { PageProps } from "@/types/page";
import { getLPData } from "@/queries/landingPage";
import { renderToString } from "react-dom/server";
import LandingPageForm from "./components/lpForm";
import G2Leaders from "@/app/(home)/components/g2Leaders";

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

const LandingPageTemplate = async ({ params }: PageProps) => {
  const data = await getLPData(String((await params).slug));

  const listItems = data?.listItems;
  return (
    <div className="mx-auto max-w-5xl pb-32 pt-12 md:pb-20">
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-7">
        <div className="space-y-10 lg:col-span-4">
          <h1
            className="font-heading text-[4.375rem] font-bold leading-[5rem]"
            dangerouslySetInnerHTML={{
              __html: data.title.replace(
                new RegExp(`\\b${data.titleHighlight}\\b`, "i"),
                (match) =>
                  renderToString(<span style={gradientText}>{match}</span>),
              ),
            }}
          />
          {data.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-grey-900/80">
              {paragraph}
            </p>
          ))}
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
          {/* <G2Leaders /> */}
        </div>
        <div className="lg:col-span-3">
          <LandingPageForm id={data.formId} />
          <G2Leaders />

        </div>
      </div>
    </div>
  );
};

export default LandingPageTemplate;
