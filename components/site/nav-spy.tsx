"use client";

import { useEffect } from "react";

/** Marks the nav link for the section in view with aria-current="true" */
export function NavSpy() {
  useEffect(() => {
    const ids = ["work", "experience", "toolkit", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const mark = (id: string | null) => {
      document.querySelectorAll<HTMLAnchorElement>("header nav a[href^='#']").forEach((a) => {
        if (a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) mark(hit.target.id);
        else if (window.scrollY < 200) mark(null);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.01, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
