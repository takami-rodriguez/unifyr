import { SEOData } from "./seo";

export interface AtlasFrontMatter {
  title?: string;
  slug?: string;
  seo?: SEOData;
  atlasTerm?: string;
}

export interface AtlasPageData {
  markdownSource: string;
  frontMatter?: AtlasFrontMatter;
  slug: string;
  // Page title for atlas page. If not specified - slug is used.
  title: string;
  // Atlas Term is what is shown for this page in index. If not specified - title is used.
  atlasTerm: string;
}
