"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { site } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-8 max-w-[18ch] font-display text-display font-normal text-fg">
        That didn&apos;t load.
      </h1>
      <p className="mt-6 max-w-lg text-lead text-fg-muted">
        An unexpected error stopped this page from rendering. Trying again often
        works. If it doesn&apos;t, email me at{" "}
        <a
          href={`mailto:${site.email}`}
          className="link-rule text-fg hover:text-accent"
        >
          {site.email}
        </a>{" "}
        and tell me what you were doing.
      </p>

      {error.digest && (
        <p className="label mt-6">Reference · {error.digest}</p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn group inline-flex items-center gap-2 rounded-md bg-fg px-6 py-3.5 text-sm text-bg hover:bg-accent"
        >
          <RotateCw className="size-4 transition-transform duration-500 group-hover:rotate-180" />
          Try again
        </button>
        <Link
          href="/"
          className="btn group inline-flex items-center gap-2 rounded-md border border-line-strong px-6 py-3.5 text-sm text-fg hover:border-fg"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>
      </div>
    </section>
  );
}
