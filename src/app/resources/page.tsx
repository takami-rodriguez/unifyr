import { fetchAllArticles, fetchResourcesPageData } from "@/queries/resources";
import React, { Suspense } from "react";
import FeaturedArticle from "./components/featuredArticle";
import ListArticles from "./components/listArticles";
import Banner from "@/components/banner";
import G2Leaders from "../(home)/components/g2Leaders";
import GetInTouch from "@/components/forms/getInTouch";

// TODO - add back SEO data once content agreed
// import Banner from "@/components/banner";
// import { ResolvingMetadata, Metadata } from "next";
// import { PageProps } from "@/types/page";
// import { getDynamicSEOData } from "@/lib/seoHelper";

// export async function generateMetadata(
//   {  }: PageProps,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {

//   return getDynamicSEOData("home",  parent);
// }

const ResourcesPage = async () => {
  const pageData = await fetchResourcesPageData();
  const allArticles = await fetchAllArticles();
  if (!pageData) return null;
  const filteredArticles = allArticles.filter(
    (article) =>
      article.frontmatter.title !== pageData.featuredArticle.frontmatter.title
  );
  return (
    <div className="overflow-x-hidden mb-1  space-y-12 py-12">
      {pageData && <FeaturedArticle article={pageData?.featuredArticle} />}
      <Suspense fallback={<div>Loading...</div>}>
        {filteredArticles.length < 0 && (
          <ListArticles articles={filteredArticles} />
        )}
      </Suspense>
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
