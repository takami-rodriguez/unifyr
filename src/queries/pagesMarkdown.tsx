import fs from "fs";
import matter from "gray-matter";
import { sortFrontMatter } from "./_helpers";
import { TermsProps } from "./terms";

export const fetchMarkdownBySlug = async (
  slug: string
): Promise<TermsProps> => {
  const fileName = fs.readFileSync(`./src/data/pages/${slug}.md`, "utf-8");
  const { data: fData, content } = matter(fileName);
  return {
    frontmatter: sortFrontMatter(fData),
    content,
  };
};