type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: { content?: string }) {
  if (!content) {
    return (
      <div className="p-4">
        <h2 className="font-semibold text-foreground mb-4">On this page</h2>
        <p className="text-sm text-secondary">No content yet</p>
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
      <div className="p-4">
        <h2 className="font-semibold text-foreground mb-4">On this page</h2>
        <p className="text-sm text-secondary">No headings found</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h2 className="font-semibold text-foreground mb-4">On this page</h2>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-sm text-secondary hover:text-primary transition-colors ${
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
