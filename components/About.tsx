import { CountUp, Panel, Reveal, ScrollWords } from "@/components/Section";
import { site } from "@/lib/content";

const stats = [
  { value: "436", label: "Commits, Apr – Oct 2026" },
  { value: "78", label: "Days shipping code" },
  { value: "4", label: "Apps live on the stores" },
  { value: "EN·BN", label: "Every app localized" },
];

export function About() {
  return (
    <Panel id="about" tone="inverse" labelledBy="about-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <div className="flex items-start justify-between">
        <h2 id="about-heading" className="display text-[26vw] sm:text-[20vw] lg:text-[14rem]">
          <Reveal>
            <span className="inline-block -skew-x-12 text-on-inverse-muted">/</span>
            About
          </Reveal>
        </h2>
        <p className="eyebrow pt-3 text-on-inverse-muted">01/05</p>
      </div>

      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <svg
          viewBox="0 0 100 100"
          aria-hidden
          className="hidden h-40 w-40 text-on-inverse-muted lg:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="square"
        >
          <path d="M14 86 84 16M30 16h54v54" />
        </svg>
        <div>
          <ScrollWords
            text={`“${site.about[0]} ${site.about[1]}”`}
            className="text-2xl font-medium leading-snug tracking-tight sm:text-[2.1rem] sm:leading-[1.25]"
          />
          <p className="mt-6 max-w-2xl leading-relaxed text-on-inverse-muted">
            {site.about[2]}
          </p>
          <p className="eyebrow mt-8">
            Currently working with Onesttech Software Solutions as a Flutter developer
          </p>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-2 border-t border-inverse-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`border-inverse-line py-6 ${i % 2 === 0 ? "pr-4" : "border-l pl-4"} lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0`}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd className="display text-5xl sm:text-7xl"><CountUp value={s.value} /></dd>
            <dd className="mt-2 text-sm text-on-inverse-muted">{s.label}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
