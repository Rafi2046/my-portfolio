import Image from "next/image";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

const statusCopy: Record<Project["status"], string> = {
  live: "Live",
  building: "In development",
  prototype: "Prototype",
};

function ProjectMedia({ project }: ProjectCardProps) {
  const { media } = project;

  switch (media.kind) {
    case "banner":
      return (
        <>
          {/* Blurred copy fills the panel so any aspect ratio sits cleanly. */}
          <Image
            src={media.src}
            alt=""
            fill
            aria-hidden
            className="scale-125 object-cover opacity-40 blur-2xl"
            sizes="10vw"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
            <Image
              src={media.src}
              alt={`${project.title} store artwork`}
              width={media.width}
              height={media.height}
              className="h-auto max-h-full w-auto max-w-full rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>
        </>
      );
    case "phone":
      return (
        <div className="absolute inset-x-0 bottom-0 top-8 flex justify-center">
          <div className="relative h-[115%] overflow-hidden rounded-[2rem] border-[6px] border-[#1b1e25] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition duration-500 group-hover:-translate-y-2">
            <Image
              src={media.src}
              alt={`${project.title} app screen`}
              width={media.width}
              height={media.height}
              className="h-full w-auto"
              sizes="300px"
            />
          </div>
        </div>
      );
    case "icon":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute h-48 w-48 rounded-full bg-sky-400/20 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <span className="absolute -inset-6 rounded-[2.25rem] border border-dashed border-white/15" aria-hidden />
            <Image
              src={project.icon}
              alt={`${project.title} app icon`}
              width={160}
              height={160}
              className="relative h-32 w-32 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition duration-500 group-hover:scale-105 sm:h-36 sm:w-36"
            />
          </div>
        </div>
      );
    case "collage":
      return (
        <div className="absolute inset-0 flex items-center justify-center gap-3 px-6">
          {media.srcs.map((src, i) => (
            <div
              key={src}
              className={`relative aspect-[3/4] w-1/3 max-w-40 overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition duration-500 ${
                i === 1
                  ? "-translate-y-3 group-hover:-translate-y-5"
                  : i === 0
                    ? "-rotate-6 group-hover:-rotate-8"
                    : "rotate-6 group-hover:rotate-8"
              }`}
            >
              <Image
                src={src}
                alt={i === 1 ? `Herbs recognised by ${project.title}` : ""}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          ))}
        </div>
      );
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const wide = Boolean(project.wide);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-background-elevated transition-colors duration-300 hover:border-white/[0.16] ${
        wide ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          wide ? "aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[26rem]" : "aspect-[16/10]"
        }`}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${project.tint} 90%, white 10%), ${project.tint} 45%, #0b0d11 100%)`,
        }}
      >
        <ProjectMedia project={project} />
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${wide ? "lg:justify-center" : ""}`}>
        <div className="flex items-center gap-3">
          <Image
            src={project.icon}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl ring-1 ring-white/10"
          />
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <p className="truncate text-sm text-foreground-muted">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
              project.status === "live"
                ? "bg-accent/15 text-accent"
                : "bg-white/[0.06] text-foreground-muted"
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${
                project.status === "live" ? "bg-accent" : "bg-foreground-muted"
              }`}
            />
            {statusCopy[project.status]}
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
            {project.role}
          </span>
        </div>

        <p className="mt-5 leading-relaxed text-foreground/80">
          {project.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-sm leading-relaxed text-foreground-muted"
            >
              <span
                aria-hidden
                className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-white/[0.04] px-2 py-1 text-xs text-foreground-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            {project.android ? (
              <a
                href={project.android}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-foreground transition hover:border-accent hover:text-accent"
              >
                Google Play ↗
              </a>
            ) : null}
            {project.ios ? (
              <a
                href={project.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-foreground transition hover:border-accent hover:text-accent"
              >
                App Store ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
