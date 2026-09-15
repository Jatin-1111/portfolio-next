"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The site's only motion primitive: a short, restrained rise-and-fade on enter.
 * Keeping every animation in one component is what stops motion from becoming
 * decoration applied inconsistently across pages.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  const transition = {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1],
  } as const;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={transition}
    >
      {children}
    </Component>
  );
}
