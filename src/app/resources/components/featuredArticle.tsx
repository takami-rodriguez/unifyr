import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { ArticleTemplateProps } from "@/types/article";
import { NavLink } from "@/data/navLinks";
import TitleSection from "@/app/resources/components/titleSection";

type FeaturedArticleProps = {
  article: ArticleTemplateProps;
};

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <Link
      href={`${NavLink.Resources}${article.frontmatter.slug}/`}
      className=""
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="bg-white overflow-hidden rounded-2xl grid grid-cols-1 lg:grid-cols-2 relative lg:gap-8 mx-5 "
          style={{
            boxShadow:
              "0px 2px 4px 0px rgba(9, 8, 66, 0.08), 0px 4px 24px 0px rgba(9, 8, 66, 0.04)",
          }}
        >
          <div className="col-span-1 lg:py-8 lg:pl-10 h-full flex flex-col justify-between ">
            <TitleSection article={article} featured />
          </div>
          {article.frontmatter.featuredImage && (
            <AspectRatio ratio={16 / 9} className="relative">
              <Image
                src={article.frontmatter.featuredImage}
                fill
                alt={article.frontmatter.title}
                className="object-cover object-center "
              />
            </AspectRatio>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
