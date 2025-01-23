import fs from "fs";
import matter from "gray-matter";
import { sortFrontMatter } from "./_helpers";
import { TermsProps } from "./terms";
import { ArticleTemplateProps } from "@/types/article";

export async function fetchMarkdownBySlug(slug: string): Promise<TermsProps> {
  const fileName = fs.readFileSync(`./src/data/pages/${slug}.md`, "utf-8");
  const { data: fData, content } = matter(fileName);
  return {
    frontmatter: sortFrontMatter(fData as ArticleTemplateProps["frontmatter"]),
    content,
  };
}
