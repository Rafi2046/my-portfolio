import { MotionSection } from "@/components/MotionSection";
import { timeline } from "@/lib/content";

export function Timeline() {
  return (
    <MotionSection
      id="experience"
      ariaLabelledBy="experience-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <p className="eyebrow mb-4">Experience</p>
      <h2
        id="experience-heading"
        className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl"
      >
        Where I&apos;ve{" "}
        <span className="font-serif font-normal italic tracking-normal text-accent">
          been building
        </span>
      </h2>

      <ol className="mt-12 space-y-5">
        {timeline.map((item) => (
          <li
            key={item.id}
            className="grid gap-6 rounded-3xl border border-white/[0.08] bg-background-elevated p-6 sm:p-8 md:grid-cols-[13rem_1fr]"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                {item.period}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {item.type === "experience" ? "Work" : "Education"}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-foreground/80">{item.org}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-foreground-muted">
                {item.summary}
              </p>
              {item.highlights ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.highlights.map((h) => (
                    <li
                      key={h.name}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {h.name}
                      </p>
                      <p className="mt-1 text-sm text-foreground-muted">
                        {h.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </MotionSection>
  );
}
