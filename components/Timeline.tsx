import type { ReactNode } from "react";
import { Panel, SectionTitle } from "@/components/Section";
import { education, experience } from "@/lib/content";

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-6 border-t border-inverse-line pt-6 lg:grid-cols-[12rem_1fr] lg:gap-10">
      <h3 className="eyebrow text-on-inverse-muted">{label}</h3>
      <ul>{children}</ul>
    </div>
  );
}

/** Where I've worked and studied: the role in detail, then degrees with their grades. */
export function Timeline() {
  return (
    <Panel id="experience" tone="inverse" labelledBy="experience-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <SectionTitle id="experience-heading" title="Experience" counter="07" kicker="Work & education" aside="436 commits in 2026" />

      <div className="mt-12 flex flex-col gap-14">
        <Group label="Work">
          {experience.map((job) => (
            <li key={job.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{job.title}</p>
                <p className="font-mono text-sm text-on-inverse-muted">{job.period}</p>
              </div>
              <p className="mt-1 text-lg">{job.org}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-on-inverse-muted">{job.summary}</p>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-inverse-line bg-inverse-line sm:grid-cols-2 lg:grid-cols-5">
                {job.apps.map((a) => (
                  <li key={a.name} className="bg-inverse p-4">
                    <p className="font-semibold">{a.name}</p>
                    <p className="mt-1 text-sm text-on-inverse-muted">{a.detail}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Group>

        <Group label="Education">
          {education.map((e) => (
            <li
              key={e.title}
              className="grid gap-2 border-b border-inverse-line py-6 first:pt-0 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
            >
              <div>
                <p className="text-xl font-semibold tracking-tight sm:text-2xl">{e.title}</p>
                <p className="mt-1 text-on-inverse-muted">
                  {e.org}
                  {e.period ? <span className="font-mono text-sm"> · {e.period}</span> : null}
                </p>
                {e.note ? <p className="mt-2 text-sm text-on-inverse-muted">{e.note}</p> : null}
              </div>
              <p className="justify-self-start rounded-full border border-inverse-line px-4 py-2 font-mono text-sm sm:justify-self-end">
                {e.grade}
              </p>
            </li>
          ))}
        </Group>
      </div>
    </Panel>
  );
}
