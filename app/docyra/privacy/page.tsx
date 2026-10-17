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

const title = "Privacy Policy — Docyra";
const description = "Privacy Policy for Docyra, an offline-first document scanner for Android by Ishmak Rahat Rafi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/docyra/privacy" },
  openGraph: { type: "article", url: "/docyra/privacy", title, description },
  twitter: { card: "summary", title, description },
};

const glance = [
  { label: "Your documents", value: "Never leave your phone" },
  { label: "Account", value: "None required" },
  { label: "Ads", value: "Free plan only, via AdMob" },
];

const linkClass = "underline decoration-line-strong underline-offset-4 transition hover:decoration-ink";

function Ext({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>
      {href}
    </a>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <p>
        Your documents stay on your device. Scanning, cropping, filters, OCR (English and Bangla), PDF creation, PDF
        tools and library storage all run locally. There is no Docyra cloud account, and your scans, PDFs or
        recognized text are never uploaded.
      </p>
    ),
  },
  {
    id: "on-device",
    title: "Information stored on your device",
    body: (
      <List
        items={[
          "Scanned images and PDFs you create or import",
          "Favorites, trash (soft-deleted items kept for a limited recovery period), folders and library metadata",
          "App preferences (theme, scan quality, haptics, OCR language)",
          "Optional biometric lock setting (biometrics are handled by your device OS)",
          "Docyra Pro subscription status and free-plan usage counters (for daily limits)",
          "Optional trial-reminder preference (whether to notify you before a free trial ends)",
        ]}
      />
    ),
  },
  {
    id: "advertising",
    title: "Advertising (Google AdMob)",
    body: (
      <>
        <p>
          The free version of Docyra shows ads provided by Google AdMob. To serve, measure and personalize ads and to
          prevent fraud, Google may collect and process information such as your device’s advertising ID and other
          device identifiers, IP address (and approximate location derived from it), and app interaction and
          diagnostic data.
        </p>
        <List
          items={[
            "Ads never receive your documents, scanned images, PDFs or recognized text.",
            <>
              In the EEA, UK and Switzerland, consent is requested through Google’s consent form before ads are
              requested. You can change your choice at any time in <strong className="font-semibold">Account → Ad privacy choices</strong>.
            </>,
            <>
              You can reset your advertising ID or opt out of personalized ads in your Android settings
              (<strong className="font-semibold">Google → Ads</strong>).
            </>,
            "Docyra Pro users do not see ads, and no ads are requested for them.",
          ]}
        />
        <p className="mt-4">
          Learn how Google uses data: <Ext href="https://policies.google.com/technologies/partner-sites" />
        </p>
      </>
    ),
  },
  {
    id: "purchases",
    title: "Purchases (Google Play)",
    body: (
      <p>
        Docyra Pro is sold as a subscription through Google Play (monthly or yearly, which may include a free trial).
        Payment is handled entirely by Google; the developer never receives your card or payment details. The app
        receives a purchase confirmation from Google Play to unlock Pro and stores your Pro status on your device.
        Google’s privacy policy applies to the payment: <Ext href="https://policies.google.com/privacy" />
      </p>
    ),
  },
  {
    id: "notifications",
    title: "Local notifications (trial reminder)",
    body: (
      <p>
        If you start a free trial and leave “Remind me before trial ends” on, Docyra may schedule a local notification
        on your device a few days before the trial ends. That reminder is stored and delivered only on your device — it
        is not sent through any server. You can turn the toggle off before purchase, or deny notification permission
        when Android asks. Uninstalling the app removes scheduled reminders.
      </p>
    ),
  },
  {
    id: "internet",
    title: "Internet use",
    body: (
      <p>
        Scanning, PDF tools and OCR work without an internet connection. The app uses the internet only to load ads and
        the consent form, and to buy or restore Docyra Pro through Google Play.
      </p>
    ),
  },
  {
    id: "not-collected",
    title: "Information not collected",
    body: (
      <List
        items={[
          "You are never required to create an account",
          "Your documents are never uploaded to any server",
          "Your personal data is never sold",
          "There is no developer-run analytics or crash-reporting backend for document content",
        ]}
      />
    ),
  },
  {
    id: "permissions",
    title: "Permissions",
    body: (
      <dl className="mt-1 divide-y divide-line-strong border-y border-line-strong">
        {[
          ["Camera", "Scanning documents and ID cards"],
          ["Photos / files", "Import and export"],
          ["Biometric", "Optional app lock (handled by your device OS)"],
          ["Notifications", "Optional trial-end reminder only"],
          ["Internet & advertising ID", "Google AdMob and Google Play as described above"],
        ].map(([name, use]) => (
          <div key={name} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
            <dt className="font-semibold text-ink">{name}</dt>
            <dd>{use}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "sharing",
    title: "Sharing",
    body: (
      <p>
        When you use Share, Export or Save to Photos, files leave the app only through the system share sheet or
        gallery APIs you trigger.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children’s privacy",
    body: (
      <p>
        Docyra is not directed at children under 13, and its ads are not designed for children. Do not use the app to
        store a child’s personal data if that would violate applicable law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        This policy may be updated. The “Last updated” date will change when it is. Continued use after updates means
        you accept the revised policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about privacy:{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
          {SUPPORT_EMAIL}
        </a>
      </p>
    ),
  },
];

export default function DocyraPrivacyPage() {
  return (
    <>
      <PageTransition>
        <main className="flex-1 pt-2 sm:pt-3">
          <Panel tone="light" labelledBy="policy-title" className="px-5 pb-10 pt-24 sm:px-10 sm:pb-14 sm:pt-28">
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
                <h1 id="policy-title" className="display mt-6 text-[19vw] sm:text-9xl">
                  Privacy Policy
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  Docyra is an offline-first document scanner. This policy explains what information the app handles,
                  and how.
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
                  <dt className="eyebrow text-muted">Support</dt>
                  <dd className="mt-1.5 font-medium">
                    <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
                      {SUPPORT_EMAIL}
                    </a>
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
                  Docyra is an independent app built and maintained by {site.fullName}. Privacy questions get a personal
                  reply.
                </p>
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Docyra privacy")}`}
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
