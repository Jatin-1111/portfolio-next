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
      <p className="label">Something went wrong</p>
      <h1 className="mt-8 max-w-[18ch] font-display text-display font-medium text-ink">
        That didn&apos;t load.
      </h1>
      <p className="mt-6 max-w-lg text-lead text-ink-muted">
        An unexpected error stopped this page from rendering. Trying again often
        works — if it doesn&apos;t, email me at{" "}
        <a
          href={`mailto:${site.email}`}
          className="link-rule text-ink hover:text-accent"
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
          className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-accent"
        >
          <RotateCw className="size-4 transition-transform duration-500 group-hover:rotate-180" />
          Try again
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 border border-rule-strong px-6 py-3.5 text-sm text-ink transition-colors hover:border-ink"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>
      </div>
    </section>
  );
}
