"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useBlueprint } from "@/hooks/use-blueprint";

export default function DocOverviewPage() {
  const params = useParams();
  const doc = params.doc as string;
  const { blueprint, loading } = useBlueprint(doc);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-secondary">Loading...</div>
      </div>
    );
  }

  if (!blueprint) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Not Found</h1>
        <p className="text-secondary">Blueprint &quot;{doc}&quot; not found</p>
        <Link href="/builder" className="text-foreground hover:underline">
          ← Back to Builder
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{blueprint.name}</h1>
        <p className="text-secondary">
          {blueprint.sections.length} sections •{" "}
          {blueprint.sections.reduce((acc, s) => acc + s.pages.length, 0)} pages
        </p>
      </div>

      {/* Sections */}
      {blueprint.sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            {section.title}
          </h2>

          {/* Page Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.pages.map((page) => (
              <Link
                key={page.id}
                href={`/builder/${doc}/${section.slug}/${page.slug}`}
                className="group p-5 rounded-xl border border-border hover:border-foreground bg-background transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-foreground">
                      {page.title}
                    </h3>
                    <p className="text-sm text-secondary line-clamp-2">
                      {page.purpose || "No description yet"}
                    </p>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-accent group-hover:text-foreground transition-colors mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
