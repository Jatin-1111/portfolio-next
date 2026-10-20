import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-display text-[clamp(5rem,16vw,11rem)] italic leading-none text-accent/90">
        404
      </p>
      <h1 className="mt-4 max-w-[16ch] font-display text-display font-normal text-ink">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-lg text-lead text-ink-muted">
        The link may be out of date, or the page may have moved during the site
        rebuild.
      </p>
      <Link
        href="/"
        className="group mt-10 btn inline-flex w-fit items-center gap-2 rounded-md border border-rule-strong px-6 py-3.5 text-sm text-ink hover:border-ink"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back home
      </Link>
    </section>
  );
}
