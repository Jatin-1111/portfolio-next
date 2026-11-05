"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion for every page. Renders nothing; it finds elements by data attribute
 * so pages stay server components. Re-runs on each route change.
 *
 * Principles:
 *  - Calm: one easing (power3.out), small distances, no bounce.
 *  - Nothing in the hero's text is ever hidden waiting for JS (see Rise and the
 *    CSS word reveal), so first paint and LCP are unaffected.
 *  - Every tween below the hero is under one second.
 *  - Everything lives inside gsap.matchMedia for "no-preference". Under
 *    prefers-reduced-motion nothing is registered, so no element is ever left
 *    in a hidden start state and the page is simply static.
 */
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(document.body);
      const ease = "power3.out";

      /* ---- Hero intro: the only part allowed to run past one second ---- */
      const intro = gsap.timeline({ defaults: { ease } });
      intro.from(q("[data-hero-rule]"), {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
      });

      // Hand-drawn accent underline: dasharray = path length, then draw the offset.
      q("[data-hero-underline]").forEach((el) => {
        const path = el as unknown as SVGGeometryElement;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        intro.to(path, { strokeDashoffset: 0, duration: 1.1 }, 0.9);
      });

      /* ---- Hero exit: content drifts at different speeds as it leaves ---- */
      const hero = document.querySelector("[data-hero]");
      if (hero) {
        const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-title]"), { yPercent: -8, opacity: 0.35, ease: "none", scrollTrigger: scrub });
        gsap.to(q("[data-hero-card]"), { y: 36, ease: "none", scrollTrigger: scrub });
      }

      /* ---- Section transitions ---- */
      // Hairlines draw across as a section arrives.
      q("[data-rule]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Headings lift out of a clip, like a line of type sliding from under a rule.
      q("[data-mask]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          y: 28,
          duration: 0.85,
          ease,
          clearProps: "clipPath,transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Case-study diagrams assemble: boxes, then connectors, then labels.
      q("[data-diagram]").forEach((svg) => {
        const nodes = svg.querySelectorAll(":scope > g");
        const links = svg.querySelectorAll(":scope > line, :scope > path");
        const labels = svg.querySelectorAll(":scope > text");
        gsap.set([nodes, links, labels], { opacity: 0 });
        gsap
          .timeline({
            defaults: { ease, duration: 0.5 },
            scrollTrigger: { trigger: svg, start: "top 85%", once: true },
          })
          .to(nodes, { opacity: 1, stagger: { amount: 0.35 } })
          .to(links, { opacity: 1, stagger: { amount: 0.25 } }, "-=0.25")
          .to(labels, { opacity: 1, stagger: { amount: 0.2 } }, "-=0.35");
      });

      // Cards and rows rise in together, staggered when they enter as a group.
      const items = q("[data-reveal]");
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 22 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease,
              stagger: 0.08,
              overwrite: true,
              clearProps: "transform",
            }),
        });
      }
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
