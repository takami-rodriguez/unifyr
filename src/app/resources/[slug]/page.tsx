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
import RenderMarkdown from "@/components/renderMarkdown";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
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
      <article className=" mb-1 pt-12 max-w-2xl mx-auto">
        <h1 className="text-[2.45rem] md:text-[3rem] leading-[2.5rem] md:leading-[3rem] font-medium">
          {frontmatter.title}
        </h1>
        <div className=" flex flex-col lg:flex-row  lg:items-end  pt-8 lg:pt-10  text-grey-900 font-medium space-y-10 lg:space-y-0 ">
          {frontmatter.author && (
            <>
              <div
                className={clsx("flex  space-x-4 sm:items-center ", {
                  " text-center mx-auto": !frontmatter.author?.image?.url,
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
                  className={clsx("lg:mx-auto lg:text-left  sm:max-w-none", {
                    "max-w-40": frontmatter.author?.image?.url,
                  })}
                >
                  <h4 className="text-3.5xl font-normal ">
                    {frontmatter.author?.name}
                  </h4>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="text-grey-900/80 uppercase pt-2 lg:pb-6">
          {format(new Date(frontmatter.publishedDate), "MMMM dd")}
        </div>
        <div className=" pt-5 ">
          <RenderMarkdown content={content} />
        </div>
        <div className=" flex flex-col lg:flex-row  lg:items-end  py-10 lg:py-20  text-grey-900 font-medium space-y-10 lg:space-y-0 ">
          {frontmatter.author && (
            <>
              <div
                className={clsx("flex  space-x-6 sm:items-center ", {
                  " text-center mx-auto": !frontmatter.author?.image?.url,
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
                  className={clsx("lg:mx-auto lg:text-left  sm:max-w-none", {
                    "max-w-40": frontmatter.author?.image?.url,
                  })}
                >
                  <h4 className="text-3.5xl font-normal ">
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
