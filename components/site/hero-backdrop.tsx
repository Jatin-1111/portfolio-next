"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Hero background: a photo of code on a dark monitor, darkened (no colour
 * grade, so it keeps its own teal, orange and red), with a heavy fade on the
 * left where the headline sits and a fade into the page at the bottom.
 *
 * The lighting effect is a neutral flashlight: a second, brighter copy of the
 * photo shows through a soft circle that follows the pointer. It is plain CSS
 * (a mask whose centre is two custom properties), so there is no WebGL here.
 *
 * Hidden while the build-up intro runs and faded in when it finishes (see
 * `html.build .hero-backdrop` in globals.css).
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    let raf = 0;
    let x = -9999;
    let y = -9999;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      x = -9999;
      y = -9999;
      apply();
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        src="/hero-bg-source.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="hero-bg-dim object-cover"
      />
      <div className="hero-scrim absolute inset-0" />
      <Image
        src="/hero-bg-source.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        className="hero-bg-lit object-cover"
      />
    </div>
  );
}
