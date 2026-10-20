import Link from "next/link";
import { nav, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-rule bg-paper-sunken">
      <div className="shell py-16 md:py-24">
        <p className="eyebrow">Get in touch</p>
        <a
          href={`mailto:${site.email}`}
          className="link-rule mt-5 inline-block break-all font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-tight tracking-[-0.02em] text-ink hover:text-accent"
        >
          {site.email}
        </a>
        <p className="mt-3 text-ink-muted">{site.location}</p>

        <div className="mt-16 flex flex-col gap-8 border-t border-rule pt-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-rule text-sm text-ink-muted hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="link-rule text-sm text-ink-muted hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <p className="label">
            © {new Date().getFullYear()} {site.name}. Built with Next.js, hosted on Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}
