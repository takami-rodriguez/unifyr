import LatestArticles from "@/app/resources/components/latestArticles";
import React from "react";
import {
  fetchAllArticles,
  fetchArticleBySlug,
  getAllBlogSlugs,
} from "@/queries/resources";
import Banner from "@/components/banner";
import Markdown from "@/components/markdown";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import ResourceHero from "./components/resourceHero";
import Author from "../components/author";

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await fetchArticleBySlug(slug as string);
  return getDynamicPageSEOData(frontmatter.seo!, parent);
}

export function generateStaticParams() {
  return getAllBlogSlugs();
}

export const dynamicParams = false;

const ArticlePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { frontmatter, content } = await fetchArticleBySlug(slug as string);
  const articles = await fetchAllArticles();
  if (!content) return null;
  return (
    <>
      <article className="mx-auto mb-1 max-w-3xl pt-12">
        <ResourceHero frontmatter={frontmatter} />
        <div className="mx-auto mb-1 max-w-2xl pt-5">
          <Markdown content={content} />
        </div>
        <div className="flex flex-col space-y-10 py-10 font-medium text-grey-900 lg:flex-row lg:items-end lg:space-y-0 lg:py-20">
          {frontmatter.author && (
            <Author author={frontmatter.author} size={80} />
          )}
        </div>
      </article>
      <Banner />
      {articles && <LatestArticles articles={articles} />}
    </>
  );
};

export default ArticlePage;
