import type { Metadata } from "next";
import { Rise } from "@/components/site/rise";
import { ContactForm } from "@/components/site/contact-form";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about full-time engineering roles or freelance work — email, LinkedIn, GitHub, or the form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="shell border-b border-rule pb-14 pt-20 md:pt-28">
        <Rise>
          <p className="label">Contact</p>
          <h1 className="mt-8 max-w-[16ch] font-display text-display font-medium text-ink">
            Let&apos;s start a conversation.
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-ink-muted">
            I&apos;m open to full-time engineering roles and selective freelance
            work. Tell me what you&apos;re building and what you need — I read
            and reply to everything, usually within a day.
          </p>
        </Rise>
      </section>

      <div className="shell grid gap-14 py-16 md:grid-cols-[2fr_1fr] md:gap-20 md:py-20">
        <Rise>
          <ContactForm />
        </Rise>

        <Rise delay={0.1}>
          <aside className="md:border-l md:border-rule md:pl-10">
            <p className="label">Direct</p>
            <a
              href={`mailto:${site.email}`}
              className="link-rule mt-4 inline-block font-display text-lg tracking-tight text-ink"
            >
              {site.email}
            </a>
            <p className="mt-2 text-sm text-ink-muted">{site.phone}</p>

            <p className="label mt-10">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-rule text-ink-muted hover:text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>

            <p className="label mt-10">Based in</p>
            <p className="mt-4 text-ink-muted">{site.location}</p>
            <p className="mt-1 text-sm text-ink-faint">
              Available remotely across time zones
            </p>
          </aside>
        </Rise>
      </div>
    </>
  );
}
