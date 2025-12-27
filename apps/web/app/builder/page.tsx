import { mockBlueprints } from "@/lib/mock-blueprint";
import Link from "next/link";
import {
  DocumentTextIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function BuilderPage() {
  return (
    <main className="flex-1 overflow-auto px-20 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Your Docs</h1>
            <p className="text-secondary">
              {mockBlueprints.length} documentation projects
            </p>
          </div>
          <Link
            href="/new"
            className="flex items-center gap-2 px-4 py-2 font-bold bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            <PlusIcon className="h-4 w-4" />
            New Doc
          </Link>
        </div>

        {/* Docs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBlueprints.map((blueprint) => {
            const totalPages = blueprint.sections.reduce(
              (acc, s) => acc + s.pages.length,
              0
            );
            const completedPages = blueprint.sections.reduce(
              (acc, s) =>
                acc + s.pages.filter((p) => p.status === "completed").length,
              0
            );

            return (
              <Link
                key={blueprint.id}
                href={`/builder/${blueprint.slug}`}
                className="group p-6 rounded-xl border border-border hover:border-foreground bg-background transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <DocumentTextIcon className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground truncate">
                        {blueprint.name}
                      </h3>
                      <ArrowRightIcon className="h-4 w-4 text-accent group-hover:text-foreground transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-sm text-secondary mt-1">
                      {blueprint.sections.length} sections • {totalPages} pages
                    </p>
                    {/* Progress bar */}
                    <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{
                          width: `${
                            totalPages > 0
                              ? (completedPages / totalPages) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-accent mt-1">
                      {completedPages}/{totalPages} completed
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
