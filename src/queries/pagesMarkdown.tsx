import fs from "fs/promises";
import { sortFrontMatter } from "./_helpers";
import { TermsProps } from "./terms";
import { ArticleTemplateProps } from "@/types/article";
import { getFrontMatter } from "@/lib/markdown";

export async function fetchPageMarkdownBySlug(slug: string): Promise<string> {
  return fs.readFile(`./src/data/pages/${slug}.md`, "utf-8");
}

export async function fetchMarkdownBySlug(slug: string): Promise<TermsProps> {
  const content = await fetchPageMarkdownBySlug(slug);
  const frontMatterData =
    await getFrontMatter<ArticleTemplateProps["frontmatter"]>(content);
  // TODO: Add checks here for whether frontMatter is present.
  // Maybe modify TermsProps - or throw if we want all pages to have it?
  return {
    frontmatter: sortFrontMatter(
      frontMatterData || ({} as ArticleTemplateProps["frontmatter"]),
    ),
    content,
  };
}
