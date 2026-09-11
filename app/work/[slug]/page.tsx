import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Diagram } from "@/components/diagrams";
import { CaseStudyNav } from "@/components/site/case-study-nav";
import { ReadingProgress } from "@/components/site/reading-progress";
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
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const toc = project.sections.map((s) => ({
    id: slugify(s.heading),
    heading: s.heading,
  }));

  return (
    <article>
      <ReadingProgress />
      {/* --------------------------------------------------------------- Head */}
      <header className="shell border-b border-rule pb-14 pt-16 md:pt-24">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="link-rule">All work</span>
        </Link>

        <Reveal immediate>
          <h1 className="mt-10 max-w-[18ch] font-display text-display font-medium text-ink">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-ink-muted">
            {project.tagline}
          </p>
        </Reveal>

        {project.links.length > 0 && (
          <Reveal delay={0.1} immediate>
            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 border border-rule-strong px-5 py-3 text-sm text-ink transition-colors hover:border-ink"
                >
                  {link.label}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </header>

      {/* ---------------------------------------------------- Spec + narrative */}
      <div className="shell grid gap-12 py-16 md:grid-cols-[220px_1fr] md:gap-12 md:py-20 lg:gap-16">
        {/* Spec column */}
        <aside className="md:sticky md:top-28 md:self-start">
          <dl className="space-y-6">
            {project.facts.map((fact) => (
              <div key={fact.label} className="border-t border-rule pt-3">
                <dt className="label">{fact.label}</dt>
                <dd className="mt-2 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
            <div className="border-t border-rule pt-3">
              <dt className="label">Stack</dt>
              <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-sm text-ink-muted">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <CaseStudyNav sections={toc} />
        </aside>

        {/* Narrative column — prose keeps a readable measure, figures run wider */}
        <div className="min-w-0">
          {project.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.04}>
              <section
                id={slugify(section.heading)}
                className="mb-14 scroll-mt-28 last:mb-0"
              >
                <div className="max-w-2xl">
                  <h2 className="font-display text-heading text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {section.body.map((paragraph, j) => (
                      <p key={j} className="text-lead text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                {section.diagram && <Diagram name={section.diagram} />}
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------- Next project */}
      <nav className="border-t border-rule">
        <Link
          href={`/work/${next.slug}`}
          className="group block transition-colors hover:bg-paper-sunken"
        >
          <div className="shell flex flex-wrap items-end justify-between gap-6 py-14">
            <div>
              <p className="label">Next project</p>
              <p className="mt-4 font-display text-title text-ink transition-colors group-hover:text-accent">
                {next.name}
              </p>
            </div>
            <ArrowRight className="size-7 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
          </div>
        </Link>
      </nav>
    </article>
  );
}
