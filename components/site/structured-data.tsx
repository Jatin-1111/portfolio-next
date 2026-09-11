import { SITE_URL, site, socials } from "@/lib/site";
import { experience, education } from "@/lib/content/experience";

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: SITE_URL,
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    description: site.description,
    sameAs: socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
    worksFor: {
      "@type": "Organization",
      name: experience[0].company,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
    },
    knowsAbout: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "React",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: SITE_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([person, website]),
      }}
    />
  );
}
