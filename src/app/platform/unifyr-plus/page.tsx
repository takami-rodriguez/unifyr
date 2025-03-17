import React from "react";
import { unifyrPlusPlatform as data } from "./pageData";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { ResolvingMetadata, Metadata } from "next";
import PlatformTemplate from "../components/platformTemplate";

const meta = {
  title: "Unifyr+",
  description:
    "Unifyr+ is the only platform designed for partners managing multiple supplier relationships. Keep atop supplier updates and register leads and deals in one place.",
};

export async function generateMetadata(
  {}: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(meta, parent);
}

const UnifyrPlusPage = async () => {
  return <PlatformTemplate data={data} />;
};

export default UnifyrPlusPage;
