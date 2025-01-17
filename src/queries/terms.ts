import { SEOData } from "@/types/seo";

export interface TermsProps {
  content: string;
  frontmatter: {
    title: string;
    seo?: SEOData;
    slug: string;
    _uid: string;
  };
}
