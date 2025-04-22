import React from "react";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import { fetchAllAtlasPages, fetchAtlasPageBySlug } from "@/queries/atlas";
import Markdown from "@/components/markdown/markdown";
import { buildMarkdownTOC } from "@/lib/markdown";
import TOCSidebar from "./components/TOCSidebar";

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata | null> {
  const { slug } = await params;
  const page = await fetchAtlasPageBySlug(slug as string);
  if (!page?.frontMatter?.seo) {
    return null;
  }
  return getDynamicPageSEOData(page.frontMatter.seo, parent);
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return (await fetchAllAtlasPages()).map((page) => ({ slug: page.slug }));
}

const AtlasPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const page = await fetchAtlasPageBySlug(slug as string);
  if (!page) return null;

  const TOCitems = await buildMarkdownTOC(page.markdownSource);

  return (
    <div className="relative mx-auto mb-1 max-w-5xl py-12">
      <div className="flex gap-8">
        <TOCSidebar items={TOCitems} />
        <div className="flex-1 pl-6 md:pl-0">
          <h1 className="mb-8 font-heading text-5xl font-bold">{page.title}</h1>
          <Markdown content={page.markdownSource} />
        </div>
      </div>
    </div>
  );
};

export default AtlasPage;
