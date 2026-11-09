"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

const ACCENT = '[stroke="var(--color-accent)"]';
/** The whole trace runs in under a second, however many hops the flow has. */
const TRACE_SECONDS = 0.9;

type Point = [number, number];

/** Points of a connector: a <line>, or a <path> made only of M/L commands. */
function pointsOf(el: SVGElement): Point[] {
  if (el.tagName === "line") {
    const n = (a: string) => Number(el.getAttribute(a));
    return [
      [n("x1"), n("y1")],
      [n("x2"), n("y2")],
    ];
  }
  const nums = (el.getAttribute("d") ?? "").match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const pts: Point[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
  return pts;
}

const dist = (a: Point, b: Point) => Math.hypot(b[0] - a[0], b[1] - a[1]);

/**
 * X-ray mode for an architecture diagram, after the "house that builds itself"
 * prompt in awesome-opus5-5-videos, whose X-ray view shows the routes behind
 * the walls. On: everything off the critical path dims, and a dot runs the
 * accent connectors in order, so the flow reads at a glance. Off: back to the
 * full drawing. Under reduced motion the dimming still works; the dot does not.
 */
export function XrayToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  const [on, setOn] = useState(false);

  const toggle = () => {
    const svg = ref.current
      ?.closest("figure")
      ?.querySelector<SVGSVGElement>("[data-diagram]");
    if (!svg) return;

    const next = !on;
    setOn(next);
    svg.classList.add("xray-armed");
    svg.classList.toggle("is-xray", next);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (next && !reduce) trace(svg);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className="label inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-rule-strong px-3 py-2 text-ink-muted transition-colors hover:border-ink hover:text-ink aria-pressed:border-accent aria-pressed:text-accent"
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${on ? "bg-accent" : "bg-ink-faint"}`}
      />
      {on ? "X-ray on" : "X-ray: trace the flow"}
    </button>
  );
}

function trace(svg: SVGSVGElement) {
  const routes = [...svg.querySelectorAll<SVGElement>(`:scope > line${ACCENT}, :scope > path${ACCENT}`)]
    .map(pointsOf)
    .filter((pts) => pts.length > 1);
  if (!routes.length) return;

  let dot = svg.querySelector<SVGCircleElement>("[data-trace-dot]");
  if (!dot) {
    dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("data-trace-dot", "");
    dot.setAttribute("r", "4.5");
    dot.setAttribute("fill", "var(--color-accent)");
    svg.appendChild(dot);
  }

  const total = routes.reduce(
    (sum, pts) => sum + pts.slice(1).reduce((s, p, i) => s + dist(pts[i], p), 0),
    0,
  );

  gsap.killTweensOf(dot);
  const tl = gsap.timeline({ onComplete: () => gsap.set(dot, { opacity: 0 }) });
  routes.forEach((pts) => {
    tl.set(dot, { attr: { cx: pts[0][0], cy: pts[0][1] }, opacity: 1 });
    pts.slice(1).forEach((p, i) => {
      tl.to(dot, {
        attr: { cx: p[0], cy: p[1] },
        duration: (TRACE_SECONDS * dist(pts[i], p)) / total,
        ease: "none",
      });
    });
  });
}
