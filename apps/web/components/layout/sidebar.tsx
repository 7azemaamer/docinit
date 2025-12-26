"use client";

import { Blueprint } from "@docinit/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ blueprint }: { blueprint: Blueprint }) {
  const pathname = usePathname();

  return (
    <div className="p-4">
      {blueprint.sections.map((section) => {
        return (
          <div key={section.id} className="mb-4">
            <div className="font-bold text-foreground mb-2">
              {section.title}
            </div>
            <div className="ms-2 space-y-1">
              {section.pages.map((page) => {
                const href = `/builder/${section.slug}/${page.slug}`;
                const isActive = pathname === href;

                return (
                  <Link
                    key={page.slug}
                    href={href}
                    className={`block py-1 transition-colors ${
                      isActive
                        ? "text-primary font-medium border-l-2 border-primary pl-2 -ml-2"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {page.title}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
