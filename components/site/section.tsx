import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeader({
  label,
  title,
  link,
}: {
  label: string;
  title: string;
  link?: { label: string; href: string };
}) {
  return (
    <div
      data-section-head
      className="relative flex flex-wrap items-end justify-between gap-4 pb-5"
    >
      {/* Hairline is an element, not a border, so it can draw in on scroll */}
      <span
        data-rule
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-rule"
      />
      {/* Accent scan line: sweeps down the header, uncovering it, and hands
          off to the hairline. Invisible unless PageMotion runs it. */}
      <span
        data-scan
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-accent opacity-0"
      />
      <div data-wipe>
        <p className="eyebrow">{label}</p>
        <h2 className="mt-5 font-display text-title text-ink">{title}</h2>
      </div>
      {link && (
        <Link
          data-wipe
          href={link.href}
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <span className="link-rule">{link.label}</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`shell py-20 md:py-28 ${className}`}>{children}</section>
  );
}
