import { cn } from "@/lib/utils";
import React from "react";
import markdownit from "markdown-it";

type MarkdownProps = {
  content: string;
};

const md = markdownit({
  html: true,
  typographer: true,
});

const Markdown: React.FC<MarkdownProps> = async ({ content }: MarkdownProps) => {
  return (
    <div
      className={cn(
        "w-full text-grey-800 space-y-6 break-words",
        "prose-a:underline prose-a:text-pink",
        "prose-li:text-wrap",
        "prose-code:text-wrap",
        "prose-h2:pt-8  prose-h2:text-[2rem] prose-h2:leading-[2.2rem] md:prose-h2:text-[2.5rem] md:prose-h2:leading-[2.5rem]",
        "prose-h3:pt-8 prose-h3:text-[1.75rem] prose-h3:leading-[1.75rem] md:prose-h3:text-[2rem] md:prose-h3:leading-[2rem] ",
        "prose-p:font-resources prose-p:text-[1.125rem] prose-p:leading-[1.75rem] md:prose-p:text-[1.25rem] md:prose-p:leading-[2.5rem] "
      )}
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    >
    </div>
  );
};

export default Markdown;
