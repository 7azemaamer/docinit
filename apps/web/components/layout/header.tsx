import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type HeaderProps = {
  projectName?: string;
};

export function Header({ projectName }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4">
      {/* Left: Logo + Project */}
      <div className="flex items-center gap-3">
        <Link
          href="/builder"
          className="flex items-center gap-2 text-foreground"
        >
          <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
            <DocumentTextIcon className="h-4 w-4 text-background" />
          </div>
          <span className="font-semibold">Docinit</span>
        </Link>
        {projectName && (
          <>
            <span className="text-border">/</span>
            <span className="text-secondary">{projectName}</span>
          </>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {projectName && (
          <>
            <button className="px-3 py-1.5 text-sm text-secondary hover:text-foreground transition-colors">
              Preview
            </button>
            <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity">
              Export
            </button>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
