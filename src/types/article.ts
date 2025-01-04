import { ImageType } from "./images";

export interface AuthorDetails {
  name: string;
  image?: ImageType;
  _uid: string;
}

export interface SEOData {
  title?: string;
  plugin?: string;
  og_image?: string;
  og_title?: string;
  description?: string;
  twitter_image?: string;
  twitter_title?: string;
  og_description?: string;
  twitter_description?: string;
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
