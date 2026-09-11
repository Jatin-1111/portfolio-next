import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";
import {
  education,
  experience,
  involvement,
  skills,
} from "@/lib/content/experience";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack developer in Chandigarh — production experience across payments, real-time systems, background queues and cloud deployment, alongside a B.E. in Information Technology.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* --------------------------------------------------------------- Intro */}
      <section className="shell border-b border-rule pb-16 pt-20 md:pt-28">
        <Reveal immediate>
          <p className="label">About</p>
          <h1 className="mt-8 max-w-[20ch] font-display text-display font-medium text-ink">
            Engineering student by enrolment, shipping engineer by practice.
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-rule pt-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal delay={0.1} immediate>
            <div className="max-w-xl space-y-5 text-lead text-ink-muted">
              <p>
                I&apos;m {site.name}, a full-stack developer based in{" "}
                {site.location}. I&apos;m in the middle of a B.E. in Information
                Technology at UIET, Panjab University — and in parallel
                I&apos;ve spent the last year working on software that real
                people depend on.
              </p>
              <p>
                That has meant three roles running at once: leading engineering
                on a live sports platform, delivering a B2B marketplace as a
                freelancer, and building a student management system with a
                small team. Different products, but the same recurring problems
                — how money moves safely, how state stays consistent across
                clients, how a system behaves when something upstream fails.
              </p>
              <p>
                I care most about the unglamorous parts: authorization enforced
                on the server, payments that survive a closed browser tab,
                background work that retries instead of vanishing, and
                deployments that are reproducible rather than remembered.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-accent"
              >
                <Download className="size-4" />
                Download résumé
              </a>
              <Link
                href="/contact"
                className="link-rule text-sm text-ink-muted hover:text-ink"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.16} immediate>
            <div className="border-t border-ink pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <Image
                src="/portrait.jpg"
                alt={site.name}
                width={800}
                height={1000}
                priority
                sizes="(min-width: 768px) 20rem, 60vw"
                className="mb-10 w-40 max-w-full border border-rule object-cover sm:w-48 md:w-full md:max-w-[17rem]"
              />

              <p className="label">Education</p>
              <p className="mt-4 font-display text-heading text-ink">
                {education.degree}
              </p>
              <p className="mt-2 text-ink-muted">{education.school}</p>
              <p className="label mt-3">{education.period}</p>

              <p className="label mt-10">Open to</p>
              <ul className="mt-4 space-y-2 text-ink-muted">
                <li>Full-time engineering roles</li>
                <li>Selective freelance projects</li>
                <li>Backend and full-stack work</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Experience */}
      <Section>
        <SectionHeader label="Experience" title="Roles in full" />

        <div className="mt-2">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={i * 0.05}>
              <div className="grid gap-6 border-b border-rule py-12 md:grid-cols-[1fr_2fr] md:gap-12">
                <div className="md:sticky md:top-28 md:self-start">
                  <h3 className="font-display text-heading text-ink">
                    {role.href ? (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 hover:text-accent"
                      >
                        <span className="link-rule">{role.company}</span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : (
                      role.company
                    )}
                  </h3>
                  <p className="mt-3 text-ink">{role.role}</p>
                  <p className="label mt-3">{role.period}</p>
                  <p className="mt-3 text-sm text-ink-faint">{role.context}</p>
                </div>

                <div>
                  <ul className="space-y-4">
                    {role.points.map((point, j) => (
                      <li
                        key={j}
                        className="border-l border-rule pl-5 text-ink-muted"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {role.stack.map((tech) => (
                      <li key={tech} className="label">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------------- Skills */}
      <Section className="border-t border-rule">
        <SectionHeader label="Toolkit" title="Technical skills" />
        <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.04}>
              <dt className="label border-b border-rule pb-3">{group.group}</dt>
              <dd className="mt-4 text-ink-muted">{group.items.join(", ")}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* --------------------------------------------------------- Involvement */}
      <Section className="border-t border-rule">
        <SectionHeader label="Beyond work" title="Leadership & community" />
        <ul className="mt-2">
          {involvement.map((item, i) => (
            <Reveal as="li" key={`${item.org}-${item.period}`} delay={i * 0.04}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-rule py-6">
                <div>
                  <p className="text-ink">{item.role}</p>
                  <p className="mt-1 text-sm text-ink-muted">{item.org}</p>
                </div>
                <span className="label">{item.period}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ----------------------------------------------------------------- CTA */}
      <Section className="border-t border-rule">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-title text-ink">
            Let&apos;s talk about what you&apos;re building.
          </h2>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-accent"
          >
            Get in touch
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
