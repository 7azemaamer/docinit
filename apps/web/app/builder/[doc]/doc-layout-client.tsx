"use client";

import { Blueprint } from "@docinit/core";
import { BlueprintProvider } from "@/context/blueprint-context";
import { TocProvider } from "@/context/toc-context";
import Sidebar from "@/components/layout/sidebar";
import TableOfContents from "@/components/layout/table-of-contents";
import { ReactNode } from "react";

type DocLayoutClientProps = {
  blueprint: Blueprint;
  docSlug: string;
  children: ReactNode;
};

export function DocLayoutClient({
  blueprint,
  docSlug,
  children,
}: DocLayoutClientProps) {
  return (
    <BlueprintProvider initialBlueprint={blueprint}>
      <TocProvider>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <aside className="w-64 border-r border-border overflow-y-auto">
            <Sidebar docSlug={docSlug} />
          </aside>

          {/* Center Content */}
          <main className="flex-1 overflow-auto px-20 py-12">{children}</main>

          {/* Right TOC */}
          <aside className="w-56 border-l border-border overflow-y-auto hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </TocProvider>
    </BlueprintProvider>
  );
}
