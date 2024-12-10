"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import SubHeading from "../../subHeading";
import clsx from "clsx";
import ArticleCard from "../articleCard";
import { ArticleTemplateProps } from "@/types/article";
type LatestArticlesProps = {
  articles: ArticleTemplateProps[];
};

const LatestArticles = ({
  articles,
}: LatestArticlesProps) => {
  return (
    <div className="bg-white py-5 md:py-20 ">
      <div className="mb-8 md:mb-10 ">
        {/* <SubHeading title="The latest updates and articles" /> */}
      </div>
      <div className="max-w-7xl mx-auto overflow-visible relative">
        <Carousel
          orientation={"horizontal"}
          className=""
          opts={{ loop: false }}
        >
          <CarouselContent>
            {articles?.map((t ) => (
              <CarouselItem
                key={t._uid}
                className={clsx(
                  "basis-full md:basis-2/3 lg:max-w-[408px]  lg:basis-1/3 mr-4 "
                )}
              >
                <ArticleCard article={t} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="md:hidden flex justify-center items-center h-5 space-x-10 pt-14 pb-10">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default LatestArticles;
