import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SpotlightLink } from "@/components/site/spotlight-link";
import { Hero } from "@/components/site/hero";
import { Skills } from "@/components/site/skills";
import { Section, SectionHeader } from "@/components/site/section";
import { featuredProjects } from "@/lib/content/projects";
import { experience } from "@/lib/content/experience";
import { site } from "@/lib/site";

/** Asymmetric 6-column bento: lead card runs wide, the rest share the row */
function bentoSpan(count: number, i: number) {
  if (count === 2) return i === 0 ? "md:col-span-4" : "md:col-span-2";
  return i === 0 ? "md:col-span-6" : "md:col-span-3";
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* -------------------------------------------------------- Selected work */}
      <Section>
        <SectionHeader
          label="Selected work"
          title="Systems, not screenshots"
          link={{ label: "All work", href: "/work" }}
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-6">
          {featuredProjects.map((project, i) => (
            <li
              data-reveal
              key={project.slug}
              className={bentoSpan(featuredProjects.length, i)}
            >
              <SpotlightLink
                href={`/work/${project.slug}`}
                className={`surface group flex h-full flex-col p-7 md:p-9 ${i === 0 ? "md:min-h-[17rem]" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="label">
                    {String(i + 1).padStart(2, "0")} / {project.year}
                  </span>
                  <ArrowUpRight className="size-5 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>

                <h3
                  className={`mt-10 font-display text-ink transition-colors group-hover:text-accent ${i === 0 ? "text-title" : "text-heading"}`}
                >
                  {project.name}
                </h3>
                <p className="mt-3 max-w-2xl text-ink-muted">{project.tagline}</p>

                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-8">
                  {project.stack.slice(0, 6).map((tech) => (
                    <li key={tech} className="label">
                      {tech}
                    </li>
                  ))}
                </ul>
              </SpotlightLink>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------- Experience */}
      <Section className="border-t border-rule">
        <SectionHeader
          label="Experience"
          title="Where I've shipped"
          link={{ label: "More about me", href: "/about" }}
        />

        <ul className="mt-2">
          {experience.map((role) => (
            <li data-reveal key={role.company}>
              <div className="grid gap-2 border-b border-rule py-8 md:grid-cols-[1fr_2fr] md:gap-10">
                <div>
                  <h3 className="font-display text-xl tracking-tight text-ink">
                    {role.company}
                  </h3>
                  <p className="label mt-2">{role.period}</p>
                </div>
                <div>
                  <p className="font-medium text-ink">{role.role}</p>
                  <p className="mt-1 text-sm text-ink-muted">{role.context}</p>
                  <p className="mt-4 max-w-2xl text-ink-muted">
                    {role.points[0]}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------------- Skills */}
      <Section className="border-t border-rule">
        <SectionHeader label="Toolkit" title="What I work with" />

        <Skills />
      </Section>

      {/* ----------------------------------------------------------------- CTA */}
      <Section className="border-t border-rule">
        <div data-reveal>
          <p className="eyebrow">Next</p>
          <h2 className="mt-6 max-w-[18ch] font-display text-title text-ink">
            Hiring, or have something to build?
          </h2>
          <p className="mt-6 max-w-xl text-lead text-ink-muted">
            I&apos;m open to full-time roles and selective freelance work. The
            fastest way to reach me is email. I reply to everything.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 btn rounded-md bg-ink px-6 py-3.5 text-sm text-paper hover:bg-accent"
            >
              Start a conversation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="link-rule text-sm text-ink-muted hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
