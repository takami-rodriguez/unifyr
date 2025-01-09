import Link from "next/link";
import React from "react";
import TitleSection from "./titleSection";
import { ArticleTemplateProps } from "@/types/article";
import clsx from "clsx";
import { NavLink } from "@/data/navLinks";
import { boxShadow } from "@/data/styleHelpers";

type ArticleCardProps = {
  article: ArticleTemplateProps;
  index?: number;
};

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <Link href={`${NavLink.Resources}${article.frontmatter.slug}/`}>
      <div
        className="rounded-2xl space-y-6 py-4 h-full max-h-full bg-white overflow-hidden"
        style={boxShadow}
      >
        {/* {article.frontmatter.featuredImage && (!index  || index <=2) && (
          <div className="relative w-full">
            <AspectRatio ratio={4 / 3} className="relative">
              <Image
                src={article.frontmatter.featuredImage}
                fill
                alt={article.frontmatter.featuredImage}
                className=" object-center object-cover "
              />
            </AspectRatio>
          </div>
        )} */}
        <div className={clsx("px-6", { "pt-6": index && index >= 3 })}>
          <TitleSection article={article} />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
