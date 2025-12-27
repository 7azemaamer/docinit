"use client";

import { useState, useRef, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { MarkdownPreview } from "./markdown-preview";
import { MarkdownHelp } from "./markdown-help";
import { EditorToolbar } from "./editor-toolbar";
import { CodeBlockModal } from "./code-block-modal";
import { useIsDarkMode } from "@/hooks/use-dark-mode";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in Markdown...",
}: MarkdownEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useIsDarkMode();

  // Auto-expand textarea
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(128, textarea.scrollHeight)}px`;
    }
  };

  useEffect(() => {
    if (isEditing && activeTab === "write" && textareaRef.current) {
      textareaRef.current.focus();
      adjustHeight();
    }
  }, [isEditing, activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    adjustHeight();
  };

  // Keyboard shortcuts for markdown formatting
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const selectedText = value.substring(selectionStart, selectionEnd);

    const wrapSelection = (before: string, after: string) => {
      e.preventDefault();
      const newValue =
        value.substring(0, selectionStart) +
        before +
        selectedText +
        after +
        value.substring(selectionEnd);
      onChange(newValue);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          selectionStart + before.length,
          selectionStart + before.length + selectedText.length
        );
      }, 0);
    };

    const insertText = (text: string) => {
      e.preventDefault();
      const newValue =
        value.substring(0, selectionStart) +
        text +
        value.substring(selectionEnd);
      onChange(newValue);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          selectionStart + text.length,
          selectionStart + text.length
        );
      }, 0);
    };

    // Ctrl/Cmd + Key shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b": // Bold
          wrapSelection("**", "**");
          break;
        case "i": // Italic
          wrapSelection("*", "*");
          break;
        case "k": // Link
          if (selectedText) {
            wrapSelection("[", "](url)");
          } else {
            insertText("[text](url)");
          }
          break;
        case "`": // Inline code
          wrapSelection("`", "`");
          break;
      }
    }
  };

  // Insert code block at cursor
  const insertCodeBlock = (markdown: string) => {
    const textarea = textareaRef.current;
    const pos = textarea?.selectionStart || value.length;
    const before = value.substring(0, pos);
    const after = value.substring(pos);
    const newLine = before.endsWith("\n") || before === "" ? "" : "\n";
    onChange(before + newLine + markdown + "\n" + after);
    adjustHeight();
  };

  // Close on click outside (but not when modal is open)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showCodeModal) return; // Don't close when modal is open
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false);
      }
    };
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, showCodeModal]);

  // VIEW MODE
  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className="group relative min-h-24 p-4 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 cursor-text transition-colors"
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-accent transition-opacity">
          <PencilIcon className="h-3 w-3" />
          Click to edit
        </div>
        <div className="prose prose-sm max-w-none text-secondary">
          <MarkdownPreview
            content={value}
            placeholder={placeholder}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    );
  }

  // EDIT MODE
  return (
    <>
      <div ref={containerRef} className="border border-border rounded-lg">
        {/* Tabs */}
        <div className="sticky -top-12 z-10 flex items-center justify-between border-b border-border bg-background rounded-t-lg">
          <div className="flex">
            <button
              onClick={() => setActiveTab("write")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "write"
                  ? "text-foreground border-b-2 border-foreground -mb-px bg-background"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              Markdown
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "preview"
                  ? "text-foreground border-b-2 border-foreground -mb-px bg-background"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              Preview
            </button>
          </div>
          <MarkdownHelp />
        </div>

        {/* Toolbar (write mode only) */}
        {activeTab === "write" && (
          <EditorToolbar onInsertCode={() => setShowCodeModal(true)} />
        )}

        {/* Content */}
        {activeTab === "write" ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full min-h-32 p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none"
          />
        ) : (
          <div className="min-h-32 p-4 prose prose-sm max-w-none text-foreground">
            <MarkdownPreview
              content={value}
              placeholder={placeholder}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>

      <CodeBlockModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        onInsert={insertCodeBlock}
      />
    </>
  );
}
