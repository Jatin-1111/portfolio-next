"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { settle } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/**
 * Motion for every page. Renders nothing; it finds elements by data attribute
 * so pages stay server components. Re-runs on each route change.
 *
 * Direction, adapted from motion-graphics prompts in awesome-opus5-5-videos:
 *  - "One pencil line" showreel: one critically damped ease with no bounce,
 *    and scene changes made by a single horizontal scan line, not crossfades.
 *  - "Build the floor" kinetic type: the headline arrives in spoken phrase
 *    groups (CSS, see components/site/hero.tsx), holds still for 400ms, then
 *    the line it stands on is drawn.
 *  - "One shape, never cut" UI motion: the hero's system illustration, in
 *    components/site/system-morph.tsx.
 *  - "make it catchy." paper film: the small mono label types itself out.
 *
 * Rules:
 *  - Hero text is never hidden waiting for JS; the headline and copy animate
 *    in CSS from first paint. GSAP only draws decoration around them.
 *  - Every tween outside the hero intro is under one second.
 *  - Everything lives inside gsap.matchMedia for "no-preference". Under
 *    prefers-reduced-motion nothing is registered and the page is static.
 */
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(document.body);
      gsap.defaults({ ease: settle });

      /* ---------------------------------------------------------------- Hero
         The only part allowed past one second. Timed from first paint: the
         timeline is synced to the CSS headline animation's clock, so a slow
         hydration doesn't replay the grid after the words have landed. */
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      let follow: (() => void) | undefined;
      if (hero) {
        const intro = gsap.timeline();

        // 0.35s: the role and city type themselves out, one step per letter.
        q("[data-type]").forEach((el) => {
          const steps = Math.max(1, el.textContent?.length ?? 1);
          intro.to(el, { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: `steps(${steps})` }, 0.35);
        });

        // 1.75s: the headline has landed (~1.34s) and held still for 400ms.
        // Now draw what it stands on: the floor rule and the underline.
        intro
          .to(q("[data-hero-rule]"), { scaleX: 1, duration: 0.9 }, 1.75)
          .to(q("[data-hero-underline]"), { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, 1.75);

        // Follow the last headline word's CSS clock while it runs, so the two
        // can never drift (slow hydration, a background tab). Once it has
        // finished, run free from where the headline landed: a late hydration
        // skips the label typing, but the floor is always drawn in front of
        // the reader. The system illustration runs itself (SystemMorph).
        const words = document.querySelectorAll(".word");
        const clock = words[words.length - 1]?.getAnimations()[0];
        const LANDED = 1.34;
        intro.pause();
        follow = () => {
          const ct = clock?.currentTime;
          const t = typeof ct === "number" ? ct / 1000 : 0;
          if (clock?.playState === "running") {
            intro.time(t);
            return;
          }
          gsap.ticker.remove(follow!);
          intro.time(Math.min(Math.max(intro.time(), t), LANDED)).play();
        };
        gsap.ticker.add(follow);
        follow();

        /* Exit: the layers leave at different speeds while the camera stays
           locked. The headline only moves; it never fades, so it stays
           readable for as long as it is on screen. */
        const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-title]"), { yPercent: -6, ease: "none", scrollTrigger: scrub });
        gsap.to(q("[data-hero-card]"), { y: 36, ease: "none", scrollTrigger: scrub });
      }

      /* ------------------------------------------------- Section transitions */

      // Section headers: an accent scan line sweeps down and uncovers the
      // heading behind a hard edge, then hands off to the grey hairline.
      // 0.55s sweep + 0.35s hand-off = 0.9s.
      q("[data-section-head]").forEach((head) => {
        const scan = head.querySelector("[data-scan]");
        const rule = head.querySelector("[data-rule]");
        const wipe = head.querySelectorAll("[data-wipe]");

        gsap
          .timeline({ scrollTrigger: { trigger: head, start: "top 85%", once: true } })
          .set(scan, { opacity: 1 })
          .fromTo(
            scan,
            { y: 0 },
            { y: () => head.offsetHeight - 1, duration: 0.55, ease: "expo.inOut" },
            0,
          )
          .from(
            wipe,
            { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "expo.inOut", clearProps: "clipPath" },
            0,
          )
          .from(rule, { scaleX: 0, transformOrigin: "left center", duration: 0.35 }, 0.55)
          .to(scan, { scaleX: 0, transformOrigin: "right center", duration: 0.35, ease: "expo.in" }, 0.55)
          .set(scan, { opacity: 0 });
      });

      // Other hairlines draw across as they arrive.
      q("[data-rule]").forEach((el) => {
        if (el.closest("[data-section-head]")) return;
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Standalone headings lift out of a clip, like type from under a rule.
      q("[data-mask]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          y: 28,
          duration: 0.85,
          clearProps: "clipPath,transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Case-study diagrams build themselves in stages, after the "house that
      // builds itself" prompt: foundation (components), structure (solid
      // connectors draw along their length), then systems (dashed paths and
      // annotations). 0.95s end to end. Inline styles are cleared afterwards
      // so hover and X-ray mode (CSS) take over.
      q("[data-diagram]").forEach((svg) => {
        // Plain arrays, not NodeLists: GSAP passes an empty NodeList nested in
        // a target array through as a target itself and then throws on it
        // (some diagrams have no dashed connectors).
        const all = (sel: string) => [...svg.querySelectorAll<SVGElement>(sel)];
        const nodes = all(":scope > g");
        const solid = all(":scope > line:not([stroke-dasharray]), :scope > path:not([stroke-dasharray])");
        const dashed = all(":scope > line[stroke-dasharray], :scope > path[stroke-dasharray]");
        const labels = all(":scope > text");
        const faded = [...nodes, ...dashed, ...labels];
        if (!faded.length && !solid.length) return;
        gsap.set(faded, { opacity: 0 });
        gsap.set(nodes, { y: 8 });
        gsap.set(solid, { drawSVG: "0%" });
        gsap
          .timeline({
            scrollTrigger: { trigger: svg, start: "top 82%", once: true },
            onComplete: () => {
              gsap.set(faded, { clearProps: "opacity,transform" });
              gsap.set(solid, { clearProps: "strokeDasharray,strokeDashoffset" });
            },
          })
          .to(nodes, { opacity: 1, y: 0, duration: 0.4, stagger: { amount: 0.25 } }, 0)
          .to(solid, { drawSVG: "100%", duration: 0.45, ease: "power2.inOut", stagger: { amount: 0.2 } }, 0.25)
          .to([...dashed, ...labels], { opacity: 1, duration: 0.3, stagger: { amount: 0.15 } }, 0.5);
      });

      // Cards and rows rise in, staggered in reading order when they arrive together.
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
              stagger: 0.08,
              overwrite: true,
              clearProps: "transform",
            }),
        });
      }

      return () => {
        if (follow) gsap.ticker.remove(follow);
        gsap.defaults({ ease: "power1.out" });
      };
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
