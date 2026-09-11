import type { MDXComponents } from "mdx/types";

/**
 * Prose styling for MDX notes. Kept here rather than as a wrapper class so the
 * typography matches the rest of the site without a plugin.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-14 font-display text-heading text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-lg tracking-tight text-ink">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-5 text-lead text-ink-muted">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 space-y-2.5 text-lead text-ink-muted">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-lead text-ink-muted">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="border-l border-rule pl-5 marker:text-ink-faint">
        {children}
      </li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="link-rule text-ink hover:text-accent"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-accent pl-6 text-lead text-ink">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-paper-sunken px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto border border-rule bg-paper-sunken p-5 font-mono text-sm leading-relaxed text-ink">
        {children}
      </pre>
    ),
    hr: () => <hr className="mt-12 border-rule" />,
    ...components,
  };
}
