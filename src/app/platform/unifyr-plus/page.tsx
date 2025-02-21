import React from "react";
import { unifyrPlusPlatform as data } from "./pageData";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { ResolvingMetadata, Metadata } from "next";
import PlatformTemplate from "../components/platformTemplate";

const meta = {
  title: "Unifyr Plus Platform",
  description:
    "Unifyr Plus is the only platform that combines the power of channel marketing and sales automation to deliver a single, integrated solution for channel organizations.",
};

export async function generateMetadata(
  {}: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(meta, parent);
};

const UnifyrPlusPage = async () => {
  return (<PlatformTemplate data={data} /> );
};

export default UnifyrPlusPage;
