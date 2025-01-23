import Image from "next/image";
import LatestArticles from "@/app/resources/components/latestArticles";
import React from "react";
import clsx from "clsx";
import {
  fetchAllArticles,
  fetchArticleBySlug,
  getAllBlogSlugs,
} from "@/queries/resources";
import Banner from "@/components/banner";
import { format } from "date-fns";
import Markdown from "@/components/markdown";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";

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
      <article className="mx-auto mb-1 max-w-2xl pt-12">
        <h1 className="text-[2.45rem] font-medium leading-[2.5rem] md:text-[3rem] md:leading-[3rem]">
          {frontmatter.title}
        </h1>
        <div className="flex flex-col space-y-10 pt-8 font-medium text-grey-900 lg:flex-row lg:items-end lg:space-y-0 lg:pt-10">
          {frontmatter.author && (
            <>
              <div
                className={clsx("flex space-x-4 sm:items-center", {
                  "mx-auto text-center": !frontmatter.author?.image?.url,
                })}
              >
                {frontmatter.author?.image?.url && (
                  <Image
                    src={frontmatter.author.image?.url || ""}
                    alt={frontmatter.author.name}
                    width={45}
                    height={45}
                    className="rounded-sm"
                  />
                )}
                <div
                  className={clsx("sm:max-w-none lg:mx-auto lg:text-left", {
                    "max-w-40": frontmatter.author?.image?.url,
                  })}
                >
                  <h4 className="text-3.5xl font-normal">
                    {frontmatter.author?.name}
                  </h4>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="pt-2 uppercase text-grey-900/80 lg:pb-6">
          {format(new Date(frontmatter.publishedDate), "MMMM dd")}
        </div>
        <div className="pt-5">
          <Markdown content={content} />
        </div>
        <div className="flex flex-col space-y-10 py-10 font-medium text-grey-900 lg:flex-row lg:items-end lg:space-y-0 lg:py-20">
          {frontmatter.author && (
            <>
              <div
                className={clsx("flex space-x-6 sm:items-center", {
                  "mx-auto text-center": !frontmatter.author?.image?.url,
                })}
              >
                {frontmatter.author?.image?.url && (
                  <Image
                    src={frontmatter.author.image?.url || ""}
                    alt={frontmatter.author.name}
                    width={80}
                    height={80}
                    className="rounded-sm"
                  />
                )}
                <div
                  className={clsx("sm:max-w-none lg:mx-auto lg:text-left", {
                    "max-w-40": frontmatter.author?.image?.url,
                  })}
                >
                  <h4 className="text-3.5xl font-normal">
                    {frontmatter.author?.name}
                  </h4>
                </div>
              </div>
            </>
          )}
        </div>
      </article>
      <Banner />
      {articles && <LatestArticles articles={articles} />}
    </>
  );
};

export default ArticlePage;
