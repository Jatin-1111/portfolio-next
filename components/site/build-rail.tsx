"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Stage = { id: string; heading: string };

/**
 * A case study read as a build sequence, after the "house that builds itself
 * in five stages" prompt in awesome-opus5-5-videos: every section is a stage
 * with its own window on one timeline, and the reader's scroll is the
 * playhead. Replaces the old contents list and the top reading-progress line.
 *
 * The fill follows scroll directly (scrub, no easing), so it is position
 * feedback rather than animation and stays on under reduced motion.
 */
function useBuild(stages: Stage[]) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const elements = stages
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    // The stage nearest the top of the viewport that is on screen
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(elements.indexOf(visible.target as HTMLElement));
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));

    const body = document.querySelector("[data-case-body]");
    const st = body
      ? ScrollTrigger.create({
          trigger: body,
          start: "top 40%",
          end: "bottom 60%",
          onUpdate: (self) => setProgress(self.progress),
        })
      : undefined;

    return () => {
      observer.disconnect();
      st?.kill();
    };
  }, [stages]);

  return { active, progress };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Desktop: the sticky stage list with a track that fills as you read. */
export function BuildRail({ stages }: { stages: Stage[] }) {
  const { active, progress } = useBuild(stages);

  return (
    <nav aria-label="Case study sections" className="relative">
      <p className="label">Build sequence</p>
      <ol className="relative mt-5">
        {/* Track and its fill, behind the stage markers */}
        <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-rule" />
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-3 w-px origin-top bg-accent"
          style={{ bottom: "0.75rem", transform: `scaleY(${progress})` }}
        />
        {stages.map((stage, i) => {
          const state = i < active ? "done" : i === active ? "current" : "next";
          return (
            <li key={stage.id}>
              <a
                href={`#${stage.id}`}
                aria-current={state === "current" ? "step" : undefined}
                className="group relative grid grid-cols-[11px_1fr] items-start gap-x-4 py-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative mt-[0.4rem] size-[11px] rounded-full border transition-colors duration-300",
                    state === "next" ? "border-rule-strong bg-paper" : "border-accent",
                    state === "done" && "bg-accent",
                    state === "current" && "bg-paper ring-4 ring-accent-wash",
                  )}
                />
                <span
                  className={cn(
                    "text-sm leading-snug transition-colors",
                    state === "current" ? "text-ink" : state === "done" ? "text-ink-muted" : "text-ink-faint",
                    "group-hover:text-accent",
                  )}
                >
                  <span className="mr-2 font-mono text-xs tabular-nums">{pad(i + 1)}</span>
                  {stage.heading}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Phone: a compact sticky bar under the header with the current stage. */
export function BuildBar({ stages }: { stages: Stage[] }) {
  const { active, progress } = useBuild(stages);

  // Duplicates the section headings for sighted readers; headings stay the
  // way to navigate for assistive tech.
  return (
    <div
      aria-hidden="true"
      // Solid, not translucent: large headings scrolling underneath would
      // otherwise show through the stage name wherever blur isn't rendered.
      className="sticky top-16 z-40 border-b border-rule bg-paper md:hidden"
    >
      <div className="shell flex items-center gap-3 py-3">
        <span className="label shrink-0 tabular-nums text-accent">
          {pad(active + 1)} / {pad(stages.length)}
        </span>
        <span className="truncate text-sm text-ink">{stages[active]?.heading}</span>
      </div>
      <span
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
