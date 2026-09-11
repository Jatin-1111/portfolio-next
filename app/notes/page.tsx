import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { notes, formatNoteDate } from "@/lib/content/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short technical writeups — build systems, payment reliability, background jobs, and the bugs worth remembering.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <>
      <section className="shell border-b border-rule pb-14 pt-20 md:pt-28">
        <Reveal immediate>
          <p className="label">Notes</p>
          <h1 className="mt-8 max-w-[18ch] font-display text-display font-medium text-ink">
            Things worth writing down.
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-ink-muted">
            Short writeups on problems I actually hit — build caches that lie,
            payments that must survive a closed tab, alerting that doesn&apos;t
            train you to ignore it.
          </p>
        </Reveal>
      </section>

      <div className="shell py-4">
        {notes.length === 0 ? (
          <p className="py-20 text-lead text-ink-faint">
            Nothing published yet.
          </p>
        ) : (
          <ul>
            {notes.map((note, i) => (
              <Reveal as="li" key={note.slug} delay={i * 0.05}>
                <Link
                  href={`/notes/${note.slug}`}
                  className="group block border-b border-rule py-10 transition-colors hover:bg-paper-sunken md:px-4"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="label">{formatNoteDate(note.date)}</span>
                    <span className="label">{note.readingTime}</span>
                    {note.draft && (
                      <span className="label text-accent">Draft</span>
                    )}
                  </div>

                  <h2 className="mt-4 max-w-3xl font-display text-heading text-ink transition-colors group-hover:text-accent">
                    {note.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-muted">
                    {note.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors group-hover:text-accent">
                    Read
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
