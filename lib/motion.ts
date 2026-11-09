/**
 * Critically damped spring, 1 - (1 + wt)e^(-wt), normalised to land on 1.
 *
 * Borrowed from the "one pencil line" showreel prompt in awesome-opus5-5-videos:
 * things settle fast and never pass their target, so there is no bounce and
 * no overshoot. Used as the default GSAP ease for the site.
 */
const W = 9;
const END = 1 - (1 + W) * Math.exp(-W);

export function settle(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return (1 - (1 + W * t) * Math.exp(-W * t)) / END;
}

/** Same feel in CSS terms, for animations that must run before hydration. */
export const SETTLE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
