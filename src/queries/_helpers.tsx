import { authorData } from "@/data/authorData";
import { ArticleTemplateProps, AuthorDetails } from "@/types/article";
import { SEOData } from "@/types/seo";

export function sortSEOFromFrontmatter(
  seo: ArticleTemplateProps["frontmatter"]["seo"],
): SEOData {
  return {
    title: seo?.title || "",
    description: seo?.description || "",
    og_image: seo?.og_image || "",
    og_title: seo?.og_title || seo?.title || "",
    og_description: seo?.og_description || seo?.description || "",
  };
}

export function sortFrontMatter(
  frontmatter: ArticleTemplateProps["frontmatter"],
) {
  return {
    title: frontmatter.title || "",
    slug: frontmatter.slug || "",
    excerpt: frontmatter.excerpt || "",
    featuredImage: frontmatter.featuredImage || "/images/image.png",
    tags: frontmatter.tags || [],
    publishedDate: frontmatter.publishedDate || "",
    author: getAuthorData(frontmatter?.author) || {
      name: "",
      bio: "",
      _uid: "-1",
    },
    seo: sortSEOFromFrontmatter(frontmatter),
    _uid: frontmatter._uid || "",
  };
}

export function getAuthorData(
  author: AuthorDetails | string,
): AuthorDetails | undefined {
  if (typeof author === "string") {
    return authorData[author];
  } else if (typeof author === "object" && author["name"]) {
    return authorData[author.name];
  }
}
