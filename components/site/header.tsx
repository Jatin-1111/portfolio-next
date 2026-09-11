"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-[0.95rem] font-medium tracking-tight text-ink"
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-rule py-1 text-sm transition-colors",
                  active ? "text-accent" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.resume}
            download
            className="border border-ink px-4 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Résumé
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-rule bg-paper md:hidden">
          <div className="shell flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-rule py-4 font-display text-heading text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.resume}
              download
              className="py-4 font-display text-heading text-accent"
            >
              Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
