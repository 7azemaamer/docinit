"use client";

import { useState } from "react";
import { Page } from "@docinit/core";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { STATUS_STYLES } from "./status-badge";

const STATUS_OPTIONS: {
  value: Page["status"];
  label: string;
}[] = [
  { value: "empty", label: "Empty" },
  { value: "draft", label: "Draft" },
  { value: "completed", label: "Completed" },
];

type StatusDropdownProps = {
  status: Page["status"];
  onChange: (status: Page["status"]) => void;
};

export function StatusDropdown({ status, onChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const current = STATUS_OPTIONS.find((s) => s.value === status)!;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:opacity-80 ${STATUS_STYLES[status]}`}
      >
        {current.label}
        <ChevronDownIcon className="h-3 w-3" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-28">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors flex items-center gap-2 ${
                  status === option.value ? "font-medium" : ""
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    STATUS_STYLES[option.value].split(" ")[0]
                  }`}
                />
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
