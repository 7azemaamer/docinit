"use client";

import { Blueprint, Section, Page, slugify } from "@docinit/core";
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
  updatePageStatus: (
    sectionId: string,
    pageId: string,
    status: Page["status"]
  ) => void;
  updatePageContent: (
    sectionId: string,
    pageId: string,
    content: string
  ) => void;
};

const BlueprintContext = createContext<BlueprintContextType | null>(null);


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

  const updatePageStatus = (
    sectionId: string,
    pageId: string,
    status: Page["status"]
  ) => {
    setBlueprint((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              pages: section.pages.map((page) =>
                page.id === pageId ? { ...page, status } : page
              ),
            }
          : section
      ),
    }));
  };

  const updatePageContent = (
    sectionId: string,
    pageId: string,
    content: string
  ) => {
    setBlueprint((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              pages: section.pages.map((page) =>
                page.id === pageId
                  ? {
                      ...page,
                      content,
                      status: content.trim()
                        ? page.status === "empty"
                          ? "draft"
                          : page.status
                        : "empty",
                    }
                  : page
              ),
            }
          : section
      ),
    }));
  };

  return (
    <BlueprintContext.Provider
      value={{
        blueprint,
        addSection,
        addPage,
        updatePageStatus,
        updatePageContent,
      }}
    >
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
