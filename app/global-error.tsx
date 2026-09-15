"use client";

import { useEffect } from "react";

/**
 * Last resort: replaces the root layout entirely, so it cannot rely on the
 * site's fonts, header or stylesheet being available. Styles are inline.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root-level error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "#faf9f7",
          color: "#16140f",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <main style={{ maxWidth: "36rem", padding: "0 1.5rem", margin: "0 auto" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6e6860",
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              margin: "1.5rem 0 0",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            The site failed to load.
          </h1>
          <p
            style={{
              margin: "1.5rem 0 0",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "#5f5a52",
            }}
          >
            Please try again. If this keeps happening, email{" "}
            <a href="mailto:off.jatin1111@gmail.com" style={{ color: "#b8400f" }}>
              off.jatin1111@gmail.com
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2.5rem",
              border: 0,
              background: "#16140f",
              color: "#faf9f7",
              padding: "0.875rem 1.5rem",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
