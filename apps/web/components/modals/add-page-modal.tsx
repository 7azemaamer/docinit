"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useBlueprintContext } from "@/context/blueprint-context";

type AddPageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  sectionTitle: string;
};

export function AddPageModal({
  isOpen,
  onClose,
  sectionId,
  sectionTitle,
}: AddPageModalProps) {
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const { addPage } = useBlueprintContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addPage(sectionId, title.trim(), purpose.trim());
    setTitle("");
    setPurpose("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Page to ${sectionTitle}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="page-title"
            className="block text-sm font-medium text-secondary mb-1"
          >
            Page Title
          </label>
          <input
            id="page-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Installation"
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-foreground"
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="page-purpose"
            className="block text-sm font-medium text-secondary mb-1"
          >
            Purpose
            <span className="text-accent font-normal">
              {" "}
              (what this page should cover)
            </span>
          </label>
          <textarea
            id="page-purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g., Guide users through the installation process"
            rows={2}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-foreground resize-none"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-secondary hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Add Page
          </button>
        </div>
      </form>
    </Modal>
  );
}
