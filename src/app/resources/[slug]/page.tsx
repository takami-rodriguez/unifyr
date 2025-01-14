import Image from "next/image";
import LatestArticles from "@/app/resources/components/latestArticles";
import React from "react";
import clsx from "clsx";
import {
  fetchAllArticles,
  fetchArticleBySlug,
  getAllBlogSlugs,
} from "@/queries/resources";
import { PageProps } from "@/types/page";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Banner from "@/components/banner";
// TODO - add back SEO data once content agreed
// import { ResolvingMetadata, Metadata } from "next";
// import { getDynamicPageSEOData } from "@/lib/seoHelper";

// export async function generateMetadata(
//   { params: { slug, lang } }: PageProps,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   return getDynamicPageSEOData(
//     `resources/${Array.isArray(slug) ? slug.join("/") : slug}`,
//     lang,
//     parent
//   );
// }

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
      <div className=" mb-1 pt-12 max-w-2xl mx-auto">
        <h1 className="text-[2.5rem] leading-[2.5rem] font-medium">
          {frontmatter.title}
        </h1>
        <div className=" flex flex-col lg:flex-row  lg:items-end  py-2 lg:py-10  text-grey-900 font-medium space-y-10 lg:space-y-0 ">
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
        <div className=" pt-5 ">
          <ReactMarkdown
            className={clsx(
              "w-full font-resources prose-h2:text-4xl prose-h2:pt-8 prose-h3:pt-8 prose-h2:font-bold prose-h3:text-4xl prose-h3:font-bold text-grey-800 prose-p:text-[1.25rem] prose-p:leading-[2.5rem] space-y-6 prose-h2:text-[1.875rem] leading-[2.5rem]"
            )}
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
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
      </div>
      <Banner />
      {articles && <LatestArticles articles={articles} />}
    </>
  );
};

export default ArticlePage;
