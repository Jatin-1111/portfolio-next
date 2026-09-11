import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/lib/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = ["", "/work", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseStudies = projects.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...caseStudies];
}
