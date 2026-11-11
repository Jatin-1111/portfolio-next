"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A small accent dot that travels the hero diagram's edges in a loop, so the
 * finished page still looks alive. It waits for the build-up to finish (while
 * html has the `build` class it stays hidden).
 */
export function DiagramPacket({
  route,
}: {
  /** One entry per edge: x, start y, end y */
  route: { x: number; y0: number; y1: number }[];
}) {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    const root = document.documentElement;
    let tl: gsap.core.Timeline | null = null;

    const stop = () => {
      tl?.kill();
      tl = null;
      gsap.set(dot, { autoAlpha: 0 });
    };

    const start = () => {
      stop();
      tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      route.forEach((e, i) => {
        tl!.set(dot, { attr: { cx: e.x, cy: e.y0 }, autoAlpha: 1 });
        tl!.to(dot, { attr: { cy: e.y1 }, duration: 0.55, ease: "power1.inOut" });
        if (i < route.length - 1) tl!.to({}, { duration: 0.25 });
      });
      tl.to(dot, { autoAlpha: 0, duration: 0.3 });
    };

    const sync = () => (root.classList.contains("build") ? stop() : start());
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mo.disconnect();
      tl?.kill();
    };
  }, [route]);

  return (
    <circle
      ref={ref}
      r="3.5"
      fill="var(--color-accent)"
      opacity="0"
      aria-hidden="true"
    />
  );
}
