import Link from "next/link";
import { nav, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="label">Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              className="link-rule mt-4 inline-block font-display text-heading tracking-tight text-ink"
            >
              {site.email}
            </a>
            <p className="mt-3 text-sm text-ink-muted">{site.location}</p>
          </div>

          <div>
            <p className="label">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule text-sm text-ink-muted hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="link-rule text-sm text-ink-muted hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-rule pt-6 sm:flex-row">
          <p className="label">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="label">Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
