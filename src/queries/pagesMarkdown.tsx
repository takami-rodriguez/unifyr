import fs from "fs/promises";
import { sortFrontMatter } from "./_helpers";
import { TermsProps } from "./terms";
import { ArticleTemplateProps } from "@/types/article";
import { getFrontMatter } from "@/lib/markdown";

export async function fetchMarkdownBySlug(slug: string): Promise<TermsProps> {
  const content = await fs.readFile(`./src/data/pages/${slug}.md`, "utf-8");
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
