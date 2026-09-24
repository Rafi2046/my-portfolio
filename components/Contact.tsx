"use client";

import { useState, type FormEvent } from "react";
import { MotionSection } from "@/components/MotionSection";
import { submitContact } from "@/lib/contact";
import { site } from "@/lib/content";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldClass(hasError: boolean, isSuccess: boolean) {
  const base =
    "w-full rounded-lg border bg-background/50 px-4 py-3 text-foreground outline-none transition placeholder:text-foreground-muted/60 focus-visible:ring-2 focus-visible:ring-accent";
  if (hasError) {
    return `${base} border-red-400/70 shadow-[0_0_0_1px_rgba(248,113,113,0.4),0_0_20px_var(--error-glow)]`;
  }
  if (isSuccess) {
    return `${base} border-accent shadow-[0_0_0_1px_rgba(34,211,238,0.45),0_0_22px_var(--success-glow)]`;
  }
  return `${base} border-glass-border focus:border-accent/50`;
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!emailPattern.test(email.trim()))
      next.email = "Enter a valid email.";
    if (!message.trim()) next.message = "Message is required.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      await submitContact({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const showSuccessGlow = status === "success";

  return (
    <MotionSection
      id="contact"
      ariaLabelledBy="contact-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Contact
      </p>
      <h2
        id="contact-heading"
        className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Let&apos;s build something
      </h2>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Tell me about a Flutter project, architecture challenge, or
        collaboration idea. Prefer email?{" "}
        <a
          href={`mailto:${site.email}`}
          className="focus-ring text-accent-soft underline-offset-4 hover:underline"
        >
          {site.email}
        </a>
      </p>

      <form
        onSubmit={onSubmit}
        noValidate
        className="glass mt-10 max-w-xl space-y-5 rounded-2xl p-6 sm:p-8"
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass(Boolean(errors.name), showSuccessGlow)}
            placeholder="Your name"
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-2 text-sm text-red-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass(Boolean(errors.email), showSuccessGlow)}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-2 text-sm text-red-300">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={`${fieldClass(Boolean(errors.message), showSuccessGlow)} resize-y`}
            placeholder="What are you building?"
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 text-sm text-red-300">
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="focus-ring inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        {status === "success" ? (
          <p className="text-sm text-accent-soft" role="status">
            Message queued locally — wire{" "}
            <code className="rounded bg-white/5 px-1">submitContact</code> to
            your API when ready.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-300" role="alert">
            Something went wrong. Please try again.
          </p>
        ) : null}
      </form>
    </MotionSection>
  );
}
