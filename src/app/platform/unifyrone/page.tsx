import React from "react";
import data from "./pageData";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { ResolvingMetadata, Metadata } from "next";
import PlatformTemplate from "../components/platformTemplate";

const meta = {
  title: "UnifyrONE PRM",
  description:
    "UnifyrONE is an enterprise PRM product designed for businesses with youthful channel programs. Reach program maturity and channel ROI fastest with UnifyrONE.",
};

export async function generateMetadata(
  {}: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(meta, parent);
}

const ZiftOnePlatformPage = async () => {
  return <PlatformTemplate data={data} />;
};

export default ZiftOnePlatformPage;
