import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import { rehypeMutateAST } from "./rehypeMutateAST";

/**
 * Converts markdown source to HTML string to be rendered via dangerouslySetInnerHTML
 * @param markdown - contents of .md file
 * @param mutateHTML - Determines whether HTML should be modified (e.g. `id` added to headings)
 * @returns an HTML string
 */
export const markdownToHTML = async (
  markdown: string,
  mutateHTML: boolean,
): Promise<string> => {
  const processor = unified().use(remarkParse).use(remarkRehype);

  if (mutateHTML) {
    processor.use(rehypeMutateAST);
  }

  processor.use(rehypeStringify).use(remarkFrontmatter, ["yaml"]);

  const file = await processor.process(markdown);
  return file.toString();
};
