import type { ComponentType } from "react";
import * as turborepoCache from "@/content/notes/turborepo-cache-and-the-missing-dist.mdx";

export type NoteMeta = {
  title: string;
  description: string;
  /** ISO date — YYYY-MM-DD */
  date: string;
  readingTime: string;
  /** Drafts are hidden in production but visible in dev */
  draft?: boolean;
};

export type Note = NoteMeta & {
  slug: string;
  Content: ComponentType;
};

/**
 * Notes are registered explicitly rather than read from the filesystem, so the
 * whole set is statically analysable and every note is type-checked at build.
 *
 * To add one: create content/notes/<slug>.mdx exporting `meta`, then add a
 * line here. Set draft: false in the note's meta when it's ready to publish.
 */
type NoteModule = { meta: NoteMeta; default: ComponentType };

const registry: { slug: string; module: NoteModule }[] = [
  {
    slug: "turborepo-cache-and-the-missing-dist",
    module: turborepoCache,
  },
];

const all: Note[] = registry
  .map(({ slug, module }) => ({ slug, ...module.meta, Content: module.default }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Drafts stay visible locally so they can be previewed before publishing. */
export const notes: Note[] =
  process.env.NODE_ENV === "production" ? all.filter((n) => !n.draft) : all;

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

export function formatNoteDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
