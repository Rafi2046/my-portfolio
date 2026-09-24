import { MotionSection } from "@/components/MotionSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <MotionSection
      id="projects"
      ariaLabelledBy="projects-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Projects
      </p>
      <h2
        id="projects-heading"
        className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Technical case studies
      </h2>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Placeholder explorations spanning Flutter architecture, compiler
        design, and mobile systems — swap these for production case studies
        anytime via{" "}
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-accent-soft">
          lib/content.ts
        </code>
        .
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </MotionSection>
  );
}
