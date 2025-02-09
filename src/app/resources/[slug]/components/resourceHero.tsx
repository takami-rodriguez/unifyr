import { AuthorDetails } from "@/types/article";
import { SEOData } from "@/types/seo";
import React from "react";
import { format } from "date-fns";
import { bgGradient } from "@/data/styleHelpers";
import Author from "../../components/author";

type ResourceHeroProps = {
  frontmatter: {
    title: string;
    excerpt: string;
    featuredImage?: string;
    tags: string[];
    publishedDate: string;
    author: AuthorDetails;
    seo?: SEOData;
    slug: string;
    _uid: string;
  };
};

const ResourceHero = async ({ frontmatter }: ResourceHeroProps) => {
  return (
    <section style={bgGradient} className="space-y-6 rounded-2xl py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-[2.45rem] font-medium leading-[2.5rem] md:text-[3rem] md:leading-[3rem] text-grey-800">
          {frontmatter.title}
        </h1>
        <div className="pt-2 font-medium  text-grey-800 leading-[30px] tracking-[0.32px]">
          {format(new Date(frontmatter.publishedDate), "MMMM dd yyyy")}
        </div>
        <div className="flex flex-col space-y-10 font-medium text-grey-900 lg:flex-row lg:items-end lg:space-y-0 lg:pt-10">
          {frontmatter.author && (<Author author={frontmatter.author}  size={45}/>)}
        </div>
      </div>
    </section>
  );
};

export default ResourceHero;
