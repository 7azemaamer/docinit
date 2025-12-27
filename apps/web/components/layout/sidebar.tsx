"use client";

import { Page } from "@docinit/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useBlueprintContext } from "@/context/blueprint-context";
import { AddSectionModal } from "@/components/modals/add-section-modal";
import { AddPageModal } from "@/components/modals/add-page-modal";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageIcon } from "@/components/ui/page-icon";

const STATUS_CYCLE: Page["status"][] = ["empty", "draft", "completed"];

export default function Sidebar({ docSlug }: { docSlug: string }) {
  const pathname = usePathname();
  const { blueprint, updatePageStatus } = useBlueprintContext();

  const [showAddSection, setShowAddSection] = useState(false);
  const [addPageSection, setAddPageSection] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    () => {
      const collapsed = new Set<string>();
      blueprint.sections
        .slice(1)
        .forEach((section) => collapsed.add(section.id));
      return collapsed;
    }
  );

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const cycleStatus = (
    sectionId: string,
    pageId: string,
    currentStatus: Page["status"]
  ) => {
    const currentIndex = STATUS_CYCLE.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % STATUS_CYCLE.length;
    updatePageStatus(sectionId, pageId, STATUS_CYCLE[nextIndex]);
  };

  return (
    <>
      <nav className="py-6 px-3">
        {blueprint.sections.map((section) => {
          const isCollapsed = collapsedSections.has(section.id);

          return (
            <div key={section.id} className="group/section mb-3">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-secondary uppercase tracking-wide">
                  <ChevronRightIcon
                    className={`h-3 w-3 transition-transform duration-200 ${
                      isCollapsed ? "" : "rotate-90"
                    }`}
                  />
                  {section.title}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddPageSection({ id: section.id, title: section.title });
                  }}
                  className="opacity-0 group-hover/section:opacity-100 p-1 text-accent hover:text-foreground hover:bg-background rounded transition-all"
                >
                  <PlusIcon className="h-3 w-3" />
                </div>
              </button>

              {/* Pages */}
              {!isCollapsed && (
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
                        <PageIcon status={page.status} isActive={isActive} />
                        <span className="flex-1 truncate">{page.title}</span>
                        <StatusBadge
                          status={page.status}
                          onClick={() =>
                            cycleStatus(section.id, page.id, page.status)
                          }
                        />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

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
