import { authorData } from "@/data/authorData";
import { SEOData } from "@/types/seo";
export const sortSEOFromFrontmatter = (seo: {
  [key: string]: string;
}): SEOData => {
  return {
    title: seo.title || "",
    description: seo.description || "",
    og_image: seo.og_image || "",
    og_title: seo.og_title || seo.title || "",
    og_description: seo.og_description || seo.description || "",
  };
};

export const sortFrontMatter = (frontmatter: { [key: string]: string }) => {
  return {
    title: frontmatter.title || "",
    slug: frontmatter.slug || "",
    excerpt: frontmatter.excerpt || "",
    featuredImage: frontmatter.featuredImage || "/images/image.png",
    tags: frontmatter.tags || [],
    publishedDate: frontmatter.publishedDate || "",
    author: getAuthorData(frontmatter.author) || { name: "", bio: "" },
    seo: sortSEOFromFrontmatter(frontmatter),
    _uid: frontmatter._uid || "",
  };
};

export const getAuthorData = (author: string) => {
  return authorData[author] ?? "";
};
