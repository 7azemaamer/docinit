"use client";

import { Page } from "@docinit/core";
import { useState, useEffect } from "react";
import { useBlueprintContext } from "@/context/blueprint-context";
import { useTocContent } from "@/context/toc-context";
import { EditableField } from "@/components/ui/editable-field";
import { StatusDropdown } from "@/components/ui/status-dropdown";
import Link from "next/link";
import { MarkdownEditor } from "@/components/ui/markdown-editor";

type Props = {
  docSlug: string;
  sectionSlug: string;
  pageSlug: string;
};

export default function PageView({ docSlug, sectionSlug, pageSlug }: Props) {
  const { blueprint, updatePageStatus } = useBlueprintContext();
  const { setContent: setTocContent } = useTocContent();

  const section = blueprint.sections.find((s) => s.slug === sectionSlug);
  const page = section?.pages.find((p) => p.slug === pageSlug);

  const [title, setTitle] = useState(page?.title || "");
  const [content, setContent] = useState(page?.content || "");

  // Update TOC when content changes
  useEffect(() => {
    setTocContent(content);
  }, [content, setTocContent]);

  if (!page || !section) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <Link
          href={`/builder/${docSlug}`}
          className="text-foreground hover:underline"
        >
          Back
        </Link>
      </div>
    );
  }

  const handleStatusChange = (status: Page["status"]) => {
    updatePageStatus(section.id, page.id, status);
  };

  return (
    <article className="space-y-6">
      {/* Header with title and status */}
      <div className="flex items-start justify-between gap-4">
        <EditableField
          value={title}
          onChange={setTitle}
          variant="title"
          placeholder="Page title..."
        />
        <StatusDropdown status={page.status} onChange={handleStatusChange} />
      </div>

      <MarkdownEditor
        value={content}
        onChange={setContent}
        placeholder="Write your documentation in Markdown..."
      />
    </article>
  );
}
