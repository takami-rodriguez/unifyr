import { fetchAllArticles, fetchResourcesPageData } from "@/queries/resources";
import React, { Suspense } from "react";
import FeaturedArticle from "./components/featuredArticle";
import ListArticles from "./components/listArticles";

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
  return (
    <div className="overflow-x-hidden mb-1 max-w-5xl mx-auto space-y-12 pt-12">
      {pageData && <FeaturedArticle article={pageData?.featuredArticle} />}
      <Suspense fallback={<div>Loading...</div>}>
        {allArticles && <ListArticles articles={allArticles} />}
      </Suspense>
      {/* <Banner blok={pageData.banner} /> */}
    </div>
  );
};

export default ResourcesPage;
