import { markDownClasses } from "@/lib/utils";
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
      className={markDownClasses}
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    ></div>
  );
};

export default Markdown;