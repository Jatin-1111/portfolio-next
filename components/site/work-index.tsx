"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export type WorkItem = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  /** Heading of the case-study section the preview diagram comes from */
  previewHeading?: string;
};

/**
 * The work index: an editorial list on the left, and on wide screens a sticky
 * "X-ray" panel on the right that shows the architecture behind whichever row
 * is hovered or focused. Client work can't be shown as screenshots, so the
 * preview is the system itself, the same diagram the case study explains.
 *
 * Motion, adapted from awesome-opus5-5-videos:
 *  - Row entrance uses the exact timings from the "UI cards" GSAP prompt:
 *    280ms for the row, 220ms for the title, 160ms for metadata, 60ms stagger.
 *  - Switching previews is a hard-edged scan-line wipe, the site's scene
 *    change (no crossfades), 0.5s.
 * Under prefers-reduced-motion rows are static and previews swap instantly.
 */
export function WorkIndex({
  items,
  previews,
}: {
  items: WorkItem[];
  previews: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const shown = useRef(0);
  const listRef = useRef<HTMLOListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Row entrance */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-work-row]") ?? [];
      const tl = gsap.timeline({ delay: 0.15 });
      rows.forEach((row, i) => {
        const at = i * 0.06;
        tl.fromTo(row, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" }, at)
          .fromTo(row.querySelector("[data-work-title]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.22, ease: "power3.out" }, at + 0.06)
          .fromTo(row.querySelectorAll("[data-work-meta]"), { opacity: 0 }, { opacity: 1, duration: 0.16, ease: "none" }, at + 0.12);
      });
    });
    return () => mm.revert();
  }, []);

  /* Preview change: scan line sweeps down, the new drawing is uncovered behind it */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || active === shown.current) return;
    const frames = panel.querySelectorAll<HTMLElement>("[data-preview]");
    const scan = panel.querySelector<HTMLElement>("[data-preview-scan]");
    const from = frames[shown.current];
    const to = frames[active];
    shown.current = active;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf([...frames, scan]);
    frames.forEach((f) => {
      if (f !== from && f !== to) gsap.set(f, { visibility: "hidden", clipPath: "none" });
    });

    if (reduce) {
      gsap.set(from, { visibility: "hidden" });
      gsap.set(to, { visibility: "visible", clipPath: "none" });
      return;
    }

    gsap
      .timeline()
      .set(to, { visibility: "visible", zIndex: 2 })
      .set(from, { zIndex: 1 })
      .set(scan, { opacity: 1, top: 0 })
      .fromTo(to, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "expo.inOut" }, 0)
      .to(scan, { top: "100%", duration: 0.5, ease: "expo.inOut" }, 0)
      .set(from, { visibility: "hidden" })
      .set(scan, { opacity: 0 })
      .set(to, { clearProps: "clipPath,zIndex" });
  }, [active]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
      <ol ref={listRef} className="border-t border-rule lg:col-span-7">
        {items.map((item, i) => (
          <li key={item.slug} data-work-row className="work-row border-b border-rule">
            <Link
              href={`/work/${item.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative grid grid-cols-[2.5rem_1fr_auto] gap-x-4 py-9 md:grid-cols-[3.5rem_1fr_auto] md:py-11"
            >
              {/* Active marker: a short accent rule, not a colour change alone */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 h-px bg-accent transition-[width] duration-500 ${
                  active === i ? "w-16" : "w-0"
                }`}
              />
              <span data-work-meta className="label pt-3 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h2
                  data-work-title
                  className="font-display text-title text-ink transition-colors group-hover:text-accent"
                >
                  {item.name}
                </h2>
                <p data-work-meta className="mt-3 max-w-xl text-lead text-ink-muted">
                  {item.tagline}
                </p>
                <div data-work-meta className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  <span className="label leading-[1.45] text-ink">
                    {item.year} · {item.role}
                  </span>
                  {item.stack.slice(0, 5).map((tech) => (
                    <span key={tech} className="label leading-[1.45]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="mt-3 size-5 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </Link>
          </li>
        ))}
      </ol>

      {/* X-ray panel: decoration that mirrors the focused row, so hidden from AT */}
      <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow">X-ray</p>
            <p className="label tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
          </div>

          <div ref={panelRef} className="surface relative mt-5 overflow-hidden px-4 py-6">
            <div className="grid">
              {previews.map((preview, i) => (
                <div
                  key={items[i].slug}
                  data-preview
                  className="[grid-area:1/1] self-center"
                  style={{ visibility: i === 0 ? "visible" : "hidden" }}
                >
                  {preview}
                </div>
              ))}
            </div>
            <span
              data-preview-scan
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-accent opacity-0"
            />
          </div>

          <p className="mt-4 text-sm text-ink-faint">
            <span className="text-ink-muted">{items[active].name}</span>
            {items[active].previewHeading && <> · {items[active].previewHeading}</>}
            . The architecture, not a screenshot.
          </p>
        </div>
      </div>
    </div>
  );
}
