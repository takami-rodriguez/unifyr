import { ImageType } from "./images";

export interface AuthorDetails {
    name: string;
    image?: ImageType;
    _uid: string;
  }
export interface ArticleTemplateProps {
    title: string;
    excerpt: string;
    featuredImage?: ImageType;
    tags: string[];
    publishedDate: string;
    author: AuthorDetails;
    videoBottom?: boolean;
    content: string;
    seo?: {
      _uid?: string;
      title?: string;
      plugin?: string;
      og_image?: string;
      og_title?: string;
      description?: string;
      twitter_image?: string;
      twitter_title?: string;
      og_description?: string;
      twitter_description?: string;
    };
    _uid: string;
  }