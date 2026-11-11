import { nav, site } from "@/lib/site";

export function Nav() {
  return (
    <header
      data-b="nav"
      data-fx="drop"
      className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-md"
    >
      <div className="shell flex h-16 items-center justify-between">
        <a href="#hero" className="font-display text-xl tracking-tight text-fg">
          {site.name}
          <span className="text-accent">.</span>
        </a>

        <nav
          aria-label="Sections"
          data-b="nav"
          data-fx="items"
          className="flex items-center gap-1 md:gap-2"
        >
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg aria-[current=true]:text-fg sm:inline-block"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.resume}
            className="btn rounded-md border border-line-strong px-4 py-2 text-sm text-fg hover:border-accent hover:text-accent"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
