"use client";

import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "ruby",
  "java",
  "php",
  "bash",
  "sql",
  "json",
  "yaml",
] as const;

type CodeTab = {
  language: string;
  code: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (markdown: string) => void;
};

export function CodeBlockModal({ isOpen, onClose, onInsert }: Props) {
  const [tabs, setTabs] = useState<CodeTab[]>([
    { language: "javascript", code: "" },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [isMulti, setIsMulti] = useState(false);

  if (!isOpen) return null;

  const addTab = () => {
    const usedLangs = tabs.map((t) => t.language);
    const nextLang = LANGUAGES.find((l) => !usedLangs.includes(l)) || "text";
    setTabs([...tabs, { language: nextLang, code: "" }]);
    setActiveTab(tabs.length);
  };

  const removeTab = (index: number) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setActiveTab(Math.min(activeTab, newTabs.length - 1));
  };

  const updateTab = (index: number, updates: Partial<CodeTab>) => {
    setTabs(tabs.map((tab, i) => (i === index ? { ...tab, ...updates } : tab)));
  };

  const handleInsert = () => {
    const validTabs = tabs.filter((t) => t.code.trim());
    if (validTabs.length === 0) return;

    let markdown: string;

    if (isMulti && validTabs.length > 1) {
      // Multi-language tabs format
      const content = validTabs
        .map((t) => `---${t.language}\n${t.code.trim()}`)
        .join("\n");
      markdown = `\`\`\`tabs\n${content}\n\`\`\``;
    } else {
      // Single code block
      const tab = validTabs[0];
      markdown = `\`\`\`${tab.language}\n${tab.code.trim()}\n\`\`\``;
    }

    onInsert(markdown);
    // Reset state
    setTabs([{ language: "javascript", code: "" }]);
    setActiveTab(0);
    setIsMulti(false);
    onClose();
  };

  const currentTab = tabs[activeTab];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] md:max-h-[80vh] bg-background border border-border rounded-xl shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="font-semibold text-foreground">Insert Code Block</h2>
          <button
            onClick={onClose}
            className="p-1 text-secondary hover:text-foreground transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Toggle */}
        <div className="px-4 py-3 border-b border-border">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isMulti}
              onChange={(e) => setIsMulti(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-secondary">Multi-language tabs</span>
          </label>
        </div>

        {/* Language tabs (when multi) */}
        {isMulti && (
          <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-muted/30 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  index === activeTab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-secondary hover:text-foreground"
                }`}
              >
                {tab.language}
                {tabs.length > 1 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(index);
                    }}
                    className="p-0.5 hover:bg-muted rounded"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={addTab}
              className="p-1.5 text-secondary hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="Add language"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Language selector (single mode) or for current tab */}
        <div className="px-4 py-2 border-b border-border">
          <select
            value={currentTab.language}
            onChange={(e) => updateTab(activeTab, { language: e.target.value })}
            className="px-2 py-1 text-sm bg-muted border border-border rounded-md text-foreground"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Code editor */}
        <div className="flex-1 min-h-0 p-4">
          <textarea
            value={currentTab.code}
            onChange={(e) => updateTab(activeTab, { code: e.target.value })}
            placeholder={`Enter your ${currentTab.language} code...`}
            className="w-full h-full min-h-[200px] p-3 bg-muted border border-border rounded-lg font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-foreground"
            spellCheck={false}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-secondary hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!tabs.some((t) => t.code.trim())}
            className="px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            Insert
          </button>
        </div>
      </div>
    </>
  );
}
