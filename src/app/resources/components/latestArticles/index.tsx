import React from "react";
import ArticleCard from "../articleCard";
import { ArticleTemplateProps } from "@/types/article";
type LatestArticlesProps = {
  articles: ArticleTemplateProps[];
};

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  return (
    <div className=" pt-12  ">
            <h3 className="text-[2rem] leading-[2.5rem] text-center font-medium pb-5">Related Posts</h3>
      
      <div className="max-w-5xl mx-auto overflow-visible relative">
        <div className="grid grid-cols-3 gap-6">
          {articles?.map((t) => (
            <ArticleCard article={t} key={t.frontmatter._uid}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
