import Sidebar from "@/components/layout/sidebar";
import TableOfContents from "@/components/layout/table-of-contents";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mockBlueprint } from "@/lib/mock-blueprint";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-border bg-muted">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Docinit</h2>
          <ThemeToggle />
        </div>
        <Sidebar blueprint={mockBlueprint} />
      </aside>

      {/* Center Content */}
      <main className="flex-1 overflow-auto bg-background">{children}</main>

      {/* Right Sidebar */}
      <aside className="w-64 border-l border-border bg-muted">
        <TableOfContents />
      </aside>
    </div>
  );
}
