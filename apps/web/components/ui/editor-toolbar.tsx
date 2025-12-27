"use client";

import { CodeBracketIcon } from "@heroicons/react/24/outline";

type Props = {
  onInsertCode: () => void;
};

export function EditorToolbar({ onInsertCode }: Props) {
  return (
    <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border">
      <button
        onClick={onInsertCode}
        className="flex items-center gap-1.5 px-2 py-1 text-xs text-secondary hover:text-foreground hover:bg-muted rounded transition-colors"
        title="Insert code block"
      >
        <CodeBracketIcon className="h-4 w-4" />
        <span>Code</span>
      </button>
    </div>
  );
}
