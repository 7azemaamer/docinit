"use client";

import { Page } from "@docinit/core";

export const STATUS_STYLES = {
  empty:
    "bg-transparent border border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400",
  draft: "bg-zinc-300 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-100",
  completed:
    "bg-foreground text-background dark:bg-foreground dark:text-background",
} as const;

type StatusBadgeProps = {
  status: Page["status"];
  onClick?: () => void;
  size?: "sm" | "md";
};

export function StatusBadge({
  status,
  onClick,
  size = "sm",
}: StatusBadgeProps) {
  const sizeStyles =
    size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2.5 py-1";

  if (onClick) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        className={`font-medium rounded hover:opacity-80 transition-opacity ${sizeStyles} ${STATUS_STYLES[status]}`}
        title="Click to change status"
      >
        {status}
      </button>
    );
  }

  return (
    <span
      className={`font-medium rounded ${sizeStyles} ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
