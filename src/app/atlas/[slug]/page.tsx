import TableOfContents from "./components/table-of-contents";
import { fetchAtlasBySlug, getAllAtlasSlugs } from "@/queries/atlas";
import { PageProps } from "@/types/page";
import { Metadata, ResolvingMetadata } from "next";
import { getDynamicPageSEOData } from "@/lib/seoHelper";
import AtlasMarkdown from "./components/atlasMarkdown";

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await fetchAtlasBySlug(slug as string);
  return getDynamicPageSEOData(frontmatter.seo!, parent);
}

export function generateStaticParams() {
  return getAllAtlasSlugs();
}

export const dynamicParams = false;

export default async function AtlasPage({ params }: PageProps) {
  const { slug } = await params;
  const { content } = await fetchAtlasBySlug(slug as string);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col py-16 lg:flex-row lg:space-x-12">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-12 overflow-y-auto">
              <TableOfContents content={content} />
            </div>
          </aside>
          <main className="flex-1">
            <div className="rounded-2xl border-2 border-white bg-white/30 px-10">
              <AtlasMarkdown content={content} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
