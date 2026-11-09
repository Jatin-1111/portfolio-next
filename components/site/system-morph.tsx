"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { settle } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Seconds each state rests on screen: long enough to read two short lines. */
const HOLD = 2.6;
/** Seconds one morph takes, out and in. Under the one-second rule. */
const STEP = 0.9;
const COUNT = 6;

/**
 * One payment's path through the PowerMySport architecture, told by a single
 * shape that never cuts: it morphs size, radius and content from state to
 * state. Adapted from the "one shape, never cut" UI-motion prompts in
 * awesome-opus5-5-videos, with a dot that expands into the first bar as the
 * opening beat.
 *
 * Every line is taken from the public case study (lib/content/projects.ts):
 * architecture only, no figures, no proprietary code.
 *
 * Without JS, or under prefers-reduced-motion, the same markup renders as a
 * static stacked log of all six steps (see .morph in globals.css). Motion mode
 * is opted into before first paint by the "motion" class on <html>.
 */
export function SystemMorph() {
  const root = useRef<HTMLDivElement>(null);
  const setHold = useRef<(reason: string, on: boolean) => void>(() => {});
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setHold.current("user", paused);
  }, [paused]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const stage = el.querySelector<HTMLElement>("[data-stage]")!;
      const shell = el.querySelector<HTMLElement>("[data-shell]")!;
      const states = [...el.querySelectorAll<HTMLElement>("[data-state]")];

      let sizes = states.map((s) => ({ w: s.offsetWidth, h: s.offsetHeight }));
      const radius = (i: number) =>
        states[i].dataset.shape === "pill" ? sizes[i].h / 2 : 18;
      const fitStage = () =>
        gsap.set(stage, { height: Math.max(288, ...sizes.map((s) => s.h + 96)) });
      fitStage();

      gsap.set(states, { autoAlpha: 0, filter: "blur(0px)" });

      /* The loop: hold, then morph to the next state. The last step lands
         back on the first state, so the loop is seamless. */
      const loop = gsap.timeline({ paused: true, repeat: -1 });
      for (let a = 0; a < COUNT; a++) {
        const b = (a + 1) % COUNT;
        const at = HOLD + a * (HOLD + STEP);
        const rows = states[b].querySelectorAll("[data-row]");
        const bar = states[b].querySelector("[data-bar]");

        loop
          .fromTo(
            states[a],
            { autoAlpha: 1, filter: "blur(0px)", y: 0 },
            { autoAlpha: 0, filter: "blur(6px)", y: -4, duration: 0.2, ease: "power1.in", immediateRender: false },
            at,
          )
          .fromTo(
            shell,
            { width: () => sizes[a].w, height: () => sizes[a].h, borderRadius: () => radius(a) },
            {
              width: () => sizes[b].w,
              height: () => sizes[b].h,
              borderRadius: () => radius(b),
              duration: 0.65,
              ease: settle,
              immediateRender: false,
            },
            at + 0.08,
          )
          .fromTo(
            states[b],
            { autoAlpha: 0, filter: "blur(6px)", y: 6 },
            { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.32, ease: "power2.out", immediateRender: false },
            at + 0.36,
          )
          .call(() => setIndex(b), [], at + 0.36);

        // Details settle in order once the shape has its size.
        if (rows.length) {
          loop.fromTo(
            rows,
            { autoAlpha: 0, y: 6 },
            { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out", immediateRender: false },
            at + 0.42,
          );
        }
        if (bar) {
          loop.fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power2.inOut", immediateRender: false },
            at + 0.45,
          );
        }
      }

      /* Opening beat: the accent dot painted by CSS before hydration grows
         into the first bar, then the loop takes over. */
      let started = false;
      const intro = gsap.timeline({
        paused: true,
        onComplete: () => {
          started = true;
          apply();
        },
      });
      intro
        .to(shell, {
          width: () => sizes[0].w,
          height: () => sizes[0].h,
          borderRadius: () => radius(0),
          backgroundColor: "#16140f", // --color-ink; GSAP can't tween var()
          duration: 0.8,
          ease: settle,
        })
        .fromTo(
          states[0],
          { autoAlpha: 0, filter: "blur(6px)", y: 6 },
          { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 0.35, ease: "power2.out" },
          0.4,
        );

      /* Pausing: the loop stops while it is off screen, while the pointer or
         keyboard focus is on it, or when the visitor presses Pause. */
      const holds = new Set<string>();
      const apply = () => {
        if (!started) return;
        if (holds.size) loop.pause();
        else loop.play();
      };
      setHold.current = (reason, on) => {
        if (on) holds.add(reason);
        else holds.delete(reason);
        apply();
      };
      setHold.current("user", paused);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setHold.current("offscreen", !self.isActive),
      });
      // Mouse only: on touch, a tap would pause it with no reliable "leave".
      const enter = (e: PointerEvent) => {
        if (e.pointerType === "mouse") setHold.current("hover", true);
      };
      const leave = () => setHold.current("hover", false);
      stage.addEventListener("pointerenter", enter);
      stage.addEventListener("pointerleave", leave);

      // Start once the headline has landed and held still for a beat.
      const words = document.querySelectorAll(".word");
      const headline = words[words.length - 1]?.getAnimations()[0];
      let cancelled = false;
      (headline?.finished ?? Promise.resolve())
        .catch(() => undefined)
        .then(() => {
          if (!cancelled) gsap.delayedCall(0.3, () => intro.play());
        });

      // Re-measure when the layout width changes (rotation, resize).
      const ro = new ResizeObserver(() => {
        sizes = states.map((s) => ({ w: s.offsetWidth, h: s.offsetHeight }));
        fitStage();
        loop.invalidate();
        intro.invalidate();
        if (started && !loop.isActive()) {
          const i = Math.round(loop.progress() * COUNT) % COUNT;
          gsap.set(shell, { width: sizes[i].w, height: sizes[i].h, borderRadius: radius(i) });
        }
      });
      ro.observe(stage);

      return () => {
        cancelled = true;
        ro.disconnect();
        st.kill();
        stage.removeEventListener("pointerenter", enter);
        stage.removeEventListener("pointerleave", leave);
        setHold.current = () => {};
        setIndex(0);
      };
    });

    return () => mm.revert();
    // Runs once per mount; pause state is pushed in through setHold.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="morph">
      <p className="sr-only">
        Illustration: one payment moving through a system I lead. A signed
        webhook arrives, is verified and de-duplicated, is processed by a
        background worker with retries, is pushed live to every server
        instance, is checked against role permissions, and ships in a
        commit-tagged container image.
      </p>

      <div data-stage aria-hidden="true" className="morph-stage">
        <div data-shell className="morph-shell">
          {/* 01: request arrives */}
          <div data-state data-shape="pill" className="morph-state flex items-center gap-3 px-5 py-3.5">
            <span className="morph-pulse" />
            <span className="font-mono text-sm text-paper">POST /webhooks/payment</span>
          </div>

          {/* 02: verified before trusted */}
          <div data-state data-shape="card" className="morph-state w-[19rem] p-6">
            <div data-row className="flex items-center justify-between font-mono text-xs text-on-ink-muted">
              <span>webhook</span>
              <span className="text-ok-on-ink">200 OK</span>
            </div>
            <p data-row className="mt-3 font-display text-2xl leading-tight text-paper">
              Verified before it&apos;s trusted
            </p>
            <ul className="mt-4 space-y-2 text-sm text-paper">
              <li data-row className="flex gap-2.5">
                <span className="text-ok-on-ink">✓</span> HMAC-SHA256 over the raw body
              </li>
              <li data-row className="flex gap-2.5">
                <span className="text-ok-on-ink">✓</span> New event id, so not a retry
              </li>
              <li data-row className="flex gap-2.5">
                <span className="text-accent-on-ink">→</span> Written to the outbox
              </li>
            </ul>
          </div>

          {/* 03: the worker */}
          <div data-state data-shape="card" className="morph-state w-[19rem] p-5">
            <div data-row className="flex items-center justify-between font-mono text-xs text-on-ink-muted">
              <span>outbox worker</span>
              <span>claimed atomically</span>
            </div>
            <div data-row className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper/10">
              <div data-bar className="h-full origin-left rounded-full bg-accent-on-ink" />
            </div>
            <p data-row className="mt-3 text-sm text-paper">
              Retries with backoff and jitter, up to six attempts
            </p>
          </div>

          {/* 04: real-time fan-out */}
          <div data-state data-shape="pill" className="morph-state flex items-center gap-3 px-5 py-3.5">
            <span className="morph-live" />
            <span className="font-mono text-sm text-paper">booking.updated</span>
            <span className="text-sm text-on-ink-muted">to every instance</span>
          </div>

          {/* 05: permissions */}
          <div data-state data-shape="card" className="morph-state w-[17rem] p-6">
            <p data-row className="font-mono text-xs text-on-ink-muted">admin role · support</p>
            <ul className="mt-4 space-y-2 text-sm text-paper">
              <li data-row className="flex gap-2.5">
                <span className="text-ok-on-ink">✓</span> View bookings
              </li>
              <li data-row className="flex gap-2.5">
                <span className="text-accent-on-ink">✕</span> Issue refunds
              </li>
            </ul>
            <p data-row className="mt-4 text-xs text-on-ink-muted">
              The UI hides it. The API decides.
            </p>
          </div>

          {/* 06: shipped */}
          <div data-state data-shape="pill" className="morph-state flex items-center gap-3 px-5 py-3.5">
            <span className="text-ok-on-ink">✓</span>
            <span className="text-sm text-paper">Shipped as an image tagged with its commit</span>
          </div>
        </div>
      </div>

      <div className="morph-controls label mt-4 items-center justify-between gap-4">
        <span>One payment, end to end</span>
        <span className="flex items-center gap-4">
          <span className="tabular-nums" aria-hidden="true">
            {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="link-rule text-ink-muted hover:text-ink"
          >
            {paused ? "Play" : "Pause"}
            <span className="sr-only"> the system illustration</span>
          </button>
        </span>
      </div>
    </div>
  );
}
