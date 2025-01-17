import RenderMarkdown from "@/components/renderMarkdown";
import { fetchMarkdownBySlug } from "@/queries/pagesMarkdown";
import React from "react";

const TermsPage = async () => {
  const { content } = await fetchMarkdownBySlug("terms");

  return (
    <div className=" mb-1 pt-12 max-w-2xl mx-auto">
      <RenderMarkdown content={content} />
    </div>
  );
};

export default TermsPage;
