import { MotionSection } from "@/components/MotionSection";
import { timeline } from "@/lib/content";

export function Timeline() {
  return (
    <MotionSection
      id="experience"
      ariaLabelledBy="experience-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Career
      </p>
      <h2
        id="experience-heading"
        className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Experience &amp; education
      </h2>
      <p className="mt-4 max-w-xl text-foreground-muted">
        A concise path — production Flutter work first, foundations always
        underneath.
      </p>

      <ol className="relative mt-12 space-y-0 border-l border-glass-border pl-8">
        {timeline.map((item) => (
          <li key={item.id} className="relative pb-10 last:pb-0">
            <span
              className="absolute -left-[2.4rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/60 bg-background shadow-[0_0_12px_rgba(34,211,238,0.45)]"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {item.type === "experience" ? "Experience" : "Education"} ·{" "}
              {item.period}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-accent-soft">
              {item.org}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
              {item.summary}
            </p>
          </li>
        ))}
      </ol>
    </MotionSection>
  );
}
