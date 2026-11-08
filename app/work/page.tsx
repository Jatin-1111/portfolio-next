import type { Metadata } from "next";
import { Rule } from "@/components/site/rule";
import { Rise } from "@/components/site/rise";
import { WorkIndex, type WorkItem } from "@/components/site/work-index";
import { Diagram } from "@/components/diagrams";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work: a three-application sports platform, a queued uptime monitoring service, and an agency site with an internal operations suite.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const items: WorkItem[] = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    year: p.year,
    role: p.role,
    stack: p.stack,
    previewHeading: p.sections.find((s) => s.diagram)?.heading,
  }));

  // Each project's first architecture diagram, rendered on the server and
  // handed to the client list as the X-ray preview.
  const previews = projects.map((p) => {
    const key = p.sections.find((s) => s.diagram)?.diagram;
    return key ? <Diagram key={p.slug} name={key} bare /> : null;
  });

  const years = projects.map((p) => Number(p.year));

  return (
    <>
      <section className="shell relative pb-14 pt-20 md:pt-28">
        <Rule edge="bottom" />
        <Rise>
          <p className="eyebrow">Work</p>
          <h1 className="mt-8 max-w-[18ch] font-display text-display font-normal text-ink">
            Three systems, explained properly.
          </h1>
        </Rise>
        <Rise delay={0.08}>
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-2xl text-lead text-ink-muted">
              Each of these is written up as a case study rather than a
              screenshot: the problem, the architecture, and the decisions I
              would defend in a technical interview. Client work is described
              at the architecture level; no proprietary code or interfaces are
              shown.
            </p>
            <p className="label tabular-nums md:text-right">
              {String(projects.length).padStart(2, "0")} case studies ·{" "}
              {Math.min(...years)} to {Math.max(...years)}
            </p>
          </div>
        </Rise>
      </section>

      <div className="shell pb-24 pt-14 md:pt-16">
        <WorkIndex items={items} previews={previews} />
      </div>
    </>
  );
}
