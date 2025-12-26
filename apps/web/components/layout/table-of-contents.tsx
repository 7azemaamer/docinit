type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: { content?: string }) {
  if (!content) {
    return (
      <div className="p-6">
        <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-4">
          On this page
        </p>
        <p className="text-sm text-accent">No content yet</p>
      </div>
    );
  }

  const headings: Heading[] = [];
  const lines = content.split("\n");

  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  });

  if (headings.length === 0) {
    return (
      <div className="p-6">
        <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-4">
          On this page
        </p>
        <p className="text-sm text-accent">No headings found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-4">
        On this page
      </p>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block py-1 text-sm text-accent hover:text-foreground transition-colors ${
              heading.level === 3 ? "pl-3" : ""
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
