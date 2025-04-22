import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import { rehypeMutateAST } from "./rehypeMutateAST";
import remarkSmartypants from "remark-smartypants";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import rehypeComponents from "rehype-components";
import { h } from "hastscript";
import type { Element } from "hast";

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
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkDirective)
    .use(remarkDirectiveRehype)
    .use(remarkSmartypants)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeComponents, {
      components: {
        "product-ad": ProductAd,
      },
    });

  if (mutateHTML) {
    processor.use(rehypeMutateAST);
  }

  processor.use(rehypeStringify);

  const file = await processor.process(markdown);
  return file.toString();
};

function ProductAd(properties: Record<string, any>): Element {
  const {
    src,
    alt,
    title,
    description,
    buttonText = "Learn More",
    buttonUrl,
  } = properties;

  // Create the product ad HTML structure using hastscript
  return h(
    "div",
    {
      className:
        "flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden my-6 shadow-sm hover:shadow-md transition-shadow duration-300",
    },
    [
      // Left side - Image container
      h("div", { className: "w-full md:w-2/5 bg-gray-50" }, [
        h("img", {
          src,
          alt: alt || title,
          className: "w-full h-full object-cover",
        }),
      ]),

      // Right side - Content container
      h(
        "div",
        { className: "w-full md:w-3/5 p-6 flex flex-col justify-center" },
        [
          h(
            "h3",
            { className: "text-xl font-semibold text-gray-900 mb-3" },
            title,
          ),
          h("p", { className: "text-gray-600 mb-5" }, description),
          h(
            "a",
            {
              href: buttonUrl,
              className:
                "inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-center self-start",
            },
            buttonText,
          ),
        ],
      ),
    ],
  ) as Element;
}
