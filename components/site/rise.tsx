import type { ReactNode } from "react";

/**
 * Above-the-fold entrance animation, CSS-driven and server-rendered.
 *
 * The JS-driven equivalent (Reveal) renders at opacity 0 until React hydrates,
 * which measured ~2.9s of LCP render delay on the homepage — the text was in
 * the HTML immediately but invisible until hydration. A CSS animation starts at
 * first paint instead, so the content counts as painted right away.
 *
 * Scroll-triggered content below the fold still uses Reveal, where the observer
 * is the point.
 */
export function Rise({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header";
}) {
  return (
    <Tag
      className={className ? `rise ${className}` : "rise"}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
