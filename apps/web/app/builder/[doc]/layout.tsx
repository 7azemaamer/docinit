"use client";

import { useParams } from "next/navigation";
import { useBlueprint } from "@/hooks/use-blueprint";
import { DocLayoutClient } from "./doc-layout-client";

export default function DocLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const doc = params.doc as string;
  const { blueprint, loading } = useBlueprint(doc);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-secondary">Loading...</div>
      </div>
    );
  }

  if (!blueprint) {
    return <>{children}</>;
  }

  return (
    <DocLayoutClient blueprint={blueprint} docSlug={doc}>
      {children}
    </DocLayoutClient>
  );
}
