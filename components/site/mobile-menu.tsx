"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

/**
 * Section links for small screens, where the inline links do not fit. A plain
 * text button (not an icon alone) opens a panel of full-height links.
 */
export function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={wrap} className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-sections"
        onClick={() => setOpen((v) => !v)}
        className="btn inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-fg-muted hover:text-fg"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
        Menu
      </button>

      {open && (
        <div
          id="mobile-sections"
          className="absolute inset-x-0 top-full border-b border-line bg-bg/95 backdrop-blur-md"
        >
          <ul className="shell py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-base text-fg-muted hover:text-fg aria-[current=true]:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
