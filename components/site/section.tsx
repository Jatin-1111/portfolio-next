import type { ReactNode } from "react";

/**
 * One section of the single page. While the build-up intro runs, the dashed
 * outline (and its component tag) is what the Layout cursor drags out first;
 * at rest it is display:none.
 */
export function Section({
  id,
  tag,
  children,
  className = "",
  background,
}: {
  id: string;
  tag: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed layer behind the section content */
  background?: ReactNode;
}) {
  return (
    <section id={id} data-section={id} className="relative">
      {background}
      <div className={`shell relative py-14 md:py-20 ${className}`}>
        <span
          className="frame-outline"
          data-b="layout"
          data-fx="frame"
          aria-hidden="true"
        >
          <span className="frame-tag">{tag}</span>
        </span>
        <div className="relative w-full">{children}</div>
      </div>
    </section>
  );
}

export function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <header>
      <p
        data-b="copy"
        data-fx="rise"
        className="eyebrow"
      >
        {label}
      </p>
      <h2
        data-b="headline"
        data-fx="words"
        className="mt-6 max-w-[20ch] font-display text-title text-fg"
      >
        {title}
      </h2>
    </header>
  );
}
