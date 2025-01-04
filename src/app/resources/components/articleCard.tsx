import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import TitleSection from "./titleSection";
import { ArticleTemplateProps } from "@/types/article";
import clsx from "clsx";

type ArticleCardProps = {
  article: ArticleTemplateProps;
  index?: number;
};

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <Link href={`/resources/${article.frontmatter.slug}/`}>
      <div className="rounded-2xl space-y-6 my-4 h-full max-h-full bg-white overflow-hidden"
      style={{boxShadow: "0px 2px 4px 0px rgba(9, 8, 66, 0.08), 0px 4px 24px 0px rgba(9, 8, 66, 0.04)"}}
      >
        {article.frontmatter.featuredImage && (!index  || index <=2) && (
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
        )}
        <div className={clsx("px-6",{"pt-6":index && index >=3})}>
          <TitleSection article={article} />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
