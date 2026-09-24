import { MotionSection } from "@/components/MotionSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export function Projects() {
  const featured = projects.filter((p) => p.kind === "featured");
  const labs = projects.filter((p) => p.kind === "lab");

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
        Featured apps
      </h2>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Production Flutter work on the stores — expand any card for challenge,
        architecture, and outcome.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-20">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Architecture labs
        </h3>
        <p className="mt-3 max-w-xl text-sm text-foreground-muted">
          Exploratory case studies for clean architecture and compiler design —
          not store listings, but the engineering depth behind shipping well.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {labs.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
