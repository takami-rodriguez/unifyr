import Image from "next/image";
import LatestArticles from "@/app/resources/components/latestArticles";
import React from "react";
import clsx from "clsx";
import { fetchAllArticles, fetchArticleBySlug } from "@/queries/resources";
import { PageProps } from "@/types/page";
import { slugify } from "@/lib/utils";

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

export async function generateStaticParams() {
  const posts = await fetchAllArticles();

  return posts.map((post) => ({
    slug: slugify(post.title),
  }));
}

const ArticlePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug as string);
  const articles = await fetchAllArticles();
  if (!article) return null;
  const content = article.content;
  return (
    <div className="overflow-x-hidden mb-1 pt-12 max-w-5xl mx-auto">
      <h1 className="text-4xl ">{article.title}</h1>
      <div className=" pt-20 ">
        <div
          className={clsx(
            "prose w-[100%]    prose-p:text-blue-900 prose-strong:text-blue-900"
          )}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </div>
      <div className=" flex flex-col lg:flex-row  lg:items-end  py-10 lg:py-20  text-grey-900 font-medium space-y-10 lg:space-y-0 ">
        {article.author && (
          <>
            <div
              className={clsx("flex  space-x-6 sm:items-center ", {
                " text-center mx-auto": !article.author?.image?.url,
              })}
            >
              {article.author?.image?.url && (
                <Image
                  src={article.author.image?.url || ""}
                  alt={article.author.name}
                  width={80}
                  height={80}
                  className="rounded-sm"
                />
              )}
              <div
                className={clsx("lg:mx-auto lg:text-left  sm:max-w-none", {
                  "max-w-40": article.author?.image?.url,
                })}
              >
                <h4 className="text-3.5xl font-normal ">
                  {article.author?.name}
                </h4>
              </div>
            </div>
          </>
        )}
      </div>
      <h3 className="text-4xl text-center -mb-20">Related Articles</h3>
      {articles && <LatestArticles articles={articles} />}
    </div>
  );
};

export default ArticlePage;
