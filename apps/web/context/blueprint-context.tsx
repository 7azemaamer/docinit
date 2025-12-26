"use client";

import { Blueprint, Section, Page } from "@docinit/core";
import { createContext, useContext, useState, ReactNode } from "react";

/**
 * BlueprintContext - Manages blueprint state for editing
 *
 * This provides:
 * - Current blueprint data
 * - Methods to add/update/delete sections and pages
 *
 * Usage:
 * 1. Wrap your app with <BlueprintProvider>
 * 2. Use useBlueprintContext() to access state and actions
 */

type BlueprintContextType = {
  blueprint: Blueprint;
  // Section actions
  addSection: (title: string) => void;
  // Page actions
  addPage: (sectionId: string, title: string, purpose: string) => void;
};

const BlueprintContext = createContext<BlueprintContextType | null>(null);

// Helper to generate slug from title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Helper to generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function BlueprintProvider({
  initialBlueprint,
  children,
}: {
  initialBlueprint: Blueprint;
  children: ReactNode;
}) {
  const [blueprint, setBlueprint] = useState<Blueprint>(initialBlueprint);

  // Add a new section
  const addSection = (title: string) => {
    const newSection: Section = {
      id: generateId(),
      title,
      slug: slugify(title),
      pages: [],
    };

    setBlueprint((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  // Add a new page to a section
  const addPage = (sectionId: string, title: string, purpose: string) => {
    const newPage: Page = {
      id: generateId(),
      title,
      slug: slugify(title),
      purpose,
      status: "empty",
    };

    setBlueprint((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, pages: [...section.pages, newPage] }
          : section
      ),
    }));
  };

  return (
    <BlueprintContext.Provider value={{ blueprint, addSection, addPage }}>
      {children}
    </BlueprintContext.Provider>
  );
}

// Hook to use the context
export function useBlueprintContext() {
  const context = useContext(BlueprintContext);
  if (!context) {
    throw new Error(
      "useBlueprintContext must be used within a BlueprintProvider"
    );
  }
  return context;
}
