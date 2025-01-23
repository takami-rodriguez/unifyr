import { fetchAllArticles, fetchResourcesPageData } from "@/queries/resources";
import React from "react";
import FeaturedArticle from "./components/featuredArticle";
import Banner from "@/components/banner";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import { PageProps } from "@/types/page";
import { SEOData } from "@/types/seo";
import { Metadata, ResolvingMetadata } from "next";

const metaData: SEOData = {
  title: "Blog",
  description:
    "The blog index for Unifyr articles. Learn more about proper partner relationship management and high-performance channel sales.",
};

export async function generateMetadata(
  { params: {} }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return getDynamicPageSEOData(metaData, parent);
}

const ResourcesPage = async () => {
  const pageData = await fetchResourcesPageData();
  const allArticles = await fetchAllArticles();
  if (!pageData) return null;
  // const filteredArticles = allArticles.filter(
  //   (article) =>
  //     article.frontmatter.title !== pageData.featuredArticle.frontmatter.title
  // );
  return (
    <div className="mb-1 space-y-12 overflow-x-hidden py-12">
      <div className="grid-col-1 mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        {allArticles.map((article) => {
          return (
            <div className="col-span-1" key={article.frontmatter._uid}>
              <FeaturedArticle article={article} />
            </div>
          );
        })}
      </div>
      {/* <Suspense fallback={<div>Loading...</div>}>
        {filteredArticles.length < 0 && (
          <ListArticles articles={filteredArticles} />
        )}
      </Suspense> */}
      <Banner />
      {/* <div className="max-w-5xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          <div className="space-y-8">
            <h3 className="font-heading font-extrabold text-5xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h3>
            <p>
              Praesent placerat ipsum nec mi maximus, vel cursus mauris cursus.
              Vivamus cursus ante eget orci egestas malesuada.
            </p>
            <G2Leaders />
          </div>
          <div>
            <GetInTouch />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ResourcesPage;
