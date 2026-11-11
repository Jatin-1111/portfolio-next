"use client";

/** Re-runs the build-up intro (see components/build/build-intro.tsx) */
export function ReplayButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("portfolio:replay"))}
      className="link-rule text-sm text-fg-muted hover:text-accent"
    >
      Replay the build
    </button>
  );
}
