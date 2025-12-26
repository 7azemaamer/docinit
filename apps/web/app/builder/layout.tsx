import { Header } from "@/components/layout/header";
import React from "react";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      {children}
    </div>
  );
}
