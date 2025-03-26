import { cn } from "@/lib/utils";
import React from "react";
import { markdownToHTML } from "@/lib/markdown";
import "./prose.css";

type MarkdownProps = {
  content: string;
  className?: string;
};

const Markdown: React.FC<MarkdownProps> = async ({
  content,
  className,
}: MarkdownProps) => {
  const renderedMarkdown = await markdownToHTML(content, true);

  return (
    <div
      className={cn(
        "prose w-full space-y-6 break-words text-grey-800",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
    ></div>
  );
};

export default Markdown;
