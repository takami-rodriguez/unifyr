import React from "react";
import { ArticleTemplateProps } from "@/types/article";
import CategoryBadge from "./categoryBadge";
import Author from "@/app/resources/components/author";

type TitleSectionProps = {
  article: ArticleTemplateProps;
  featured?: boolean;
};

const TitleSection = ({ article }: TitleSectionProps) => {
  return (
    <div className="space-y-2">
      {/* <h2 className="text-primary uppercase">
        {featured ? "Featured Story" : format(new Date(article.frontmatter.publishedDate), "MMMM dd")}
      </h2> */}
      <p className="text-[24px] font-bold leading-9 text-blue-900">
        {article.frontmatter.title}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.frontmatter.excerpt }} />
      {article.frontmatter.tags && (
        <div className="py-2.5">
          <CategoryBadge tags={article.frontmatter.tags} />
        </div>
      )}
      <Author author={article.frontmatter.author} />
    </div>
  );
};

export default TitleSection;
