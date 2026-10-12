"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ResumeCard } from "@/components/ResumeCard";
import { ArrowUpRight, Panel, Reveal, Magnetic } from "@/components/Section";
import { site } from "@/lib/content";

type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 10;
const ease = [0.22, 1, 0.36, 1] as const;

function check(field: Field, value: string): string | undefined {
  const v = value.trim();
  if (field === "name") return v ? undefined : "Please tell me your name.";
  if (field === "email") {
    if (!v) return "I need an email to reply to.";
    return emailPattern.test(v) ? undefined : "That email doesn't look right.";
  }
  if (!v) return "Tell me a little about the project.";
  return v.length < MIN_MESSAGE ? `A few more words, please (at least ${MIN_MESSAGE} characters).` : undefined;
}

function fieldClass(hasError: boolean) {
  const base =
    "w-full rounded-2xl border bg-panel px-4 py-3.5 text-ink outline-none transition placeholder:text-muted focus-visible:border-ink";
  return hasError ? `${base} border-error focus-visible:border-error` : `${base} border-line-strong`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.25, ease }}
          className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm text-error"
        >
          <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="currentColor">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v4.75h-1.5V4.5Zm0 6h1.5V12h-1.5v-1.5Z" />
          </svg>
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Contact() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  // Honeypot: hidden from people, filled in by bots; Web3Forms drops those submissions.
  const [botcheck, setBotcheck] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState<{ name: string; email: string } | null>(null);

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field has shown an error, re-check it live so it clears as soon as it's fixed.
    if (errors[field]) setErrors((e) => ({ ...e, [field]: check(field, value) }));
  }

  function blur(field: Field) {
    if (values[field].trim()) setErrors((e) => ({ ...e, [field]: check(field, values[field]) }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const next: FieldErrors = {
      name: check("name", values.name),
      email: check("email", values.email),
      message: check("message", values.message),
    };
    setErrors(next);
    const firstInvalid = (Object.keys(next) as Field[]).find((f) => next[f]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.contactFormKey,
          subject: `Project enquiry from ${values.name.trim()}`,
          from_name: "Portfolio contact form",
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          botcheck,
        }),
      });
      const data: { success?: boolean } = await res.json();
      if (!res.ok || !data.success) throw new Error("Send failed");
      setSentTo({ name: values.name.trim().split(/\s+/)[0], email: values.email.trim() });
      setValues({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  const swap = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)" },
    transition: { duration: 0.45, ease },
  };

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
          <a href={`mailto:${site.email}`} className="focus-ring whitespace-nowrap text-ink underline underline-offset-4">
            {site.email}
          </a>
          , or call{" "}
          <a href={site.phoneHref} className="focus-ring whitespace-nowrap text-ink underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
      </div>

      <ResumeCard />

      <div className="mx-auto mt-12 max-w-3xl">
        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" && sentTo ? (
            <motion.div
              key="sent"
              {...swap}
              role="status"
              className="relative overflow-hidden rounded-[1.75rem] border border-line bg-panel px-6 py-12 text-center sm:px-12 sm:py-16"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-live/20 blur-3xl"
              />
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-live/15 ring-1 ring-live/30">
                <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 text-live" fill="none">
                  <motion.path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.25, ease }}
                  />
                </svg>
              </div>
              <h3
                // The card mounts only after the form has animated out, so focus it on mount
                // (not on the status change) to have screen readers announce the confirmation.
                ref={(el) => el?.focus({ preventScroll: true })}
                tabIndex={-1}
                className="relative mt-6 text-2xl font-semibold tracking-tight outline-none sm:text-3xl"
              >
                Message sent
              </h3>
              <p className="relative mx-auto mt-3 max-w-md leading-relaxed text-muted">
                Thanks, {sentTo.name}. It&apos;s in my inbox now, and I&apos;ll reply to{" "}
                <span className="font-medium text-ink">{sentTo.email}</span> within a day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="focus-ring relative mt-8 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium transition hover:bg-ink hover:text-panel"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" {...swap} onSubmit={onSubmit} noValidate className="space-y-4">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
                checked={Boolean(botcheck)}
                onChange={(e) => setBotcheck(e.target.checked ? "on" : "")}
              />
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
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => blur("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={fieldClass(Boolean(errors.name))}
                  />
                  <FieldError id="contact-name-error" message={errors.name} />
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
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={fieldClass(Boolean(errors.email))}
                  />
                  <FieldError id="contact-email-error" message={errors.email} />
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
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => blur("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${fieldClass(Boolean(errors.message))} resize-y`}
                />
                <FieldError id="contact-message-error" message={errors.message} />
              </div>

              <AnimatePresence initial={false}>
                {status === "failed" ? (
                  <motion.div
                    key="failed"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-3 rounded-2xl border border-error/40 bg-error/10 px-4 py-3.5 text-left text-sm">
                      <svg aria-hidden viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-error" fill="currentColor">
                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v4.75h-1.5V4.5Zm0 6h1.5V12h-1.5v-1.5Z" />
                      </svg>
                      <p className="leading-relaxed">
                        <span className="font-medium text-error">Your message didn&apos;t go through.</span>{" "}
                        <span className="text-muted">
                          Check your connection and try again, or email me directly at{" "}
                          <a href={`mailto:${site.email}`} className="focus-ring text-ink underline underline-offset-4">
                            {site.email}
                          </a>
                          .
                        </span>
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="flex justify-center pt-2">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                    className="focus-ring inline-flex h-12 min-w-44 items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-semibold text-panel transition hover:opacity-85 disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Spinner /> Sending…
                      </>
                    ) : status === "failed" ? (
                      <>
                        Try again <ArrowUpRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Contact me <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Panel>
  );
}
