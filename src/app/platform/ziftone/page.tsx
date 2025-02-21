import React from "react";
import { ziftOnePlatform as data } from "./pageData";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { ResolvingMetadata, Metadata } from "next";
import PlatformTemplate from "../components/platformTemplate";

const meta = {
  title: "ZiftONE Platform",
  description:
    "ZiftONE is the only platform that combines the power of channel marketing and sales automation to deliver a single, integrated solution for channel organizations.",
}

export async function generateMetadata(
  { }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(meta, parent);
}

const ZiftOnePlatformPage = async () => {
  return ( <PlatformTemplate data={data} /> );
};

export default ZiftOnePlatformPage;
