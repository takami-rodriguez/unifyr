import React from "react";
import ArticleCard from "../articleCard";
import { ArticleTemplateProps } from "@/types/article";
type LatestArticlesProps = {
  articles: ArticleTemplateProps[];
};

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  return (
    <div className="py-12">
      <h3 className="pb-5 text-center text-[2rem] font-medium leading-[2.5rem]">
        Related Posts
      </h3>
      <div className="relative mx-auto max-w-5xl overflow-visible">
        <div className="flex flex-col justify-center gap-6 md:flex-row">
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
