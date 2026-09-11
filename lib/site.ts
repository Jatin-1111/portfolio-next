/**
 * Single source of truth for site-wide identity.
 * Swap SITE_URL here (or set NEXT_PUBLIC_SITE_URL) when the domain changes —
 * metadata, canonicals, sitemap and structured data all read from it.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-jatin-kumar.vercel.app";

export const site = {
  name: "Jatin Kumar",
  role: "Full-Stack Developer",
  email: "off.jatin1111@gmail.com",
  phone: "+91 76963 16713",
  location: "Chandigarh, India",
  resume: "/jatin-kumar-resume.pdf",
  description:
    "Full-stack developer building production web systems with TypeScript, Next.js and Node.js — payments, real-time features, background queues and cloud deployment.",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/Jatin-1111" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jatin1011" },
  { label: "Email", href: `mailto:${site.email}` },
] as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
