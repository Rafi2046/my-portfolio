import { Panel, SectionTitle } from "@/components/Section";
import { experienceRows } from "@/lib/content";

export function Timeline() {
  return (
    <Panel id="experience" tone="inverse" labelledBy="experience-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <SectionTitle id="experience-heading" title="Experience" counter="06" kicker="Where I have shipped" aside="436 commits in 2026" />

      <ul className="mt-12 border-t border-inverse-line">
        {experienceRows.map((row, i) => (
          <li key={row.org} className="group relative overflow-hidden border-b border-inverse-line">
            {/* Fill that rises behind the row on hover */}
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-on-inverse transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
            />
            <div className="relative grid gap-1 py-6 transition-colors duration-500 group-hover:text-inverse sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-6 sm:px-3 sm:py-8">
              <span className="eyebrow hidden opacity-50 sm:block">0{i + 1}</span>
              <div>
                <p className="display text-3xl sm:text-5xl">{row.org}</p>
                <p className="mt-1 opacity-60">{row.role}</p>
              </div>
              <p className="font-mono text-sm opacity-60">{row.period}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
