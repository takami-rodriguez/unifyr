
import Link from "next/link"

export default function TableOfContents({ content }: {content: string}) {
    // Function to extract headings from markdown content
    function extractHeadings(content: string) {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      const headings = [];
      let match;
    
      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        // Only include h1, h2, and h3 headings
        if (level <= 3) {
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
    <div className="border-2 border-white bg-white/30 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Contents</h2>
      <nav>
        <ul className="space-y-3">
          {headings.map((heading, index) => (
            <li
              key={`${heading.href}-${index}`}
              className={`${heading.level === 2 ? "ml-0" : heading.level === 3 ? "ml-4" : ""}`}
            >
              <Link
                href={heading.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

