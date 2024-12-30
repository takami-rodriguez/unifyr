/* eslint-disable  @typescript-eslint/no-explicit-any */

import { authorData } from "@/data/authorData";
import { SEOData } from "@/types/article";
export const sortSEOFromFrontmatter = (seo: {
  [key: string]: any;
}): SEOData => {
  return {
    title: seo.title || "",
    plugin: seo.plugin || "",
    og_image: seo.og_image || "",
    og_title: seo.og_title || seo.title || "",
    description: seo.description || "",
    twitter_image: seo.twitter_image || "",
    twitter_title: seo.twitter_title || seo.title || "",
    og_description: seo.og_description || seo.description || "",
    twitter_description: seo.twitter_description || seo.description || "",
  };
};

export const sortFrontMatter = (frontmatter: { [key: string]: any }) => {
  return {
    title: frontmatter.title || "",
    excerpt: frontmatter.excerpt || "",
    featuredImage: frontmatter.featuredImage || "/images/image.png",
    tags: frontmatter.tags || [],
    publishedDate: frontmatter.publishedDate || "",
    author: getAuthorData(frontmatter.author) || { name: "", bio: "" },
    seo: sortSEOFromFrontmatter(frontmatter),
    _uid: frontmatter._uid || "",
  };
};

export const getAuthorData = (author: "brian") => {
  return authorData[author];
};
