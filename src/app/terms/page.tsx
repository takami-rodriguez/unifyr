import Markdown from "@/components/markdown";
import { fetchMarkdownBySlug } from "@/queries/pagesMarkdown";
import React from "react";
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
  { params: { } }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return getDynamicPageSEOData(metaData, parent);
}

export default async function TermsPage() {
  const { content } = await fetchMarkdownBySlug("terms");

  return (
    <div className=" mb-1 py-12 max-w-2xl mx-auto">
      <Markdown content={content} />
    </div>
  );
};
