"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  intent: z.enum(["role", "freelance", "other"]),
  message: z.string().min(20, "A little more detail helps — 20 characters minimum"),
  // Honeypot: hidden from people, commonly auto-filled by bots
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const intents: { value: FormValues["intent"]; label: string }[] = [
  { value: "role", label: "A full-time role" },
  { value: "freelance", label: "Freelance project" },
  { value: "other", label: "Something else" },
];

const fieldClass =
  "w-full border-b border-rule bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { intent: "role", website: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="border-t border-ink pt-8">
        <div className="flex items-center gap-3 text-accent">
          <Check className="size-5" />
          <p className="font-display text-heading">Message sent.</p>
        </div>
        <p className="mt-4 max-w-md text-ink-muted">
          Thanks for reaching out — a confirmation is on its way to your inbox,
          and I&apos;ll reply personally within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-rule mt-6 text-sm text-ink-muted hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      {/* Honeypot — visually and semantically hidden, never announced */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Your name"
            className={`${fieldClass} mt-3`}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-accent">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@company.com"
            className={`${fieldClass} mt-3`}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-accent">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="label">
          Company <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="company"
          {...register("company")}
          placeholder="Where you work"
          className={`${fieldClass} mt-3`}
        />
      </div>

      <fieldset>
        <legend className="label">What&apos;s this about</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {intents.map((intent) => (
            <label
              key={intent.value}
              className="cursor-pointer border border-rule px-4 py-2.5 text-sm text-ink-muted transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-paper hover:border-ink-faint"
            >
              <input
                type="radio"
                value={intent.value}
                {...register("intent")}
                className="sr-only"
              />
              {intent.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="What are you working on, and what do you need?"
          className={`${fieldClass} mt-3 resize-none`}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-accent">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-sm text-accent">
            Something went wrong. Please email me directly instead.
          </p>
        )}
      </div>
    </form>
  );
}
