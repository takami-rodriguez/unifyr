import React from "react";
import Link from "next/link";
import { ArticleTemplateProps } from "@/types/article";
import { NavLink } from "@/data/navLinks";
import TitleSection from "@/app/blog/components/titleSection";
import { boxShadow } from "@/data/styleHelpers";

type FeaturedArticleProps = {
  article: ArticleTemplateProps;
};

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <Link
      href={`${NavLink.Blog}${article.frontmatter.slug}/`}
      className="h-full block overflow-hidden rounded-2xl bg-white"
      style={boxShadow}
    >
      <div className=" h-full  p-5">
        <TitleSection article={article} featured />
      </div>
    </Link>
  );
};

export default FeaturedArticle;
