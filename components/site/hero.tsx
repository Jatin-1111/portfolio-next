import { ArrowRight, Download } from "lucide-react";
import { Section } from "./section";
import { SystemDiagram } from "./system-diagram";
import { experience } from "@/lib/content/experience";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <Section
      id="hero"
      tag="<Hero />"
      className="pt-28 md:pt-36 lg:flex lg:min-h-[min(100svh,70rem)] lg:items-center"
    >
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p
            data-b="tags"
            data-fx="rise"
            className="label flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="status-dot" aria-hidden="true" />
            <span>Open to roles and select freelance work</span>
            <span className="text-fg-faint/70">
              · {site.role}, {site.location}
            </span>
          </p>

          <h1
            data-b="headline"
            data-fx="words"
            className="mt-7 max-w-[13ch] font-display text-[clamp(3rem,7.4vw,5.75rem)] font-normal leading-[0.95] tracking-[-0.035em] text-fg"
          >
            I build web systems that{" "}
            <span className="em-serif relative inline-block">
              hold up
              <svg
                data-b="polish"
                data-fx="draw"
                aria-hidden="true"
                viewBox="0 0 200 12"
                className="absolute -bottom-[0.06em] left-0 h-auto w-full overflow-visible"
              >
                <path
                  pathLength={1}
                  d="M2 8 C 40 2, 80 11, 120 6 S 180 4, 198 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            in production.
          </h1>

          <p
            data-b="copy"
            data-fx="words"
            className="mt-8 max-w-xl text-lead text-fg-muted"
          >
            Full-stack developer shipping production software since 2025:
            payments over webhooks, real-time features, background job queues,
            role-based access control and cloud deployment. I&apos;ve owned
            projects end to end across freelance, part-time and team-lead roles.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              data-b="polish"
              data-fx="pop"
              className="group btn inline-flex items-center gap-2 rounded-md bg-fg px-6 py-3.5 text-sm text-bg hover:bg-accent"
            >
              View selected work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={site.resume}
              data-b="polish"
              data-fx="pop"
              className="group btn inline-flex items-center gap-2 rounded-md border border-line-strong px-6 py-3.5 text-sm text-fg hover:border-fg"
            >
              <Download className="size-4" />
              Download resume
            </a>
          </div>

          <ul
            data-b="timeline"
            data-fx="items"
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <li className="label">Shipped for</li>
            {experience.map((role) => (
              <li key={role.company} className="text-sm text-fg-muted">
                {role.company}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <SystemDiagram />
        </div>
      </div>
    </Section>
  );
}
