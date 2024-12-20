import React from "react";
import ArticleCard from "../articleCard";
import { ArticleTemplateProps } from "@/types/article";
type LatestArticlesProps = {
  articles: ArticleTemplateProps[];
};

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  return (
    <div className=" py-5 md:py-20 ">
      <div className="mb-8 md:mb-10 ">
        {/* <SubHeading title="The latest updates and articles" /> */}
      </div>
      <div className="max-w-7xl mx-auto overflow-visible relative">
        <div className="grid grid-cols-3 gap-6">
          {articles?.map((t) => (
            <ArticleCard article={t} key={t._uid}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
