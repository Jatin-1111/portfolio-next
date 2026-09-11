import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work — a three-application sports platform, a queued uptime monitoring service, and an agency site with an internal operations suite.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="shell border-b border-rule pb-14 pt-20 md:pt-28">
        <Reveal immediate>
          <p className="label">Work</p>
          <h1 className="mt-8 max-w-[20ch] font-display text-display font-medium text-ink">
            Three systems, explained properly.
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-ink-muted">
            Each of these is written up as a case study rather than a
            screenshot — the problem, the architecture, and the decisions I
            would defend in a technical interview. Client work is described at
            the architecture level; no proprietary code or interfaces are shown.
          </p>
        </Reveal>
      </section>

      <div className="shell pb-10">
        <ul>
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.06}>
              <Link
                href={`/work/${project.slug}`}
                className="group block border-b border-rule py-12 transition-colors hover:bg-paper-sunken md:px-4"
              >
                <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
                  <span className="label pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h2 className="font-display text-title text-ink transition-colors group-hover:text-accent">
                        {project.name}
                      </h2>
                      <span className="label">
                        {project.year} · {project.role}
                      </span>
                    </div>

                    <p className="mt-4 max-w-2xl text-lead text-ink-muted">
                      {project.summary}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                      <ul className="flex flex-wrap gap-x-4 gap-y-2">
                        {project.stack.map((tech) => (
                          <li key={tech} className="label">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors group-hover:text-accent">
                        Read case study
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
