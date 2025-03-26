import React from "react";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import { fetchAtlasPageBySlug, fetchAllAtlasPages } from "@/queries/atlas";
import AtlasHero from "./components/atlasHero";
import AtlasTermsList from "./components/atlasTermsList";

// TODO: Add "featured" atlas term (something like _index.md) so it contains all
// the seo data in markdown format? Or just hard-code seo data for index here?
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

const AtlasPage: React.FC<PageProps> = async () => {
  const pagesData = await fetchAllAtlasPages();
  return (
    <div className="mx-auto mb-1 max-w-5xl space-y-12 overflow-x-hidden py-12">
      <AtlasHero title="Atlas">
        A detailed guide to key terms, concepts, and best practices in Partner
        Relationship Management (PRM) and the Channel Ecosystem. This resource
        helps businesses and partners navigate channel sales, marketing
        automation, and partner enablement to drive growth and collaboration.
      </AtlasHero>
      <AtlasTermsList atlasPages={pagesData} />
    </div>
  );
};

export default AtlasPage;
