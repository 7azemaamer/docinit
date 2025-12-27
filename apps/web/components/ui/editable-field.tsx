"use client";

import { useState, useRef, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

/**
 * EditableField - Reusable editable field component
 *
 * Features:
 * - Click to edit
 * - Supports single-line and multi-line
 * - Escape key to close
 */

type EditableFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "title" | "content";
  multiline?: boolean;
};

export function EditableField({
  value,
  onChange,
  placeholder = "Click to edit...",
  variant = "content",
  multiline = false,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
    if (e.key === "Enter" && !multiline) {
      setIsEditing(false);
    }
  };

  const styles = {
    title: {
      view: "text-3xl font-bold text-foreground",
      edit: "text-3xl font-bold bg-transparent border-b-2 border-foreground focus:outline-none w-full",
    },
    content: {
      view: "text-secondary whitespace-pre-wrap",
      edit: "w-full min-h-[200px] p-4 bg-muted border border-border rounded-lg text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-foreground font-mono text-sm",
    },
  };

  if (isEditing) {
    // EDIT MODE
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
          className={styles[variant].edit}
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={handleKeyDown}
        className={styles[variant].edit}
        placeholder={placeholder}
      />
    );
  }

  // VIEW MODE
  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`group relative cursor-text ${
        variant === "content"
          ? "min-h-[200px] p-4 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-colors"
          : "inline-block hover:bg-muted/50 rounded px-1 -mx-1 transition-colors"
      }`}
    >
      {/* Edit hint */}
      <div
        className={`absolute opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-accent transition-opacity ${
          variant === "content"
            ? "top-2 right-2"
            : "-right-6 top-1/2 -translate-y-1/2"
        }`}
      >
        <PencilIcon className="h-3 w-3" />
        {variant === "content" && "Click to edit"}
      </div>

      {/* Content or placeholder */}
      {value ? (
        <span className={styles[variant].view}>{value}</span>
      ) : (
        <span className="text-accent italic">{placeholder}</span>
      )}
    </div>
  );
}
