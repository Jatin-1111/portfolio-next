import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Rise } from "@/components/site/rise";
import { SystemMorph } from "@/components/site/system-morph";
import { experience } from "@/lib/content/experience";
import { site } from "@/lib/site";

/**
 * One word of the headline: masked, then lifted into place by CSS.
 *
 * Words arrive in spoken phrase groups ("I build / web systems / that hold up /
 * in production."). Each word keeps its own mask so the headline still wraps
 * naturally on a phone. CSS rather than GSAP so the headline (the LCP element)
 * paints with the server HTML instead of waiting for hydration.
 */
function Word({
  phrase,
  i = 0,
  children,
}: {
  phrase: number;
  i?: number;
  children: ReactNode;
}) {
  return (
    <span className="word-mask">
      <span
        className="word"
        style={{ animationDelay: `${0.1 + phrase * 0.15 + i * 0.04}s` }}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Home hero. Left: the claim, the evidence in one paragraph, the two actions
 * and the current role. Right: one object that morphs through a single payment's
 * path through a system I lead, so the claim is shown rather than only stated.
 */
export function Hero() {
  const current = experience[0];

  return (
    <section
      data-hero
      className="shell relative isolate pb-16 pt-14 md:pb-24 md:pt-24"
    >
      <span
        data-rule
        aria-hidden="true"
        className="absolute inset-x-6 bottom-0 h-px bg-rule md:inset-x-10"
      />

      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Rise>
            {/* Two deliberate lines: availability, then role and city */}
            <p className="label grid grid-cols-[0.5rem_1fr] items-center gap-x-3 gap-y-2.5">
              <span className="status-dot" aria-hidden="true" />
              <span>Open to roles and select freelance work</span>
              <span data-type className="col-start-2 inline-block justify-self-start">
                {site.role}, {site.location}
              </span>
            </p>
          </Rise>

          <h1
            data-hero-title
            aria-label="I build web systems that hold up in production."
            className="mt-7 max-w-[13ch] font-display text-[clamp(3rem,7.4vw,5.75rem)] font-normal leading-[0.95] tracking-[-0.035em] text-ink"
          >
            <span aria-hidden="true">
              <Word phrase={0}>I</Word> <Word phrase={0} i={1}>build</Word>{" "}
              <Word phrase={1}>web</Word> <Word phrase={1} i={1}>systems</Word>{" "}
              <Word phrase={2}>that</Word>{" "}
              <span className="em-serif relative inline-block">
                <Word phrase={2} i={1}>hold</Word>{" "}
                <Word phrase={2} i={2}>up</Word>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  className="absolute -bottom-[0.06em] left-0 h-auto w-full overflow-visible"
                >
                  <path
                    data-hero-underline
                    pathLength={1}
                    d="M2 8 C 40 2, 80 11, 120 6 S 180 4, 198 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              <Word phrase={3}>in</Word>{" "}
              <Word phrase={3} i={1}>production.</Word>
            </span>
          </h1>

          <Rise delay={0.12}>
            <p className="mt-8 max-w-xl text-lead text-ink-muted">
              Full-stack developer with a year of shipping production software:
              payments over webhooks, real-time features, background job queues,
              role-based access control and cloud deployment. I&apos;ve owned
              projects end to end across freelance, part-time and team-lead
              roles.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="group btn inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm text-paper hover:bg-accent"
              >
                View selected work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={site.resume}
                download
                type="application/pdf"
                className="btn inline-flex items-center gap-2 rounded-md border border-rule-strong px-6 py-3.5 text-sm text-ink hover:border-ink"
              >
                <Download className="size-4" />
                Résumé
                <span className="label">PDF</span>
              </a>
            </div>

            {/* Currently: the strongest single credential, standing on the
                "floor" rule that draws in once the headline has landed */}
            <div className="relative mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-1 pt-5">
              <span
                data-hero-rule
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-rule-strong"
              />
              <span className="subhead">Currently</span>
              <span className="text-ink">
                {current.role},{" "}
                <a
                  href={current.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-accent"
                >
                  <span className="link-rule">{current.company}</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </span>
              <span className="label">{current.period}</span>
            </div>
          </Rise>
        </div>

        <div data-hero-card className="lg:col-span-5">
          <SystemMorph />
        </div>
      </div>
    </section>
  );
}
