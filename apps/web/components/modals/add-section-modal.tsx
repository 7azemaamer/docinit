"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useBlueprintContext } from "@/context/blueprint-context";

type AddSectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddSectionModal({ isOpen, onClose }: AddSectionModalProps) {
  const [title, setTitle] = useState("");
  const { addSection } = useBlueprintContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addSection(title.trim());
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Section">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="section-title"
            className="block text-sm font-medium text-secondary mb-1"
          >
            Section Title
          </label>
          <input
            id="section-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Getting Started"
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-foreground"
            autoFocus
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
            Add Section
          </button>
        </div>
      </form>
    </Modal>
  );
}
