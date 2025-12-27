"use client";

import { useState, useEffect } from "react";
import { useTocContent } from "@/context/toc-context";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const { content } = useTocContent();
  const [activeId, setActiveId] = useState<string>("");

  // Track which heading is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    const headingElements = document.querySelectorAll("h1[id], h2[id], h3[id]");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

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

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="p-6">
      <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-4">
        On this page
      </p>
      <nav className="relative">
        {/* Progress line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-0.5">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`relative block py-1.5 text-sm transition-colors ${
                  heading.level === 3 ? "pl-5" : "pl-3"
                } ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-accent hover:text-foreground"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 bg-foreground" />
                )}
                {heading.text}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
