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
        className="bg-white overflow-hidden rounded-2xl  relative p-5 "
        style={boxShadow}
      >
        <div className="col-span-1 lg:py-8 lg:pl-10 h-full flex flex-col justify-between ">
          <TitleSection article={article} featured />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
