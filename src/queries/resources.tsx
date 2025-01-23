import { ArticleTemplateProps } from "@/types/article";
import fs from "fs";
import matter from "gray-matter";
import { sortFrontMatter } from "./_helpers";
import { FEATURED_ARTICLE_SLUG } from "@/data/config";

export const fetchAllArticles = async (): Promise<ArticleTemplateProps[]> => {
  const slugData = await getAllBlogSlugs();
  const allArticlePromises = slugData.map((fileName) =>
    fetchArticleBySlug(fileName.slug),
  );
  return Promise.all(allArticlePromises);
};

export const fetchArticleBySlug = async (
  slug: string,
): Promise<ArticleTemplateProps> => {
  const fileName = fs.readFileSync(`./src/data/blogs/${slug}.md`, "utf-8");
  const { data: fData, content } = matter(fileName);
  return {
    frontmatter: sortFrontMatter(fData),
    content,
  };
};

export const fetchResourcesPageData = async (): Promise<{
  featuredArticle: ArticleTemplateProps;
  banner: {
    title: "Resources";
    button: {
      link: "/#";
      title: "Secondary action";
    };
  };
}> => {
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
};

export const getAllBlogSlugs = async () => {
  const files = fs.readdirSync("./src/data/blogs");
  const paths = files.map((fileName) => ({
    slug: fileName.replace(".md", ""),
  }));
  return paths;
};
