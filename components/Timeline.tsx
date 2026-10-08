import { Panel, SectionTitle } from "@/components/Section";
import { experienceRows } from "@/lib/content";

export function Timeline() {
  return (
    <Panel id="experience" tone="inverse" labelledBy="experience-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <SectionTitle
        id="experience-heading"
        title="Experience"
        watermark="Experience"
        aside={<span className="text-on-inverse-muted">05/05<span className="hidden sm:inline"> · 436 commits in 2026</span></span>}
      />

      <ul className="mt-10">
        {experienceRows.map((row) => (
          <li
            key={row.org}
            className="flex flex-col gap-1 border-b border-inverse-line py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-2"
          >
            <div>
              <p className="text-lg font-medium">{row.org}</p>
              <p className="text-on-inverse-muted">{row.role}</p>
            </div>
            <p className="shrink-0 font-mono text-sm text-on-inverse-muted">{row.period}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
