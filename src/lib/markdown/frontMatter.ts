import { Root } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import YAML from "yaml";

interface GenericFrontMatter {
  [K: string]: string | GenericFrontMatter;
}
export async function getFrontMatter<FrontMatterType = GenericFrontMatter>(
  markdownContent: string,
): Promise<FrontMatterType | undefined> {
  let data: FrontMatterType | undefined;
  await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ["yaml"])
    .use(function () {
      return function (tree: Root) {
        const matterNode = tree.children.find((child) => child.type === "yaml");
        if (matterNode) {
          data = YAML.parse(matterNode.value) as FrontMatterType;
        }
      };
    })
    .process(markdownContent);

  return data;
}
