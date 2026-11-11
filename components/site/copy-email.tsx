"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies the email address, for visitors without a mail app set up */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API unavailable (insecure context): fall back to selection
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-b="polish"
      data-fx="pop"
      className="btn inline-flex min-h-12 items-center gap-2 rounded-md border border-line-strong px-6 text-sm text-fg hover:border-fg"
    >
      {copied ? <Check className="size-4 text-ok" /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
