"use client";

import { Page } from "@docinit/core";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

type PageIconProps = {
  status: Page["status"];
  isActive?: boolean;
  className?: string;
};

export function PageIcon({
  status,
  isActive = false,
  className,
}: PageIconProps) {
  const baseClass =
    className ??
    `h-4 w-4 shrink-0 ${isActive ? "text-foreground" : "text-accent"}`;

  if (status === "completed") {
    return <DocumentTextIcon className={`${baseClass} text-foreground`} />;
  }

  if (status === "draft") {
    return <PencilSquareIcon className={`${baseClass} text-secondary`} />;
  }

  return <DocumentIcon className={baseClass} />;
}
