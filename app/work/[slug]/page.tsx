import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Rule } from "@/components/site/rule";
import { Rise } from "@/components/site/rise";
import { Diagram } from "@/components/diagrams";
import { BuildBar, BuildRail } from "@/components/site/build-rail";
import { slugify } from "@/lib/utils";
import { getProject, projects } from "@/lib/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${project.tagline}`,
      description: project.summary,
      type: "article",
    },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A case study, laid out as a build sequence: a spec strip under the title,
 * then the sections as numbered stages beside a sticky rail that fills as you
 * read. Architecture diagrams build themselves in stages and can be switched
 * to X-ray to trace the critical path (see components/diagrams).
 */
export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const stages = project.sections.map((s) => ({
    id: slugify(s.heading),
    heading: s.heading,
  }));

  return (
    <article>
      {/* --------------------------------------------------------------- Head */}
      <header className="shell relative pb-12 pt-14 md:pb-16 md:pt-20">
        <Rule edge="bottom" />
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="link-rule">All work</span>
        </Link>

        <Rise>
          <p className="eyebrow mt-10 tabular-nums">
            Case study {pad(index + 1)} / {pad(projects.length)}
          </p>
          <h1 className="mt-6 max-w-[16ch] font-display text-display font-normal text-ink">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-ink">{project.tagline}</p>
        </Rise>

        {project.links.length > 0 && (
          <Rise delay={0.08}>
            <div className="mt-9 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn group inline-flex items-center gap-2 rounded-md border border-rule-strong px-5 py-3 text-sm text-ink hover:border-ink"
                >
                  {link.label}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </Rise>
        )}

        {/* Spec strip: the facts a recruiter scans for, in one row */}
        <Rise delay={0.14}>
          <dl
            className={`mt-12 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2 ${
              project.facts.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {project.facts.map((fact) => (
              <div key={fact.label} className="bg-paper-raised p-5">
                <dt className="subhead">{fact.label}</dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-snug text-ink-muted">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="subhead">Stack</span>
            {project.stack.map((tech) => (
              <span key={tech} className="label">
                {tech}
              </span>
            ))}
          </div>
        </Rise>
      </header>

      <BuildBar stages={stages} />

      {/* ------------------------------------------------- Rail + narrative */}
      <div className="shell grid gap-12 py-14 md:grid-cols-[13rem_1fr] md:gap-12 md:py-20 lg:grid-cols-[15rem_1fr] lg:gap-20">
        <div className="hidden md:sticky md:top-28 md:block md:self-start">
          <BuildRail stages={stages} />
        </div>

        <div data-case-body className="min-w-0">
          {project.sections.map((section, i) => (
            <section
              key={section.heading}
              id={stages[i].id}
              className="mb-20 scroll-mt-32 last:mb-0 md:scroll-mt-28"
            >
              <div className="max-w-2xl">
                <p className="label tabular-nums text-accent">
                  Stage {pad(i + 1)}
                </p>
                <h2 data-mask className="mt-3 font-display text-title text-ink">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-5">
                  {section.body.map((paragraph, j) => (
                    <p
                      key={j}
                      className={
                        j === 0
                          ? "text-lead text-ink"
                          : "text-[1.0625rem] leading-[1.7] text-ink-muted"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              {section.diagram && <Diagram name={section.diagram} />}
            </section>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------- Next project */}
      <nav aria-label="Next case study" className="border-t border-rule">
        <Link
          href={`/work/${next.slug}`}
          className="group block bg-paper-sunken transition-colors hover:bg-rule"
        >
          <div className="shell grid gap-6 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-16">
            <div>
              <p className="eyebrow tabular-nums">
                Next · case study {pad(((index + 1) % projects.length) + 1)} / {pad(projects.length)}
              </p>
              <p className="mt-4 font-display text-title text-ink transition-colors group-hover:text-accent">
                {next.name}
              </p>
              <p className="mt-3 max-w-xl text-ink-muted">{next.tagline}</p>
            </div>
            <ArrowRight className="size-7 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
          </div>
        </Link>
      </nav>
    </article>
  );
}
