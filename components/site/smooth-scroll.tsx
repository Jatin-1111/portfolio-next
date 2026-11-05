"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position are always updated on the same frame.
 *
 * Skipped entirely under prefers-reduced-motion: those users keep native
 * scrolling, which is also what they expect from their OS.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown: (() => void) | undefined;

    const start = () => {
      teardown?.();
      teardown = undefined;
      if (query.matches) return;

      const lenis = new Lenis();
      instance = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      teardown = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        instance = null;
      };
    };

    start();
    query.addEventListener("change", start);

    // Web fonts change line breaks, which moves every trigger position.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      query.removeEventListener("change", start);
      teardown?.();
    };
  }, []);

  // New route: start at the top without an animated glide.
  useEffect(() => {
    instance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
