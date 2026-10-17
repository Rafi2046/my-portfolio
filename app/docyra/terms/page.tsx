import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ArrowUpRight, Panel } from "@/components/Section";
import { site } from "@/lib/content";

const UPDATED = "October 17, 2026";

/** Temporary: swap for Docyra's own support inbox once it exists. */
const SUPPORT_EMAIL = site.email;

const title = "Terms of Use — Docyra";
const description = "Terms of Use for Docyra, an offline-first document scanner for Android by Ishmak Rahat Rafi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/docyra/terms" },
  openGraph: { type: "article", url: "/docyra/terms", title, description },
  twitter: { card: "summary", title, description },
};

const glance = [
  { label: "Your scans", value: "Stay yours, never watermarked" },
  { label: "Free plan", value: "Ads and daily limits" },
  { label: "Docyra Pro", value: "Google Play subscription" },
];

const linkClass = "underline decoration-line-strong underline-offset-4 transition hover:decoration-ink";

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "license",
    title: "License",
    body: (
      <p>
        You are granted a personal, non-exclusive, non-transferable license to use Docyra on devices you own or
        control.
      </p>
    ),
  },
  {
    id: "content",
    title: "Your content",
    body: (
      <p>
        You retain ownership of documents you scan or import. You are responsible for having the right to scan, store
        and share that content. Docyra never adds a watermark to your scans or PDFs.
      </p>
    ),
  },
  {
    id: "free",
    title: "Free version and ads",
    body: (
      <p>
        Scanning, PDF creation, and ID card and passport scanning are free. The free version shows ads and has usage
        limits (pages per scan and daily uses of some advanced tools), which you can extend by watching an optional
        rewarded ad. Limits may change in future versions.
      </p>
    ),
  },
  {
    id: "pro",
    title: "Docyra Pro",
    body: (
      <p>
        Docyra Pro is an in-app subscription through Google Play (monthly or yearly; yearly may include a free trial)
        that removes ads and free-plan limits. Subscriptions renew automatically unless cancelled in your Google Play
        account at least 24 hours before the end of the current billing or trial period. An optional on-device reminder
        may notify you before a free trial ends if you enable it. Reinstall the app and tap{" "}
        <strong className="font-semibold">Restore purchases</strong> to restore your subscription. Payments and refunds
        are handled by Google Play under its terms and policies.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <p>
        You agree not to use Docyra for unlawful activity, to infringe others’ rights, or to attempt to reverse engineer
        the app except where allowed by law.
      </p>
    ),
  },
  {
    id: "offline",
    title: "Offline nature",
    body: (
      <p>
        Core scanning and PDF features work offline. Ads and purchases need an internet connection. Third-party system
        features (share targets, email apps, biometric hardware) remain under your device OS and those providers’
        terms.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-party software",
    body: (
      <p>
        Bangla and English OCR uses Tesseract OCR and the tessdata_fast language models (Apache License 2.0,{" "}
        <a href="https://github.com/tesseract-ocr" target="_blank" rel="noopener noreferrer" className={linkClass}>
          github.com/tesseract-ocr
        </a>
        ). Ads are provided by Google AdMob and purchases by Google Play, under Google’s terms.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <p>
        Docyra is provided “as is” without warranties of any kind to the fullest extent permitted by law. There is no
        guarantee of uninterrupted or error-free operation, or of perfect OCR accuracy.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, the developer is not liable for indirect, incidental or consequential
        damages, or for loss of documents stored only on your device. Keep backups of important files.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <p>
        You may stop using the app at any time by uninstalling it. Uninstalling deletes app-local data according to
        your OS behavior.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
          {SUPPORT_EMAIL}
        </a>
      </p>
    ),
  },
];

export default function DocyraTermsPage() {
  return (
    <>
      <PageTransition>
        <main className="flex-1 pt-2 sm:pt-3">
          <Panel tone="light" labelledBy="terms-title" className="px-5 pb-10 pt-24 sm:px-10 sm:pb-14 sm:pt-28">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/work/docyra"
                transitionTypes={["nav-back"]}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition hover:bg-ink hover:text-panel"
              >
                <span aria-hidden>←</span> Docyra
              </Link>
              <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium">
                <span aria-hidden className="h-2 w-2 rounded-full bg-live" />
                Updated {UPDATED}
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/projects/docyra-icon.png"
                    alt="Docyra icon"
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-2xl border border-line sm:h-14 sm:w-14"
                  />
                  <p className="eyebrow text-muted">Docyra · Legal</p>
                </div>
                <h1 id="terms-title" className="display mt-6 text-[19vw] sm:text-9xl">
                  Terms of Use
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  By downloading or using Docyra, you agree to these Terms of Use.
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-6 border-t border-line-strong pt-6 lg:grid-cols-1 lg:border-0 lg:pt-0 lg:text-right">
                <div>
                  <dt className="eyebrow text-muted">Developer</dt>
                  <dd className="mt-1.5 font-medium">{site.fullName}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">Platform</dt>
                  <dd className="mt-1.5 font-medium">Android</dd>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <dt className="eyebrow text-muted">See also</dt>
                  <dd className="mt-1.5 font-medium">
                    <Link href="/docyra/privacy" className={linkClass}>
                      Privacy Policy
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            <ul className="mt-12 grid gap-3 sm:grid-cols-3">
              {glance.map((g, i) => (
                <li
                  key={g.label}
                  className={`rounded-[1.5rem] p-6 ${i === 0 ? "bg-inverse text-on-inverse" : "border border-line-strong"}`}
                >
                  <p className={`eyebrow ${i === 0 ? "text-on-inverse-muted" : "text-muted"}`}>{g.label}</p>
                  <p className="mt-3 text-xl font-semibold leading-snug">{g.value}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel tone="gray" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
              <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
                <p className="eyebrow text-muted">On this page</p>
                <ol className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="focus-ring group flex gap-3 py-0.5 text-muted transition hover:text-ink">
                        <span className="font-mono tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="max-w-3xl">
                {sections.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-labelledby={`${s.id}-title`}
                    className="scroll-mt-28 border-t border-line-strong py-8 first:border-t-0 first:pt-0 sm:py-10"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="eyebrow tabular-nums text-muted">({String(i + 1).padStart(2, "0")})</span>
                      <h2 id={`${s.id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {s.title}
                      </h2>
                    </div>
                    <div className="mt-5 text-[1.05rem] leading-relaxed text-ink/80">{s.body}</div>
                  </section>
                ))}
              </div>
            </div>
          </Panel>

          <Panel tone="inverse" labelledBy="questions-title" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-on-inverse-muted">Questions?</p>
                <h2 id="questions-title" className="display mt-4 text-[14vw] sm:text-8xl">
                  Get in touch
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-inverse-muted">
                  Docyra is an independent app built and maintained by {site.fullName}. Questions about these terms get
                  a personal reply.
                </p>
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Docyra terms")}`}
                className="focus-ring inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-on-inverse px-6 text-sm font-semibold text-inverse transition hover:opacity-85 lg:self-auto"
              >
                Email support <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Panel>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
