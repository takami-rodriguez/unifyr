import Link from "next/link";

export default function TableOfContents({ content }: { content: string }) {
  // Function to extract headings from markdown content
  function extractHeadings(content: string) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      // Only include h1, h2, and h3 headings
      if (level <= 2) {
        const slug = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        headings.push({
          level,
          text,
          href: `#${slug}`,
        });
      }
    }

    return headings;
  }

  const headings = extractHeadings(content);
  return (
    <div
      className="rounded-2xl border-2 border-white bg-white/70 px-10 py-8"
      style={{
        boxShadow:
          "0px 2px 4px 0px rgba(9, 8, 66, 0.08), 0px 4px 24px 0px rgba(9, 8, 66, 0.04)",
      }}
    >
      <h2 className="mb-4 text-lg font-semibold">Contents</h2>
      <nav>
        <ul className="space-y-3">
          {headings.map((heading, index) => (
            <li
              key={`${heading.href}-${index}`}
              className={`${heading.level === 2 ? "ml-0" : heading.level === 3 ? "ml-4" : ""}`}
            >
              <Link
                href={heading.href}
                className="text-sm text-grey-900/70 underline hover:text-primary"
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
