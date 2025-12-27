"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TocContextType = {
  content: string;
  setContent: (content: string) => void;
};

const TocContext = createContext<TocContextType | null>(null);

export function TocProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState("");

  return (
    <TocContext.Provider value={{ content, setContent }}>
      {children}
    </TocContext.Provider>
  );
}

export function useTocContent() {
  const context = useContext(TocContext);
  if (!context) {
    throw new Error("useTocContent must be used within TocProvider");
  }
  return context;
}
