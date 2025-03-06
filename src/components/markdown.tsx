import { markDownClasses } from "@/lib/utils";
import React from "react";
import markdownit from "markdown-it";

type MarkdownProps = {
  content: string;
};

const md = markdownit({
  html: true,
  typographer: true,
});

const Markdown: React.FC<MarkdownProps> = async ({
  content,
}: MarkdownProps) => {
  return (
    <div
      className={markDownClasses}
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    ></div>
  );
};

export default Markdown;
