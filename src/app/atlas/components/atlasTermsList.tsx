import React from "react";
import { AtlasPageData } from "@/types/atlas";
import Link from "next/link";
import { NavLink } from "@/data/navLinks";
import { splitIntoChunks } from "@/lib/array";

interface AtlasTermsListProps {
  atlasPages: AtlasPageData[];
}

function groupAtlasPagesByLetter(atlasPages: AtlasPageData[]) {
  return Object.entries(
    atlasPages
      .toSorted((pageA, pageB) => pageA.title.localeCompare(pageB.title))
      .reduce(
        (groupedByLetter, pageData) => {
          const termLetter = pageData.atlasTerm[0].toUpperCase();
          groupedByLetter[termLetter] = groupedByLetter[termLetter] || [];
          groupedByLetter[termLetter].push(pageData);
          return groupedByLetter;
        },
        {} as Record<string, AtlasPageData[]>,
      ),
  ).map(([letter, pages]) => ({ letter, pages }));
}

const AtlasTermsList: React.FC<AtlasTermsListProps> = ({ atlasPages }) => {
  const pagesGroupedByLetter = groupAtlasPagesByLetter(atlasPages);
  const columns = splitIntoChunks(
    pagesGroupedByLetter,
    Math.ceil(pagesGroupedByLetter.length / 3),
  );

  return (
    <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-3">
      {columns.map((column, columnIndex) => (
        <div className="space-y-6" key={`column_${columnIndex}`}>
          {column.map(({ letter, pages }) => (
            <div key={letter}>
              <div className="bg-primary/10 rounded-[6px] w-12 h-9  content-center flex items-center justify-center">
                <h2 className="text-2xl font-bold text-primary p-2">{letter}</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link href={`${NavLink.Atlas}${page.slug}/`}>
                      {page.atlasTerm}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AtlasTermsList;
