import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ArrowUpRight, Panel } from "@/components/Section";

const UPDATED = "November 2026";

const SUPPORT_EMAIL = "irrdevlabs.support@gmail.com";
const ORG = "Ukil Para Sports & Human Welfare Association";
const LOCATION = "Ukil Para, East Damudya, Damudya, Shariatpur, Bangladesh";

const title = "Privacy Policy — Ukil Para Sangha";
const description = `Privacy Policy for the Ukil Para Sangha app of ${ORG}, built and maintained by IRRDevLabs.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ukilpara/privacy" },
  openGraph: { type: "article", url: "/ukilpara/privacy", title, description },
  twitter: { card: "summary", title, description },
};

const glance = [
  { label: "Your data", value: "Never sold, rented or monetized" },
  { label: "Ads", value: "None, ever" },
  { label: "Delete your account", value: "In the app or by email" },
];

const linkClass = "underline decoration-line-strong underline-offset-4 transition hover:decoration-ink";

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

const b = (text: string) => <strong className="font-semibold text-ink">{text}</strong>;

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "overview",
    title: "Overview & purpose",
    body: (
      <>
        <p>
          This Privacy Policy describes how {b(ORG)} (“the Organization”, “we”, “our”, or “us”), in partnership with
          developer {b("IRRDevLabs")}, collects, uses, protects, and discloses personal information through the{" "}
          {b("Ukil Para Sangha")} mobile application.
        </p>
        <p className="mt-4">
          The Ukil Para Sangha app is an internal, non-profit community platform established solely to facilitate social
          welfare, member communication, voluntary blood donation coordination, and transparent community accounting.{" "}
          {b("We do not sell, rent, monetize, or broker your personal information. No commercial advertisements are served.")}
        </p>
      </>
    ),
  },
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          We only collect personal information that members and users voluntarily provide when joining the association or
          using the application:
        </p>
        <List
          items={[
            <>
              {b("Member identification:")} full name (English and Bengali), father’s and mother’s names, date of birth,
              occupation, village/residential area, and postal address.
            </>,
            <>
              {b("Google account:")} when you sign in with Google, your name, email address and Google profile picture
              (see Sign-in with Google below).
            </>,
            <>
              {b("Contact details:")} primary mobile phone number and optional WhatsApp number used for emergency club
              alerts and membership authentication.
            </>,
            <>
              {b("Optional NID or birth registration number:")} an applicant may give their national ID or birth
              registration number (numbers only, never an image). It is kept in a separate private record that only the
              President and the General Secretary can see, and it is never shown in the member directory.
            </>,
            <>
              {b("Voluntary blood donor data:")} blood group (A+, A-, B+, B-, O+, O-, AB+, AB-), donation availability
              readiness, and last donation date. This information is exclusively used to coordinate emergency blood
              donation requests within the community.
            </>,
            <>
              {b("Profile and event media:")} profile photographs uploaded by members for identity verification, and
              photos from community social programs (sports tournaments, flood relief, humanitarian aid, winter clothing
              distribution) shared with consent.
            </>,
            <>
              {b("Membership dues & accounting records:")} transparent digital records of monthly membership dues and
              welfare funds. The app does not collect or process credit/debit card numbers or bank account credentials.
              All transactions are recorded for internal club accounting and transparency only.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "purpose",
    title: "Purpose of data processing",
    body: (
      <>
        <p>We process your personal information strictly for the following association purposes:</p>
        <List
          items={[
            "Verifying and managing membership eligibility in accordance with the Sangha Constitution.",
            "Enabling voluntary blood donors to be contacted during critical medical emergencies.",
            "Maintaining transparent, auditable internal records of club dues, donations, and welfare spending.",
            "Delivering official organizational notices, executive meeting invitations, and urgent community announcements.",
            "Ensuring account security and preventing unauthorized access or impersonation.",
          ]}
        />
      </>
    ),
  },
  {
    id: "sign-in",
    title: "Sign-in with Google",
    body: (
      <>
        <p>
          Members sign in with their Google account. The app asks Google only for basic sign-in information (the{" "}
          <code className="text-[0.95em]">openid</code>, <code className="text-[0.95em]">email</code> and{" "}
          <code className="text-[0.95em]">profile</code> scopes): your name, email address and profile picture. Google
          confirms who you are to our database provider, Supabase; the app never sees or stores your Google password.
        </p>
        <List
          items={[
            "Your email address links your Google account to your membership record and is used to recognize you when you sign in again and to verify deletion requests.",
            "Your email address is not shown to other members.",
            "We do not read your Gmail, contacts, calendar, Drive or any other Google data.",
            <>
              You can remove the app’s access at any time in your Google account under{" "}
              {b("Security → Third-party apps & services")}.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "analytics",
    title: "Crash reports and analytics (Firebase)",
    body: (
      <>
        <p>
          To find and fix crashes and to understand how the app is used, the app uses Google Firebase Crashlytics and
          Firebase Analytics. These may collect crash details (the error, the screen it happened on, the app version),
          device information (model, Android version, language) and app activity such as which screens and features are
          used, together with identifiers used by Google’s services.
        </p>
        <List
          items={[
            "Your phone number, blood group, date of birth, parents’ names, NID or birth registration number, address, money amounts and photos are never sent to Crashlytics or Analytics.",
            "Crash reports are collected only in the release version of the app.",
            "This data is used only to keep the app working and improve it. It is not used for advertising, and it is not used to identify you as a person.",
          ]}
        />
        <p className="mt-4">
          Data is processed by Google under its terms. Learn more:{" "}
          <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>
            https://firebase.google.com/support/privacy
          </a>
        </p>
      </>
    ),
  },
  {
    id: "permissions",
    title: "Device permissions",
    body: (
      <>
        <p>The application may request access to specific device features to enable core functionality:</p>
        <dl className="mt-4 divide-y divide-line-strong border-y border-line-strong">
          {[
            ["Camera", "Only if you choose to take a profile picture directly with your device’s camera or capture paper receipts/documents for club verification."],
            ["Photos & storage", "Only to let members select and upload profile photos or event gallery photos from their device."],
            ["Push notifications", "Critical updates, such as emergency blood requests, meeting notices, and official club announcements."],
            ["Internet", "To sign in with Google, communicate securely with our encrypted database servers, and send crash reports and analytics through Firebase."],
          ].map(([name, use]) => (
            <div key={name} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
              <dt className="font-semibold text-ink">{name}</dt>
              <dd>{use}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4">
          We strictly do {b("not")} access background location, contact address books, SMS text messages, microphone
          audio, or call history logs.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Data protection & security",
    body: (
      <List
        items={[
          <>
            {b("Encryption in transit:")} all communications between the mobile application and backend services are
            encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS).
          </>,
          <>
            {b("Access control & row-level security:")} database records are guarded by strict Row Level Security (RLS)
            policies, ensuring that sensitive information is accessible only to authorized club representatives and the
            member themselves.
          </>,
          <>
            {b("Third-party infrastructure:")} data is hosted on enterprise-grade cloud database infrastructure (Supabase
            PostgreSQL), Google Sign-In, and Google Firebase (Cloud Messaging for notifications, Crashlytics and Analytics
            as described above), adhering to global data protection standards (SOC 2, GDPR).
          </>,
          <>
            {b("Zero commercial sharing:")} we do not partner with ad networks, data brokers, or marketing platforms.
            Firebase Analytics is used only to understand app usage, as described above.
          </>,
        ]}
      />
    ),
  },
  {
    id: "controls",
    title: "Privacy controls & your rights",
    body: (
      <List
        items={[
          <>
            {b("Phone number privacy:")} members can toggle the “Share Phone Number” setting in their profile to determine
            whether other general members can view their contact number or if it remains restricted to the Executive
            Committee.
          </>,
          <>
            {b("Blood donor opt-in / opt-out:")} members can choose whether or not to be listed as an active blood donor,
            toggle their availability, or remove themselves from the donor directory at any time through the Donor Profile
            screen.
          </>,
          <>
            {b("Profile updates:")} members can review, update, or correct their contact number, address, occupation, and
            profile photo directly in the app.
          </>,
        ]}
      />
    ),
  },
  {
    id: "deletion",
    title: "Account & data deletion",
    body: (
      <>
        <p>
          In full compliance with Google Play Developer Policies and data protection standards, users have the right to
          permanently delete their account and associated personal data.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          <li className="rounded-[1.25rem] border border-line-strong p-5">
            <p className="eyebrow text-muted">1 · In the app</p>
            <p className="mt-2">
              Open the app and go to {b("More → My Profile → Resign / Delete Account")} to submit a formal deletion
              request.
            </p>
          </li>
          <li className="rounded-[1.25rem] border border-line-strong p-5">
            <p className="eyebrow text-muted">2 · By email</p>
            <p className="mt-2">
              Email{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Account Deletion Request - Ukil Para Sangha")}`}
                className={linkClass}
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              from your registered email address with the subject “Account Deletion Request - Ukil Para Sangha”. Include
              your full name and registered phone number.
            </p>
          </li>
        </ol>
        <p className="mt-5">
          Upon receipt and verification of your request, all personal data, contact records, profile media, and
          authentication credentials will be permanently erased from our production databases within{" "}
          {b("7 business days")}, except where limited anonymized transaction logs are legally required for club audit
          archives.
        </p>
        <List
          items={[
            <>
              {b("Deleted:")} your name, parents’ names, date of birth, phone and WhatsApp numbers, address, occupation,
              email address and Google sign-in link, profile photo, blood donor details, and your NID or birth
              registration number.
            </>,
            <>
              {b("Kept, without your name:")} the club’s ledger must stay complete, so your past dues payments and your
              attendance in meeting records remain, shown only as “সাবেক সদস্য UPS-00NN” (former member and member code).
              These records can no longer be linked to you by name.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "children",
    title: "Children’s privacy",
    body: (
      <p>
        Our application is not targeted towards children under the age of 13. We do not knowingly collect personal
        identifiable information from children under 13 without verified parental or guardian consent.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Updates to this policy",
    body: (
      <p>
        We may update this Privacy Policy periodically to reflect organizational changes, constitutional amendments, or
        legal requirements. When updates occur, we will revise the date at the top of this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us & support",
    body: (
      <dl className="mt-1 divide-y divide-line-strong border-y border-line-strong">
        {[
          ["Developer & technical maintainer", "IRRDevLabs"],
          [
            "Support email",
            <a key="mail" href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
              {SUPPORT_EMAIL}
            </a>,
          ],
          ["Organization", ORG],
          ["Location", LOCATION],
        ].map(([name, value]) => (
          <div key={String(name)} className="grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
            <dt className="font-semibold text-ink">{name}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
];

export default function UkilParaPrivacyPage() {
  return (
    <>
      <PageTransition>
        <main className="flex-1 pt-2 sm:pt-3">
          <Panel tone="light" labelledBy="policy-title" className="px-5 pb-10 pt-24 sm:px-10 sm:pb-14 sm:pt-28">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/work/ukilpara"
                transitionTypes={["nav-back"]}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition hover:bg-ink hover:text-panel"
              >
                <span aria-hidden>←</span> Ukil Para Sangha
              </Link>
              <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium">
                <span aria-hidden className="h-2 w-2 rounded-full bg-live" />
                Effective {UPDATED}
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/projects/ukilpara-icon.png"
                    alt="Ukil Para Sangha icon"
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-2xl border border-line sm:h-14 sm:w-14"
                  />
                  <p className="eyebrow text-muted">{ORG} · Legal</p>
                </div>
                <h1 id="policy-title" className="display mt-6 text-[19vw] sm:text-9xl">
                  Privacy Policy
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  How the Ukil Para Sangha app of {ORG} collects, uses and protects members’ information.
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-6 border-t border-line-strong pt-6 lg:grid-cols-1 lg:border-0 lg:pt-0 lg:text-right">
                <div className="col-span-2 lg:col-span-1">
                  <dt className="eyebrow text-muted">Organization</dt>
                  <dd className="mt-1.5 font-medium">{ORG}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">Developer</dt>
                  <dd className="mt-1.5 font-medium">IRRDevLabs</dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">Platform</dt>
                  <dd className="mt-1.5 font-medium">Android</dd>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <dt className="eyebrow text-muted">Support</dt>
                  <dd className="mt-1.5 font-medium">
                    <a href={`mailto:${SUPPORT_EMAIL}`} className={`${linkClass} break-all`}>
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
                  The Ukil Para Sangha app is built and maintained by IRRDevLabs for {ORG}.
                </p>
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Ukil Para Sangha privacy")}`}
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
