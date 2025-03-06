"use client";

import { useEffect, useState } from "react";
import { glossaryData } from "./data";
import Link from "next/link";

export default function AtlasIndexPage() {
  // Filter out letters with no items
  const filteredGlossaryData = glossaryData.filter(
    (section) => section.items.length > 0,
  );

  // State to track current column count based on screen size
  const [columnCount, setColumnCount] = useState(4);

  // Update column count based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnCount(2);
      } else if (window.innerWidth < 1280) {
        setColumnCount(3);
      } else {
        setColumnCount(4);
      }
    };
    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate column distribution
  const columns = distributeWithFrontLoading(filteredGlossaryData, columnCount);

  return (
    <div className="min-h-screen px-4 py-12 md:py-[4.125rem]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="leading-[4rem] mb-6 font-heading text-4xl  sm:text-5xl lg:text-[4.375rem] text-center">
            Atlas
          </h1>
          <p className="mx-auto max-w-3xl text-22 leading-relaxed ">
            A detailed guide to key terms, concepts, and best practices in
            Partner Relationship Management (PRM) and the Channel Ecosystem.
            This resource helps businesses and partners navigate channel sales,
            marketing automation, and partner enablement to drive growth and
            collaboration.
          </p>
        </div>

        {/* Glossary Content */}
        <div className="rounded-2xl border-2 border-white bg-white/30 px-16 py-5 shadow-sm">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {columns.map((column, columnIndex) => (
              <div key={`column-${columnIndex}`} className="space-y-2">
                {column.map((section) => (
                  <div
                    key={section.letter}
                    className="space-y-4 px-4 py-2"
                  >
                    <div className="flex">
                      <div className="rounded-md bg-grey-400/50 px-3 py-1.5 font-bold text-primary leading-3">
                        {section.letter}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/atlas/marketing-development-funds`}
                            className="text-gray-900/80 transition-colors hover:text-primary"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type GlossarySection = {
  letter: string;
  items: string[];
};

// Distribution algorithm that front-loads earlier columns
function distributeWithFrontLoading(
  data: GlossarySection[],
  columnCount: number,
) {
  // First, flatten the data to work with individual terms
  const allTerms: string[] = [];
  const letterMap = new Map(); // Map to track which letter each term belongs to

  data.forEach((section) => {
    section.items.forEach((item) => {
      allTerms.push(item);
      letterMap.set(item, section.letter);
    });
  });

  // Calculate terms per column with front-loading
  const totalTerms = allTerms.length;

  // Adjust distribution to favor earlier columns
  const termsPerColumn = [];

  if (columnCount === 4) {
    // For 4 columns, front-load the first columns
    const baseCount = Math.floor(totalTerms / columnCount);
    termsPerColumn[0] = baseCount + 10;
    termsPerColumn[1] = baseCount + 3;
    termsPerColumn[2] = baseCount;
    termsPerColumn[3] =
      totalTerms - termsPerColumn[0] - termsPerColumn[1] - termsPerColumn[2];
  } else if (columnCount === 3) {
    // For 3 columns, front-load the first columns
    const baseCount = Math.floor(totalTerms / columnCount);
    termsPerColumn[0] = baseCount + 2;
    termsPerColumn[1] = baseCount + 1;
    termsPerColumn[2] = totalTerms - termsPerColumn[0] - termsPerColumn[1];
  } else if (columnCount === 2) {
    // For 2 columns, front-load the first column
    const baseCount = Math.floor(totalTerms / columnCount);
    termsPerColumn[0] = baseCount + 2;
    termsPerColumn[1] = totalTerms - termsPerColumn[0];
  } else {
    // For 1 column, use all terms
    termsPerColumn[0] = totalTerms;
  }

  // Prepare columns
  const columns: GlossarySection[][] = Array.from(
    { length: columnCount },
    () => [],
  );

  // Distribute terms
  let termIndex = 0;

  for (let col = 0; col < columnCount; col++) {
    // Collect terms for this column
    const termsForColumn = allTerms.slice(
      termIndex,
      termIndex + termsPerColumn[col],
    );
    termIndex += termsPerColumn[col];

    // Group terms by letter
    const letterGroups = new Map();

    termsForColumn.forEach((term) => {
      const letter = letterMap.get(term);
      if (!letterGroups.has(letter)) {
        letterGroups.set(letter, []);
      }
      letterGroups.get(letter).push(term);
    });

    // Convert to array format and add to column
    Array.from(letterGroups.entries()).forEach(([letter, items]) => {
      return columns[col].push({
        letter,
        items,
      });
    });
  }

  return columns;
}
