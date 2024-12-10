import React from "react";
import { ArticleTemplateProps } from "@/types/article";
import CategoryBadge from "./categoryBadge";
import Author from "@/app/resources/components/author";
import { format } from "date-fns";

type TitleSectionProps = {
  article: ArticleTemplateProps;
  featured?: boolean;
};

const TitleSection = ({ article, featured }: TitleSectionProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-primary uppercase">
        {featured ? "Featured Story" : format(new Date(article.publishedDate), "MMMM dd")}
      </h2>
      <p className="font-bold text-[24px] leading-9 text-blue-900">
        {article.title}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.excerpt }} />
      {article.tags && (
        <div className="py-2.5">
          <CategoryBadge tags={article.tags} />
        </div>
      )}
      <Author author={article.author} />
    </div>
  );
};

export default TitleSection;
