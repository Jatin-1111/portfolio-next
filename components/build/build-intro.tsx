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

/** Keys that mean "I want to scroll": they end the intro and keep the position */
const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
]);

/**
 * Mounts the cursor layer and the status bar, then plays the build-up. It only
 * runs when the inline script in the root layout added `build` to <html>
 * (first visit in a session, motion allowed). The visitor is always in
 * control: the Skip button, Escape, or any attempt to scroll, swipe or press
 * a scroll key ends the intro at once. The footer's replay link re-runs it.
 *
 * The status bar is server-rendered, so it is on screen from first paint,
 * before any script has loaded.
 */
export function BuildIntro() {
  const layerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
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
      if (cancelled || !layerRef.current || !hudRef.current) return;
      window.scrollTo(0, 0);
      const { createBuild } = await import("./timeline");
      if (cancelled || !layerRef.current || !hudRef.current) return;
      handle.current = createBuild(layerRef.current, hudRef.current);
      handle.current.play();
      if (process.env.NODE_ENV !== "production") {
        (window as unknown as { __pf?: BuildHandle }).__pf = handle.current;
      }
    };

    if (root.classList.contains("build")) void run();

    const building = () => root.classList.contains("build") && !!handle.current;
    const onReplay = () => {
      handle.current?.kill();
      window.scrollTo(0, 0);
      void run();
    };
    const onEscape = (e: KeyboardEvent) => {
      if (!building()) return;
      if (e.key === "Escape") handle.current?.skip();
      else if (SCROLL_KEYS.has(e.key)) handle.current?.skip(true);
    };
    const onGesture = () => {
      if (building()) handle.current?.skip(true);
    };
    window.addEventListener("portfolio:replay", onReplay);
    window.addEventListener("keydown", onEscape);
    window.addEventListener("wheel", onGesture, { passive: true });
    window.addEventListener("touchmove", onGesture, { passive: true });

    return () => {
      cancelled = true;
      handle.current?.kill();
      window.removeEventListener("portfolio:replay", onReplay);
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("wheel", onGesture);
      window.removeEventListener("touchmove", onGesture);
    };
  }, []);

  return (
    <>
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

      {/* Visible from first paint while the page builds: what is happening,
          how far along it is, and a way out */}
      <div ref={hudRef} className="build-bar">
        <span className="build-bar-dot" aria-hidden="true" />
        <span role="status">Building the page…</span>
        <span data-progress aria-hidden="true" className="build-bar-pct">
          0%
        </span>
        <button type="button" onClick={() => handle.current?.skip()}>
          Skip intro
        </button>
        <span className="build-bar-line" aria-hidden="true" />
      </div>
    </>
  );
}
