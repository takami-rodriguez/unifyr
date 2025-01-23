import Markdown from "@/components/markdown";
import { fetchMarkdownBySlug } from "@/queries/pagesMarkdown";
import React from "react";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { SEOData } from "@/types/seo";

const metaData: SEOData = {
  title: "Terms of Service",
  description: "The Unifyr Terms of Service.",
};

export async function generateMetadata(
  { params: {} }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(metaData, parent);
}

export default async function TermsPage() {
  const { content } = await fetchMarkdownBySlug("terms");

  return (
    <div className="mx-auto mb-1 max-w-2xl py-12">
      <Markdown content={content} />
    </div>
  );
}
