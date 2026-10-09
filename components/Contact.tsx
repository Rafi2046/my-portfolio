"use client";

import { useState, type FormEvent } from "react";
import { ResumeCard } from "@/components/ResumeCard";
import { ArrowUpRight, Panel, Reveal } from "@/components/Section";
import { site } from "@/lib/content";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldClass(hasError: boolean) {
  const base =
    "w-full rounded-2xl border bg-panel px-4 py-3.5 text-ink outline-none transition placeholder:text-muted focus-visible:border-ink";
  return hasError ? `${base} border-error` : `${base} border-line-strong`;
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [opened, setOpened] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!emailPattern.test(email.trim()))
      next.email = "Enter a valid email.";
    if (!message.trim()) next.message = "Message is required.";
    return next;
  }

  // No backend yet: hand the message to the visitor's email app, addressed to me.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `Project enquiry from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <Panel id="contact" tone="light" labelledBy="contact-heading" className="mt-3 px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-medium">
          <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
          Available for new projects
        </p>
        <h2 id="contact-heading" className="display mt-8 text-[15vw] sm:text-[10vw] lg:text-[8rem]">
          <Reveal>Have a project</Reveal>
          <Reveal delay={0.08}>
            <span className="text-muted">in mind?</span>
          </Reveal>
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
          A Flutter app to build, an existing one to rescue, or a role to fill.
          Tell me about it and I&apos;ll reply within a day. Or email{" "}
          <a href={`mailto:${site.email}`} className="focus-ring break-all text-ink underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </div>

      <ResumeCard />

      <form onSubmit={onSubmit} noValidate className="mx-auto mt-12 max-w-3xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={fieldClass(Boolean(errors.name))}
            />
            {errors.name ? (
              <p id="contact-name-error" className="mt-2 text-sm text-error">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={fieldClass(Boolean(errors.email))}
            />
            {errors.email ? (
              <p id="contact-email-error" className="mt-2 text-sm text-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="What are you building?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${fieldClass(Boolean(errors.message))} resize-y`}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 text-sm text-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <button
            type="submit"
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-semibold text-panel transition hover:opacity-85"
          >
            Contact me <ArrowUpRight className="h-4 w-4" />
          </button>
          {opened ? (
            <p className="text-center text-sm text-muted" role="status">
              Your email app should open with the message ready to send. If it
              didn&apos;t, email me at {site.email}.
            </p>
          ) : null}
        </div>
      </form>
    </Panel>
  );
}
