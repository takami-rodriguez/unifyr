import { getFrontMatter } from "@/lib/markdown";
import { slugify } from "@/lib/utils";
import { AtlasPageData, AtlasFrontMatter } from "@/types/atlas";
import fs from "fs/promises";
import path from "path";

function getAtlasPageSlug(fileName: string, frontMatter?: AtlasFrontMatter) {
  if (frontMatter?.slug) {
    return frontMatter.slug;
  }
  if (frontMatter?.title) {
    return slugify(frontMatter.title);
  }
  return path.basename(fileName, ".md");
}

/** @returns file names for atlas pages. Data for pages is read from these files. */
export async function getAllAtlasFilenames(): Promise<string[]> {
  return (await fs.readdir("./src/data/atlas")).filter((fn) =>
    fn.endsWith(".md"),
  );
}

/** @returns page data for single page */
export async function getAtlasPageData(
  fileName: string,
): Promise<AtlasPageData> {
  const fullPath = path.resolve(`./src/data/atlas/${fileName}`);

  const markdownSource = await fs.readFile(fullPath, "utf-8");
  const frontMatter = await getFrontMatter<AtlasFrontMatter>(markdownSource);
  const slug = getAtlasPageSlug(fileName, frontMatter);
  const title = frontMatter?.title || slug;
  return {
    markdownSource,
    frontMatter,
    slug,
    title,
    atlasTerm: frontMatter?.atlasTerm || title,
  };
}

/** @returns page datas of all atlas pages */
export async function fetchAllAtlasPages(): Promise<AtlasPageData[]> {
  const fileNames = await getAllAtlasFilenames();
  const pageDataList: AtlasPageData[] = [];
  for (const fileName of fileNames) {
    pageDataList.push(await getAtlasPageData(fileName));
  }

  // return pageDataList;
  return [...pageDataList];
}

/** @returns page data based on slug */
export async function fetchAtlasPageBySlug(
  slug: string,
): Promise<AtlasPageData | undefined> {
  const allPages = await fetchAllAtlasPages();
  return allPages.find((page) => page.slug === slug);
}



