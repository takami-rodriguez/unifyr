"use client";

import React  from "react";
import { useSearchParams } from "next/navigation";
import Categories from "./categories";
import RemainingArticles from "./remainingArticles";
import { ArticleTemplateProps } from "@/types/article";

type ListArticlesProps = {
  articles: ArticleTemplateProps[];
};

const ListArticles = ({ articles }: ListArticlesProps) => {
  const queryParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    queryParams.get("category") || "ALL"
  );

  return (
    <div className="bg-grey ">
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className=" pb-16 ">
        {articles && (
          <RemainingArticles
            selectedCategory={selectedCategory}
            articles={articles}
          />
        )}
      </div>
    </div>
  );
};

export default ListArticles;
