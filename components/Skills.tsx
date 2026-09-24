import { MotionSection } from "@/components/MotionSection";
import { skills } from "@/lib/content";

export function Skills() {
  return (
    <MotionSection
      id="skills"
      ariaLabelledBy="skills-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Skills
      </p>
      <h2
        id="skills-heading"
        className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Flutter craft &amp; core CS
      </h2>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Strong foundations in mobile frameworks, system architecture, and
        compiler design — with the tooling that keeps releases reliable.
      </p>

      <ul className="mt-10 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li key={skill.name}>
            <span
              className={
                skill.emphasis
                  ? "inline-flex rounded-lg border border-accent/40 bg-accent-dim px-4 py-2 text-sm font-medium text-accent-soft"
                  : "inline-flex rounded-lg border border-glass-border bg-glass px-4 py-2 text-sm text-foreground-muted backdrop-blur-xl"
              }
            >
              {skill.name}
            </span>
          </li>
        ))}
      </ul>
    </MotionSection>
  );
}
