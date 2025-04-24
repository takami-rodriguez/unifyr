import type { Element, Properties } from "hast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkSmartypants from "remark-smartypants";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import rehypeComponents, { ComponentFunction } from "rehype-components";
import { rehypeMutateAST } from "./rehypeMutateAST";
import { Child, h } from "hastscript";
import rehypeRaw from "rehype-raw";

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
    .use(rehypeRaw)
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

type ProductAdProperties =
  | Properties
  | {
      src: string;
      alt: string;
      title: string;
      description: string;
      buttonUrl: string;
      buttonText: string;
    };

const ProductAd: ComponentFunction = ({
  src,
  alt,
  title,
  description,
  buttonUrl,
  buttonText = "Learn more",
}: ProductAdProperties): Element => {
  // Create the product ad HTML structure using hastscript
  return h(
    "section",
    {
      className:
        "gradient-shadow flex flex-col flex-col-reverse md:flex-row border border-gray-200 my-6 lg:-mx-[1rem] rounded-lg",
    },
    [
      // Left side - Image container
      h("div", { className: "w-full md:w-2/5" }, [
        h("img", {
          src,
          alt: alt || title,
          className: "my-0 w-full h-full object-cover",
        }),
      ]),

      // Right side - Content container
      h(
        "div",
        {
          className:
            "w-full md:w-3/5 p-6 flex flex-col justify-center bg-white",
        },
        [
          h(
            "h3",
            {
              className: "mt-0 pt-0 text-2xl font-semibold text-gray-900 mb-3",
            },
            title as Child,
          ),
          h(
            "p",
            { className: "text-gray-600 mb-5 font-sans leading-6" },
            description as Child,
          ),
          h(
            "a",
            {
              href: buttonUrl,
              className:
                "inline-block bg-secondary text-white py-2 px-4 rounded transition-colors duration-200 text-center self-start no-underline font-bold hover:bg-secondary/90",
            },
            buttonText as Child,
          ),
        ],
      ),
    ],
  ) as Element;
};
