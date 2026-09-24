import { MotionSection } from "@/components/MotionSection";
import { skillGroups } from "@/lib/content";

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
        How I build
      </h2>
      <p className="mt-4 max-w-xl text-foreground-muted">
        An architecture map — mobile delivery, systems thinking, and CS
        foundations — not percentage bars.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.id} className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {group.title}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              {group.description}
            </p>
            <ul className="mt-5 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-accent/40 pl-3 text-sm text-foreground-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
