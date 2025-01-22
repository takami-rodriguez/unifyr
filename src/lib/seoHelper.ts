import { metadata } from "@/app/layout";
import { SEOData } from "@/types/seo";
import { Metadata, ResolvingMetadata } from "next";

export const getDynamicPageSEOData = async (
  data: SEOData,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  // fetch data
  if (!data) return metadata;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.fullTitle || data?.title + " — Unifyr",
    description: data?.description,
    openGraph: {
      title: data.fullTitle || (data?.og_title || data?.title) + " — Unifyr",
      description: data?.og_description || data?.description,
      images: [
        data?.og_image || "",
        ...previousImages,
      ],
    },
  };
};
