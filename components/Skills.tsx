import { MotionSection } from "@/components/MotionSection";
import { skillGroups } from "@/lib/content";

export function Skills() {
  return (
    <MotionSection
      id="skills"
      ariaLabelledBy="skills-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <p className="eyebrow mb-4">Stack</p>
      <h2
        id="skills-heading"
        className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl"
      >
        What I{" "}
        <span className="font-serif font-normal italic tracking-normal text-accent">
          build with
        </span>
      </h2>
      <p className="mt-4 max-w-xl text-foreground-muted">
        The tools behind the apps above, grouped by the problems they solve.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <div
            key={group.id}
            className="rounded-3xl border border-white/[0.08] bg-background-elevated p-6"
          >
            <p className="font-mono text-xs text-foreground-muted">
              0{i + 1}
            </p>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
              {group.title}
            </h3>
            <p className="mt-1 text-sm text-foreground-muted">
              {group.description}
            </p>
            <ul className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-foreground/80">
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
