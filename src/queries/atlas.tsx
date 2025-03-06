import { ArticleTemplateProps } from "@/types/article";
import fs from "fs";
import matter from "gray-matter";
import { sortFrontMatter } from "./_helpers";
import { FEATURED_ARTICLE_SLUG } from "@/data/config";

export async function fetchAllAtlas(): Promise<ArticleTemplateProps[]> {
  const slugData = getAllAtlasSlugs();
  const allArticlePromises = slugData.map((fileName) =>
    fetchAtlasBySlug(fileName.slug),
  );
  return (await Promise.all(allArticlePromises)).sort(
    (a, b) =>
      new Date(b.frontmatter.publishedDate).getTime() -
      new Date(a.frontmatter.publishedDate).getTime(),
  );
}

export async function fetchAtlasBySlug(
  slug: string,
): Promise<ArticleTemplateProps> {
  const fileName = fs.readFileSync(`./src/data/atlas/${slug}.md`, "utf-8");
  const { data: fData, content } = matter(fileName);
  return {
    frontmatter: sortFrontMatter(fData as ArticleTemplateProps["frontmatter"]),
    content,
  };
}

export async function fetchResourcesPageData(): Promise<{
  featuredArticle: ArticleTemplateProps;
  banner: {
    title: "Resources";
    button: {
      link: "/#";
      title: "Secondary action";
    };
  };
}> {
  const featuredArticle = await fetchAtlasBySlug(FEATURED_ARTICLE_SLUG);
  return {
    featuredArticle,
    banner: {
      title: "Resources",
      button: {
        link: "/#",
        title: "Secondary action",
      },
    },
  };
}

export function getAllAtlasSlugs() {
  const files = fs.readdirSync("./src/data/atlas");
  const paths = files.map((fileName) => ({
    slug: fileName.replace(".md", ""),
  }));
  console.log({paths})
  return paths;
}
