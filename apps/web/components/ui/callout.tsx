"use client";

import { ReactNode } from "react";
import {
  InformationCircleIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export type CalloutType = "note" | "tip" | "warning" | "danger";

type CalloutProps = {
  type: CalloutType;
  title?: string;
  children: ReactNode;
};

const CALLOUT_CONFIG: Record<
  CalloutType,
  {
    icon: typeof InformationCircleIcon;
    iconColor: string;
    defaultTitle: string;
  }
> = {
  note: {
    icon: InformationCircleIcon,
    iconColor: "text-blue-400",
    defaultTitle: "Note",
  },
  tip: {
    icon: LightBulbIcon,
    iconColor: "text-indigo-400",
    defaultTitle: "Tip",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    iconColor: "text-yellow-400",
    defaultTitle: "Warning",
  },
  danger: {
    icon: XCircleIcon,
    iconColor: "text-red-400",
    defaultTitle: "Caution",
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = CALLOUT_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="my-4 flex gap-3" role="alert">
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">
          {title || config.defaultTitle}
        </p>
        <div className="text-secondary text-sm mt-1">{children}</div>
      </div>
    </div>
  );
}

/**
 * Parse callout block from markdown
 * Syntax: :::note or :::tip[Custom Title]
 * Content goes here
 * :::
 */
export function parseCalloutBlock(
  text: string
): { type: CalloutType; title?: string; content: string } | null {
  // Match :::type or :::type[title]
  const match = text.match(
    /^:::(note|tip|warning|danger)(?:\[([^\]]+)\])?\s*\n([\s\S]*?)(?:\n:::)?$/
  );

  if (!match) return null;

  return {
    type: match[1] as CalloutType,
    title: match[2],
    content: match[3].trim(),
  };
}
