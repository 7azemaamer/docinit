"use client";

import dynamic from "next/dynamic";

const ThemeToggleButton = dynamic(
  () => import("./theme-toggle-button").then((mod) => mod.ThemeToggleButton),
  {
    ssr: false,
    loading: () => (
      <button
        className="p-2 rounded hover:bg-muted transition-colors"
        disabled
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    ),
  }
);

export function ThemeToggle() {
  return <ThemeToggleButton />;
}
