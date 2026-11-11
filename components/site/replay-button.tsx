"use client";

/** Re-runs the build-up intro (see components/build/build-intro.tsx) */
export function ReplayButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("portfolio:replay"))}
      className="link-rule inline-flex min-h-11 items-center px-1 text-sm text-fg-muted hover:text-accent"
    >
      Replay intro
    </button>
  );
}
