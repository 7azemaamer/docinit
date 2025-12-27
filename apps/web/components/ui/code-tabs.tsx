"use client";

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyButton } from "./copy-button";

export type CodeExample = {
  language: string;
  label?: string;
  code: string;
};

type CodeTabsProps = {
  examples: CodeExample[];
  title?: string;
};

// Hook to detect dark mode
function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

const minimalDark: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: "#e4e4e7",
    background: "#18181b",
  },
  'pre[class*="language-"]': {
    color: "#e4e4e7",
    background: "#18181b",
  },
  comment: { color: "#71717a" },
  prolog: { color: "#71717a" },
  doctype: { color: "#71717a" },
  cdata: { color: "#71717a" },
  punctuation: { color: "#a1a1aa" },
  property: { color: "#fafafa" },
  tag: { color: "#fafafa" },
  boolean: { color: "#d4d4d8" },
  number: { color: "#d4d4d8" },
  constant: { color: "#fafafa" },
  symbol: { color: "#fafafa" },
  selector: { color: "#e4e4e7" },
  "attr-name": { color: "#a1a1aa" },
  string: { color: "#a1a1aa" },
  char: { color: "#a1a1aa" },
  builtin: { color: "#fafafa" },
  inserted: { color: "#fafafa" },
  operator: { color: "#71717a" },
  entity: { color: "#fafafa" },
  url: { color: "#a1a1aa" },
  variable: { color: "#e4e4e7" },
  atrule: { color: "#fafafa" },
  "attr-value": { color: "#a1a1aa" },
  function: { color: "#fafafa" },
  keyword: { color: "#d4d4d8", fontWeight: "600" },
  regex: { color: "#a1a1aa" },
  important: { color: "#fafafa", fontWeight: "600" },
};

const minimalLight: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: "#18181b",
    background: "#f4f4f5",
  },
  'pre[class*="language-"]': {
    color: "#18181b",
    background: "#f4f4f5",
  },
  comment: { color: "#a1a1aa" },
  prolog: { color: "#a1a1aa" },
  doctype: { color: "#a1a1aa" },
  cdata: { color: "#a1a1aa" },
  punctuation: { color: "#71717a" },
  property: { color: "#18181b" },
  tag: { color: "#18181b" },
  boolean: { color: "#3f3f46" },
  number: { color: "#3f3f46" },
  constant: { color: "#18181b" },
  symbol: { color: "#18181b" },
  selector: { color: "#27272a" },
  "attr-name": { color: "#52525b" },
  string: { color: "#52525b" },
  char: { color: "#52525b" },
  builtin: { color: "#18181b" },
  inserted: { color: "#18181b" },
  operator: { color: "#71717a" },
  entity: { color: "#18181b" },
  url: { color: "#52525b" },
  variable: { color: "#27272a" },
  atrule: { color: "#18181b" },
  "attr-value": { color: "#52525b" },
  function: { color: "#18181b" },
  keyword: { color: "#3f3f46", fontWeight: "600" },
  regex: { color: "#52525b" },
  important: { color: "#18181b", fontWeight: "600" },
};

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  ruby: "Ruby",
  go: "Go",
  rust: "Rust",
  java: "Java",
  csharp: "C#",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  bash: "Bash",
  shell: "Shell",
  curl: "cURL",
  json: "JSON",
  yaml: "YAML",
  sql: "SQL",
  graphql: "GraphQL",
  html: "HTML",
  css: "CSS",
  jsx: "JSX",
  tsx: "TSX",
};

export function CodeTabs({ examples, title }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExample = examples[activeIndex];
  const isDarkMode = useIsDarkMode();

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-border">
      {/* Header with tabs */}
      <div className="flex items-center justify-between bg-muted border-b border-border">
        <div className="flex">
          {examples.map((example, index) => (
            <button
              key={`${example.language}-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                index === activeIndex
                  ? "bg-background text-foreground border-b-2 border-foreground"
                  : "text-secondary hover:text-foreground hover:bg-background/50"
              }`}
            >
              {example.label ||
                LANGUAGE_LABELS[example.language] ||
                example.language}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-2">
          {title && <span className="text-xs text-secondary">{title}</span>}
          <CopyButton text={activeExample.code.trim()} />
        </div>
      </div>

      {/* Code block */}
      <SyntaxHighlighter
        style={isDarkMode ? minimalDark : minimalLight}
        language={activeExample.language}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "1rem",
          borderRadius: 0,
          fontSize: "0.875rem",
          background: isDarkMode ? "#18181b" : "#f4f4f5",
        }}
      >
        {activeExample.code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
