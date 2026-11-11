import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Section, SectionHead } from "./section";
import { projects } from "@/lib/content/projects";

function span(i: number) {
  return i === 0 ? "md:col-span-6" : "md:col-span-3";
}

export function Work() {
  return (
    <Section id="work" tag="<SelectedWork />">
      <SectionHead label="Selected work" title="Systems, not screenshots" />

      <ul className="mt-12 grid gap-5 md:grid-cols-6">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            data-b="cards"
            data-fx="pop"
            className={`surface relative flex flex-col p-7 md:p-9 ${span(i)} ${i === 0 ? "md:min-h-[17rem]" : ""}`}
          >
            <span
              data-b="diagram"
              data-fx="line"
              aria-hidden="true"
              className="absolute left-7 top-0 h-0.5 w-14 bg-accent md:left-9"
            />

            <div className="flex items-start justify-between gap-4">
              <span className="label">
                {String(i + 1).padStart(2, "0")} / {project.year}
              </span>
              <span className="label">{project.role}</span>
            </div>

            <h3
              data-b="headline"
              data-fx="words"
              className={`mt-10 font-display text-fg ${i === 0 ? "text-title" : "text-heading"}`}
            >
              {project.name}
            </h3>
            <p
              data-b="copy"
              data-fx="words"
              className="mt-3 max-w-2xl text-fg-muted"
            >
              {project.tagline}
            </p>

            <ul
              data-b="tags"
              data-fx="items"
              className="mt-auto flex flex-wrap gap-2 pt-8"
            >
              {project.stack.slice(0, 6).map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>

            <details className="group mt-6 border-t border-line pt-1">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm text-fg transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                More detail
                <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {project.summary}
              </p>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
                {project.facts.map((fact) => (
                  <div key={fact.label} className="contents">
                    <dt className="label pt-0.5">{fact.label}</dt>
                    <dd className="text-fg-muted">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </details>

            {project.links.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-x-5">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule inline-flex min-h-11 items-center gap-1 text-sm text-fg-muted hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
