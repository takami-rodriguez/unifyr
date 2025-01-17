import { ImageType } from "./images";
import { SEOData } from "./seo";

export interface AuthorDetails {
  name: string;
  image?: ImageType;
  _uid: string;
}

export interface ArticleTemplateProps {
  content: string;
  frontmatter: {
    title: string;
    excerpt: string;
    featuredImage?: string;
    tags: string[];
    publishedDate: string;
    author: AuthorDetails;
    seo?: SEOData;
    slug: string;
    _uid: string;
  };
}
