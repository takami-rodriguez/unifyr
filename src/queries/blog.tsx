import { ArticleTemplateProps } from "@/types/article";
import fs from "fs";
import { sortFrontMatter } from "./_helpers";
import { FEATURED_ARTICLE_SLUG } from "@/data/config";
import { getFrontMatter } from "@/lib/markdown";

export async function fetchAllArticles(): Promise<ArticleTemplateProps[]> {
  const slugData = getAllBlogSlugs();
  const allArticlePromises = slugData.map((fileName) =>
    fetchArticleBySlug(fileName.slug),
  );
  return (await Promise.all(allArticlePromises)).sort(
    (a, b) =>
      new Date(b.frontmatter.publishedDate).getTime() -
      new Date(a.frontmatter.publishedDate).getTime(),
  );
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<ArticleTemplateProps> {
  const content = fs.readFileSync(`./src/data/blogs/${slug}.md`, "utf-8");
  const frontMatterData =
    await getFrontMatter<ArticleTemplateProps["frontmatter"]>(content);
  // TODO: Add checks here for whether markdown is present. Just throw in case it's not?
  return {
    frontmatter: sortFrontMatter(
      frontMatterData as ArticleTemplateProps["frontmatter"],
    ),
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
  const featuredArticle = await fetchArticleBySlug(FEATURED_ARTICLE_SLUG);
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

export function getAllBlogSlugs() {
  const files = fs.readdirSync("./src/data/blogs");
  const paths = files.map((fileName) => ({
    slug: fileName.replace(".md", ""),
  }));
  return paths;
}
