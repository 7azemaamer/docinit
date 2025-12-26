import Link from "next/link";
import {
  DocumentTextIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background sm:items-start">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-8 w-8 text-foreground" />
          <span className="text-2xl font-bold text-foreground">Docinit</span>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-md text-3xl font-semibold leading-10 tracking-tight text-foreground">
            Other tools render your docs. Docinit designs them.
          </h1>
          <p className="max-w-md text-lg leading-8 text-secondary">
            Blueprint-first documentation framework. Plan your structure, define
            the purpose, then fill the content.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-muted">
              <PencilSquareIcon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Blueprint First</h3>
              <p className="text-sm text-secondary">
                Define what docs should exist before writing a single word.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-muted">
              <DocumentTextIcon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Guided Writing</h3>
              <p className="text-sm text-secondary">
                Each page shows its purpose. Missing content is highlighted.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-muted">
              <RocketLaunchIcon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Production Ready</h3>
              <p className="text-sm text-secondary">
                Export a real documentation site. Deploy anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-opacity hover:opacity-80 md:w-[168px]"
            href="/builder"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Open Builder
          </Link>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-border px-5 text-foreground transition-colors hover:bg-muted md:w-[168px]"
            href="https://github.com/7azemaamer/docinit"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
