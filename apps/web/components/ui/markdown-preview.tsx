"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CodeTabs, CodeExample } from "./code-tabs";
import { CopyButton } from "./copy-button";
import { Callout, CalloutType } from "./callout";

type MarkdownPreviewProps = {
  content: string;
  placeholder?: string;
  isDarkMode: boolean;
};

// Custom minimal dark theme (gray/black)
const minimalDark: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': { color: "#e4e4e7", background: "#18181b" },
  'pre[class*="language-"]': { color: "#e4e4e7", background: "#18181b" },
  comment: { color: "#71717a" },
  punctuation: { color: "#a1a1aa" },
  property: { color: "#fafafa" },
  string: { color: "#a1a1aa" },
  operator: { color: "#71717a" },
  function: { color: "#fafafa" },
  keyword: { color: "#d4d4d8", fontWeight: "600" },
  number: { color: "#d4d4d8" },
  boolean: { color: "#d4d4d8" },
};

// Custom minimal light theme
const minimalLight: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': { color: "#18181b", background: "#f4f4f5" },
  'pre[class*="language-"]': { color: "#18181b", background: "#f4f4f5" },
  comment: { color: "#a1a1aa" },
  punctuation: { color: "#71717a" },
  property: { color: "#18181b" },
  string: { color: "#52525b" },
  operator: { color: "#71717a" },
  function: { color: "#18181b" },
  keyword: { color: "#3f3f46", fontWeight: "600" },
  number: { color: "#3f3f46" },
  boolean: { color: "#3f3f46" },
};

// Parse ```tabs blocks into CodeTabs format
function parseTabsBlock(code: string): CodeExample[] | null {
  if (!code.startsWith("---")) return null;

  const examples: CodeExample[] = [];
  const parts = code.split(/^---(\w+)\n/m).filter(Boolean);

  for (let i = 0; i < parts.length; i += 2) {
    const language = parts[i];
    const codeContent = parts[i + 1]?.trim();
    if (language && codeContent) {
      examples.push({ language, code: codeContent });
    }
  }

  return examples.length > 0 ? examples : null;
}

function preprocessCallouts(content: string): string {
  return content.replace(
    /^:::(note|tip|warning|danger)(?:\[([^\]]+)\])?\s*\n([\s\S]*?)^:::\s*$/gm,
    (_, type, title, body) => {
      const titleLine = title ? `__CALLOUT_TITLE__${title}__END_TITLE__\n` : "";
      return `\`\`\`callout-${type}\n${titleLine}${body.trim()}\n\`\`\``;
    }
  );
}

export function MarkdownPreview({
  content,
  placeholder = "No content yet...",
  isDarkMode,
}: MarkdownPreviewProps) {
  if (!content) {
    return <p className="text-accent italic">{placeholder}</p>;
  }

  // Preprocess callout syntax
  const processedContent = preprocessCallouts(content);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => {
          const id = String(children).toLowerCase().replace(/\s+/g, "-");
          return (
            <h1 id={id} className="text-2xl font-bold mt-6 mb-4 scroll-mt-20">
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          const id = String(children).toLowerCase().replace(/\s+/g, "-");
          return (
            <h2
              id={id}
              className="text-xl font-semibold mt-6 mb-3 scroll-mt-20"
            >
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const id = String(children).toLowerCase().replace(/\s+/g, "-");
          return (
            <h3
              id={id}
              className="text-lg font-semibold mt-4 mb-2 scroll-mt-20"
            >
              {children}
            </h3>
          );
        },
        p: ({ children }) => <p className="my-3 text-foreground">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc ml-6 my-3">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-6 my-3">{children}</ol>
        ),
        li: ({ children }) => <li className="my-1">{children}</li>,
        a: ({ href, children }) => (
          <a href={href} className="text-foreground underline hover:opacity-80">
            {children}
          </a>
        ),
        code: ({ className, children }) => {
          const match = /language-(\S+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");

          // Handle callout blocks: ```callout-note, ```callout-tip, etc.
          const calloutMatch = /^callout-(note|tip|warning|danger)$/.exec(
            match?.[1] || ""
          );
          if (calloutMatch) {
            // Extract title from content if present
            const titleMatch = codeString.match(
              /^__CALLOUT_TITLE__(.+?)__END_TITLE__\n?/
            );
            const title = titleMatch?.[1];
            const content = titleMatch
              ? codeString.replace(titleMatch[0], "")
              : codeString;

            return (
              <Callout type={calloutMatch[1] as CalloutType} title={title}>
                {content}
              </Callout>
            );
          }

          if (match && match[1] === "tabs") {
            const examples = parseTabsBlock(codeString);
            if (examples) {
              return <CodeTabs examples={examples} />;
            }
          }

          if (match) {
            return (
              <div className="relative group">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={codeString} />
                </div>
                <SyntaxHighlighter
                  style={isDarkMode ? minimalDark : minimalLight}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    background: isDarkMode ? "#18181b" : "#f4f4f5",
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          }
          return (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <div className="my-4">{children}</div>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-border pl-4 my-4 italic text-secondary">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <table className="border-collapse my-4 w-full">{children}</table>
        ),
        th: ({ children }) => (
          <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2">{children}</td>
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
