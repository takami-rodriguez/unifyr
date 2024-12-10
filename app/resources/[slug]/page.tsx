import Image from "next/image";
import LatestArticles from "@/components/articles/latestArticles";
import React from "react";
import clsx from "clsx";
import { fetchAllArticles, fetchArticleBySlug } from "@/queries/resources";
import { PageProps } from "@/types/page";
import { slugify } from "@/lib/utils";
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
  const posts = await fetchAllArticles()
 
  return posts.map((post) => ({
    slug: slugify(post.title),
  }))
}

const ArticlePage = async ({params}: PageProps) => {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug as string);
  const articles = await fetchAllArticles();
  if (!article) return null;
  const content = article.content;
  return (
    <div className="overflow-x-hidden mb-1 pt-12 max-w-7xl mx-auto">
        {/* <div
          className=" px-5 lg:px-52 pt-10 flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-8
         prose-p:text-blue-900"
        >
          <div>
            <CategoryBadge tags={article.tags} />
          </div>
          <div className="flex items-center space-x-8 text-lg font-medium leading-7">
            <div>
              {format(new Date(article.publishedDate), "MMMM dd, yyyy")}
            </div>
          </div>
        </div> */}
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
                className={clsx(
                  "flex  space-x-6 sm:items-center ",
                  {
                    " text-center mx-auto": !article.author?.image?.url,
                  }
                )}
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
                  className={clsx(
                    "lg:mx-auto lg:text-left  sm:max-w-none",
                    {
                      "max-w-40": article.author?.image?.url,
                    }
                  )}
                >
                  <h4 className="text-3.5xl font-normal ">
                    {article.author?.name}
                  </h4>
                </div>
              </div>
            </>
          )}
          {/* <SocialShare /> */}
        </div>
      {/* </ColouredHero> */}
        <h3 className="text-4xl text-center -mb-20">Related Articles</h3>
        {articles && <LatestArticles articles={articles} />}
    </div>
  );
};

export default ArticlePage;
