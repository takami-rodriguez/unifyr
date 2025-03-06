import { cn } from "@/lib/utils";
import type React from "react";
import markdownit from "markdown-it";
import anchor from "markdown-it-anchor";

type MarkdownProps = {
  content: string;
};

// Function to create slugs that match our table of contents format
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Create markdown-it instance with the anchor plugin
const md = markdownit({
  html: true,
  typographer: true,
}).use(anchor, {
  slugify,
  permalink: false, // Set to true if you want permalink symbols next to headings
  level: [1, 2, 3], // Only add anchors to h1, h2, and h3
});

const Markdown: React.FC<MarkdownProps> = ({ content }: MarkdownProps) => {
  return (
    <div
      className={cn(
        "w-full space-y-6 break-words text-grey-800",
        "prose-a:text-pink prose-a:underline",
        "prose-li:text-wrap",
        "prose-code:text-wrap",
        "prose-h2:pt-8 prose-h2:text-[2rem] prose-h2:leading-[2.2rem] md:prose-h2:text-[2.5rem] md:prose-h2:leading-[2.5rem]",
        "prose-h3:pt-8 prose-h3:text-[1.75rem] prose-h3:leading-[1.75rem] md:prose-h3:text-[2rem] md:prose-h3:leading-[2rem]",
        "prose-p:font-resources prose-p:text-[1.125rem] prose-p:leading-[1.75rem] md:prose-p:text-[1.25rem] md:prose-p:leading-[2rem]"
      )}
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    ></div>
  );
};

export default Markdown;