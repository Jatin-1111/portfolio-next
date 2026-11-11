import { ArrowRight, Download } from "lucide-react";
import { Section } from "./section";
import { CopyEmail } from "./copy-email";
import { site, socials } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact" tag="<Contact />">
      <p
        data-b="copy"
        data-fx="rise"
        className="eyebrow"
      >
        Next
      </p>
      <h2
        data-b="headline"
        data-fx="words"
        className="mt-6 max-w-[18ch] font-display text-title text-fg"
      >
        Hiring, or have something to build?
      </h2>
      <p
        data-b="copy"
        data-fx="words"
        className="mt-6 max-w-xl text-lead text-fg-muted"
      >
        I&apos;m open to full-time roles and selective freelance work. The
        fastest way to reach me is email. I reply to everything.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${site.email}`}
          data-b="polish"
          data-fx="pop"
          className="group btn inline-flex items-center gap-2 rounded-md bg-fg px-6 py-3.5 text-sm text-bg hover:bg-accent"
        >
          {site.email}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a
          href={site.resume}
          data-b="polish"
          data-fx="pop"
          className="btn inline-flex items-center gap-2 rounded-md border border-line-strong px-6 py-3.5 text-sm text-fg hover:border-fg"
        >
          <Download className="size-4" />
          Resume
        </a>
        <CopyEmail email={site.email} />
      </div>

      <ul
        data-b="tags"
        data-fx="items"
        className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
      >
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="link-rule inline-flex min-h-11 items-center text-sm text-fg-muted hover:text-fg"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
