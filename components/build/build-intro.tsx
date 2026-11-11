"use client";

import { useEffect, useRef } from "react";
import { CURSORS } from "./cursors";
import type { BuildHandle } from "./timeline";

type Vars = React.CSSProperties & { "--c": string };

declare global {
  interface Window {
    __pfFailsafe?: number;
  }
}

/**
 * Mounts the cursor layer, then plays the build-up. It only runs when the
 * inline script in the root layout added `build` to <html> (first visit in a
 * session). The footer's replay button re-runs it; Escape skips it.
 */
export function BuildIntro() {
  const layerRef = useRef<HTMLDivElement>(null);
  const handle = useRef<BuildHandle | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;

    const run = async () => {
      root.classList.add("build");
      window.clearTimeout(window.__pfFailsafe);
      try {
        await document.fonts.ready;
      } catch {
        /* fonts API unavailable: measure anyway */
      }
      if (cancelled || !layerRef.current) return;
      window.scrollTo(0, 0);
      const { createBuild } = await import("./timeline");
      if (cancelled || !layerRef.current) return;
      handle.current = createBuild(layerRef.current);
      handle.current.play();
      if (process.env.NODE_ENV !== "production") {
        (window as unknown as { __pf?: BuildHandle }).__pf = handle.current;
      }
    };

    if (root.classList.contains("build")) void run();

    const onReplay = () => {
      handle.current?.kill();
      window.scrollTo(0, 0);
      void run();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handle.current?.skip();
    };
    window.addEventListener("portfolio:replay", onReplay);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelled = true;
      handle.current?.kill();
      window.removeEventListener("portfolio:replay", onReplay);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={layerRef} className="build-layer" aria-hidden="true">
      {CURSORS.map((c) => (
        <div
          key={c.id}
          data-cursor={c.id}
          className="bc"
          style={{ "--c": c.color } as Vars}
        >
          <span className="bc-ring" />
          <svg width="22" height="26" viewBox="0 0 22 26" className="bc-arrow">
            {/* Rounded pointer: white keyline, agent colour fill */}
            <path
              d="M3 2.6 C3 1.5 4.2 1 5 1.7 L18.3 12.4 C19.2 13.1 18.8 14.5 17.7 14.6 L11.9 15.1 L15.2 21.3 C15.5 21.9 15.3 22.6 14.7 22.9 L12.9 23.8 C12.3 24.1 11.6 23.9 11.3 23.3 L8.1 17 L4 20.9 C3.2 21.6 3 21.2 3 20.4 Z"
              fill={c.color}
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinejoin="round"
              paintOrder="stroke"
            />
          </svg>
          <span className="bc-name">
            <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M6 0 L7.3 4.7 L12 6 L7.3 7.3 L6 12 L4.7 7.3 L0 6 L4.7 4.7 Z"
                fill="currentColor"
              />
            </svg>
            {c.name}
          </span>
        </div>
      ))}
      {CURSORS.map((c) => (
        <div
          key={c.id}
          data-sel={c.id}
          className="bs"
          style={{ "--c": c.color } as Vars}
        >
          <i />
          <i />
          <i />
          <i />
        </div>
      ))}
    </div>
  );
}
