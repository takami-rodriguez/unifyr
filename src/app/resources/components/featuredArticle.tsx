import React from "react";
import Link from "next/link";
import { ArticleTemplateProps } from "@/types/article";
import { NavLink } from "@/data/navLinks";
import TitleSection from "@/app/resources/components/titleSection";
import { boxShadow } from "@/data/styleHelpers";

type FeaturedArticleProps = {
  article: ArticleTemplateProps;
};

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <Link
      href={`${NavLink.Resources}${article.frontmatter.slug}/`}
      className=""
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-white p-5"
        style={boxShadow}
      >
        <div className="col-span-1 flex h-full flex-col justify-between lg:p-5">
          <TitleSection article={article} featured />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
