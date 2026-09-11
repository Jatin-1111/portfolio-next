import { SITE_URL, site } from "@/lib/site";
import { notes } from "@/lib/content/notes";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
  const items = notes
    .map(
      (note) => `    <item>
      <title>${escape(note.title)}</title>
      <link>${SITE_URL}/notes/${note.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/notes/${note.slug}</guid>
      <description>${escape(note.description)}</description>
      <pubDate>${new Date(`${note.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Notes</title>
    <link>${SITE_URL}/notes</link>
    <description>Short technical writeups by ${escape(site.name)}.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/notes/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
