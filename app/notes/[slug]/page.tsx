import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { getNote, notes, formatNoteDate } from "@/lib/content/notes";
import { SITE_URL, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.description,
      publishedTime: note.date,
      authors: [site.name],
    },
  };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const { Content } = note;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.description,
    datePublished: note.date,
    author: { "@type": "Person", name: site.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/notes/${note.slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="shell border-b border-rule pb-12 pt-16 md:pt-24">
        <Link
          href="/notes"
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="link-rule">All notes</span>
        </Link>

        <Reveal immediate>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="label">{formatNoteDate(note.date)}</span>
            <span className="label">{note.readingTime}</span>
            {note.draft && <span className="label text-accent">Draft</span>}
          </div>
          <h1 className="mt-5 max-w-[22ch] font-display text-title font-medium text-ink">
            {note.title}
          </h1>
        </Reveal>
      </header>

      <div className="shell py-14 md:py-20">
        <div className="max-w-2xl">
          <Content />
        </div>
      </div>

      <nav className="border-t border-rule">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-12">
          <Link
            href="/notes"
            className="link-rule text-sm text-ink-muted hover:text-ink"
          >
            More notes
          </Link>
          <Link
            href="/contact"
            className="link-rule text-sm text-ink-muted hover:text-ink"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </article>
  );
}
