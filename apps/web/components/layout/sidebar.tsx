"use client";

import { Page } from "@docinit/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  DocumentIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useBlueprintContext } from "@/context/blueprint-context";
import { AddSectionModal } from "@/components/modals/add-section-modal";
import { AddPageModal } from "@/components/modals/add-page-modal";

function StatusBadge({ status }: { status: Page["status"] }) {
  const styles = {
    empty: "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-100",
    draft: "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-100",
    completed:
      "bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100",
  };

  return (
    <span
      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function Sidebar({ docSlug }: { docSlug: string }) {
  const pathname = usePathname();
  const { blueprint } = useBlueprintContext();

  // Modal state
  const [showAddSection, setShowAddSection] = useState(false);
  const [addPageSection, setAddPageSection] = useState<{
    id: string;
    title: string;
  } | null>(null);

  return (
    <>
      <nav className="py-6 px-3">
        {blueprint.sections.map((section) => (
          <div key={section.id} className="group/section mb-3">
            {/* Section Header */}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2 text-xs font-medium text-secondary uppercase tracking-wide">
                <ChevronRightIcon className="h-3 w-3" />
                {section.title}
              </div>
              <button
                onClick={() =>
                  setAddPageSection({ id: section.id, title: section.title })
                }
                className="opacity-0 group-hover/section:opacity-100 p-1 text-accent hover:text-foreground hover:bg-muted rounded transition-all"
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>

            {/* Pages */}
            <div className="space-y-0.5">
              {section.pages.map((page) => {
                const href = `/builder/${docSlug}/${section.slug}/${page.slug}`;
                const isActive = pathname === href;

                return (
                  <Link
                    key={page.slug}
                    href={href}
                    className={`group flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-muted border-2 border-foreground text-foreground"
                        : "text-secondary hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <DocumentIcon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-foreground" : "text-accent"
                      }`}
                    />
                    <span className="flex-1 truncate">{page.title}</span>
                    <StatusBadge status={page.status} />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Add Section Button */}
        <button
          onClick={() => setShowAddSection(true)}
          className="flex items-center gap-2 mx-2 px-3 py-2 w-[calc(100%-1rem)] text-xs text-accent hover:text-foreground hover:bg-muted rounded-lg transition-colors mt-2"
        >
          <PlusIcon className="h-3 w-3" />
          Add section
        </button>
      </nav>

      {/* Modals */}
      <AddSectionModal
        isOpen={showAddSection}
        onClose={() => setShowAddSection(false)}
      />
      {addPageSection && (
        <AddPageModal
          isOpen={true}
          onClose={() => setAddPageSection(null)}
          sectionId={addPageSection.id}
          sectionTitle={addPageSection.title}
        />
      )}
    </>
  );
}
