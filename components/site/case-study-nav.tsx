"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-synced index for long case studies. Lives in the sticky spec column,
 * which is otherwise empty below the facts on tall pages.
 */
export function CaseStudyNav({
  sections,
}: {
  sections: { id: string; heading: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry nearest the top of the viewport that is on screen,
        // so the highlight tracks reading position rather than intersection order.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 3) return null;

  return (
    <nav aria-label="Sections" className="mt-10 border-t border-rule pt-3">
      <p className="label">Contents</p>
      <ol className="mt-4 space-y-1">
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "block border-l py-1.5 pl-4 text-sm transition-colors",
                  current
                    ? "border-accent text-accent"
                    : "border-rule text-ink-muted hover:border-ink-faint hover:text-ink",
                )}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
