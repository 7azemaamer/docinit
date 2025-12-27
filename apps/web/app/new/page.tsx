"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Toggle from "@/components/ui/toggle";

export default function NewProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [connectGithub, setConnectGithub] = useState(false);

  const handleContinue = () => {
    if (!projectName.trim()) return;

    sessionStorage.setItem(
      "newProject",
      JSON.stringify({
        name: projectName,
        description,
        connectGithub,
      })
    );

    router.push("/new/questions");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-foreground transition-colors"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span className="font-semibold">Docinit</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">
            Let&#39;s document your project
          </h1>
          <p className="text-lg text-secondary">
            Tell us a bit about what you&#39;re building, and we&#39;ll help you
            create great docs.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              What&#39;s your project called? *
            </label>
            <input
              id="name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. My Awesome API, Design System, React Library..."
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-foreground"
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground"
            >
              Quick description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does it do? Who's it for?"
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-foreground resize-none"
            />
          </div>

          {/* GitHub Connection */}
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/50">
            <Toggle
              id="github"
              checked={connectGithub}
              onChange={(e) => setConnectGithub(e.target.checked)}
              size="lg"
            />

            <div className="space-y-1">
              <label
                htmlFor="github"
                className="block text-sm font-medium text-foreground cursor-pointer"
              >
                Connect to GitHub
              </label>
              <p className="text-sm text-secondary">
                We can peek at your code to suggest better docs structure
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleContinue}
            disabled={!projectName.trim()}
            className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
