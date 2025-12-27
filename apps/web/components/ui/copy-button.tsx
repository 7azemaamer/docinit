"use client";

import { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

type CopyButtonProps = {
  text: string;
  className?: string;
};

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded hover:bg-background/50 transition-colors ${className}`}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-foreground" />
      ) : (
        <ClipboardIcon className="h-4 w-4 text-secondary hover:text-foreground" />
      )}
    </button>
  );
}
