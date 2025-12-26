"use client";

import { Page } from "@docinit/core";
import { useState } from "react";
import { EditableField } from "@/components/ui/editable-field";

export default function PageView({ page }: { page: Page }) {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content || "");

  return (
    <article className="space-y-6">
      {/* Title */}
      <EditableField
        value={title}
        onChange={setTitle}
        variant="title"
        placeholder="Page title..."
      />

      {/* Content */}
      <EditableField
        value={content}
        onChange={setContent}
        variant="content"
        multiline
        placeholder="Click to add content..."
      />
    </article>
  );
}
