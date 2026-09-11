import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";
import { featuredProjects } from "@/lib/content/projects";
import { experience, skills } from "@/lib/content/experience";
import { site } from "@/lib/site";

export default function HomePage() {
  const current = experience[0];

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="shell border-b border-rule pb-16 pt-20 md:pb-24 md:pt-32">
        <Reveal immediate>
          <p className="label">
            {site.role} · {site.location}
          </p>
        </Reveal>

        <Reveal delay={0.06} immediate>
          <h1 className="mt-8 max-w-[16ch] font-display text-display font-medium text-ink">
            I build web systems that hold up in production.
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-rule pt-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal delay={0.12} immediate>
            <p className="max-w-xl text-lead text-ink-muted">
              Full-stack developer with a year of shipping production software —
              payments over webhooks, real-time features, background job queues,
              role-based access control and cloud deployment. I&apos;ve owned
              projects end to end across freelance, part-time and team-lead
              roles.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-accent"
              >
                View selected work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 border border-rule-strong px-6 py-3.5 text-sm text-ink transition-colors hover:border-ink"
              >
                <Download className="size-4" />
                Résumé
              </a>
            </div>
          </Reveal>

          {/* Currently — the strongest single credential, given its own frame */}
          <Reveal delay={0.18} immediate>
            <div className="border-t border-ink pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="label">Currently</p>
              <p className="mt-4 font-display text-heading text-ink">
                {current.role}
              </p>
              <a
                href={current.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-1 inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-accent"
              >
                <span className="link-rule">{current.company}</span>
                <ArrowUpRight className="size-3.5" />
              </a>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                Leading engineering on a Turborepo monorepo of three Next.js
                applications over one shared TypeScript API — payments,
                bookings, real-time delivery and layered access control.
              </p>
              <p className="label mt-6">{current.period}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Selected work */}
      <Section>
        <SectionHeader
          label="Selected work"
          title="Systems, not screenshots"
          link={{ label: "All work", href: "/work" }}
        />

        <ul className="mt-2">
          {featuredProjects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.06}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid gap-4 border-b border-rule py-10 transition-colors hover:bg-paper-sunken md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10 md:px-4"
              >
                <span className="label pt-2 md:pt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-display text-heading text-ink transition-colors group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-ink-muted">
                    {project.tagline}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {project.stack.slice(0, 6).map((tech) => (
                      <li key={tech} className="label">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-4 md:pt-2">
                  <span className="label">{project.year}</span>
                  <ArrowUpRight className="size-5 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </Link>
            </Reveal>
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
          {experience.map((role, i) => (
            <Reveal as="li" key={role.company} delay={i * 0.06}>
              <div className="grid gap-2 border-b border-rule py-8 md:grid-cols-[1fr_2fr] md:gap-10">
                <div>
                  <h3 className="font-display text-lg tracking-tight text-ink">
                    {role.company}
                  </h3>
                  <p className="label mt-2">{role.period}</p>
                </div>
                <div>
                  <p className="text-ink">{role.role}</p>
                  <p className="mt-1 text-sm text-ink-faint">{role.context}</p>
                  <p className="mt-4 max-w-2xl text-ink-muted">
                    {role.points[0]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------------- Skills */}
      <Section className="border-t border-rule">
        <SectionHeader label="Toolkit" title="What I work with" />

        <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.04}>
              <dt className="label border-b border-rule pb-3">{group.group}</dt>
              <dd className="mt-4 text-ink-muted">
                {group.items.join(", ")}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* ----------------------------------------------------------------- CTA */}
      <Section className="border-t border-rule">
        <Reveal>
          <p className="label">Next</p>
          <h2 className="mt-6 max-w-[18ch] font-display text-title text-ink">
            Hiring, or have something to build?
          </h2>
          <p className="mt-6 max-w-xl text-lead text-ink-muted">
            I&apos;m open to full-time roles and selective freelance work. The
            fastest way to reach me is email — I reply to everything.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-accent"
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
        </Reveal>
      </Section>
    </>
  );
}
