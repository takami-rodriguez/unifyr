import { unified } from "unified";
import remarkParse from "remark-parse";
import { Heading, Literal } from "mdast";
import { slugify } from "@/lib/utils";
import remarkFrontmatter from "remark-frontmatter";

export interface MarkdownTOCItem {
  title: string;
  anchor: string;
}

export async function buildMarkdownTOC(
  markdown: string,
): Promise<MarkdownTOCItem[]> {
  const processor = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]);
  const markdownAST = processor.parse(markdown);
  const headingsAST = markdownAST.children.filter(
    (child): child is Heading => child.type === "heading" && child.depth === 2,
  );
  const headingsData: MarkdownTOCItem[] = headingsAST.map((heading) => {
    const headingString = (heading.children[0] as Literal).value;
    return {
      title: headingString,
      anchor: slugify(headingString),
    };
  });

  return headingsData;
}
