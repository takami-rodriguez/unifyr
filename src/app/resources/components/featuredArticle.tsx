import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { ArticleTemplateProps } from "@/types/article";
import { slugify } from "@/lib/utils";
import { NavLink } from "@/data/navLinks";
import TitleSection from "@/app/resources/components/titleSection";

type FeaturedArticleProps = {
  article: ArticleTemplateProps;
};

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <Link href={`${NavLink.Resources}${slugify(article.title)}/`}>
      <div className="bg-white overflow-hidden rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 relative lg:gap-8 ">
        <div className="col-span-1 lg:pt-8 lg:pl-10 h-full flex flex-col justify-between ">
          <TitleSection article={article} featured />
        </div>
        {article.featuredImage && (
          <div className="col-span-1 w-full ">
            <AspectRatio ratio={16 / 9} className="relative">
              <Image
                src={article.featuredImage?.url}
                fill
                alt={article.title}
                className="object-cover object-center "
              />
            </AspectRatio>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FeaturedArticle;
