import React from "react";
import ArticleCard from "@/app/resources/components/articleCard";
import { ArticleTemplateProps } from "@/types/article";

type RemainingArticlesProps = {
  selectedCategory: string;
  articles: ArticleTemplateProps[];
};

const RemainingArticles = ({ articles }: RemainingArticlesProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-5 sm:grid-cols-2 md:grid-cols-3">
      {articles?.map((article, i) => {
        return (
          <div key={article.frontmatter.title + i}>
            <ArticleCard article={article} index={i} />
          </div>
        );
      })}
    </div>
  );
};

export default RemainingArticles;
