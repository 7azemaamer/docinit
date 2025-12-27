"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function MarkdownHelp() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="relative px-2">
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="p-1.5 text-accent hover:text-foreground transition-colors"
        title="Markdown help"
      >
        <QuestionMarkCircleIcon className="h-4 w-4" />
      </button>

      {showHelp && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowHelp(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-background border border-border rounded-lg shadow-xl p-3 text-xs">
            <h4 className="font-semibold text-foreground mb-2">
              Markdown Syntax
            </h4>
            <div className="space-y-1 text-secondary font-mono text-[11px]">
              <p>
                <span className="text-foreground"># Heading 1</span>
              </p>
              <p>
                <span className="text-foreground">## Heading 2</span>
              </p>
              <p>
                <span className="text-foreground">**bold**</span> →{" "}
                <strong>bold</strong>
              </p>
              <p>
                <span className="text-foreground">*italic*</span> →{" "}
                <em>italic</em>
              </p>
              <p>
                <span className="text-foreground">`code`</span> →{" "}
                <code className="bg-muted px-1 rounded">code</code>
              </p>
              <p>
                <span className="text-foreground">[link](url)</span>
              </p>
              <p>
                <span className="text-foreground">- list item</span>
              </p>
            </div>

            <h4 className="font-semibold text-foreground mt-2 mb-1">
              Code Blocks
            </h4>
            <div className="bg-muted p-2 rounded font-mono text-secondary text-[11px]">
              <p className="text-foreground">```javascript</p>
              <p>const x = 1;</p>
              <p className="text-foreground">```</p>
            </div>

            <h4 className="font-semibold text-foreground mt-2 mb-1">
              Multi-Language Tabs
            </h4>
            <div className="bg-muted p-2 rounded font-mono text-secondary text-[11px]">
              <p className="text-foreground">```tabs</p>
              <p className="text-foreground">---javascript</p>
              <p>const x = 1;</p>
              <p className="text-foreground">---python</p>
              <p>x = 1</p>
              <p className="text-foreground">```</p>
            </div>

            <h4 className="font-semibold text-foreground mt-2 mb-1">
              Callouts
            </h4>
            <div className="bg-muted p-2 rounded font-mono text-secondary text-[11px]">
              <p className="text-foreground">:::note</p>
              <p>Your note here</p>
              <p className="text-foreground">:::</p>
            </div>
            <p className="text-secondary mt-1.5 text-[10px]">
              Types: note, tip, warning, danger. Add title: :::tip[Title]
            </p>
          </div>
        </>
      )}
    </div>
  );
}
