import { getBlueprintBySlug } from "@/lib/mock-blueprint";
import { notFound } from "next/navigation";
import { DocLayoutClient } from "./doc-layout-client";

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const blueprint = getBlueprintBySlug(doc);

  if (!blueprint) {
    notFound();
  }

  return (
    <DocLayoutClient blueprint={blueprint} docSlug={doc}>
      {children}
    </DocLayoutClient>
  );
}
