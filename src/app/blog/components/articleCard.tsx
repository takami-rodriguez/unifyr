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
    <Link href={`${NavLink.Blog}${article.frontmatter.slug}/`}>
      <div
        className="h-full max-h-full space-y-6 overflow-hidden rounded-2xl bg-white py-4"
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
