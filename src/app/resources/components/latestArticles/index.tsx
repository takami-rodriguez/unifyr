import React from "react";
import ArticleCard from "../articleCard";
import { ArticleTemplateProps } from "@/types/article";
type LatestArticlesProps = {
  articles: ArticleTemplateProps[];
};

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  return (
    <div className=" py-12  ">
      <h3 className="text-[2rem] leading-[2.5rem] text-center font-medium pb-5">
        Related Posts
      </h3>
      <div className="max-w-5xl mx-auto overflow-visible relative">
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
          {articles?.map((t) => (
            <div key={t.frontmatter._uid} className="basis-1/3">

            <ArticleCard article={t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
