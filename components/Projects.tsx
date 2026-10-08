"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type Project } from "@/lib/content";

const filters = [
  { id: "all", label: "All work" },
  { id: "team", label: "Team products" },
  { id: "personal", label: "My own apps" },
] as const;

type Filter = (typeof filters)[number]["id"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = projects.filter(
    (p: Project) => filter === "all" || p.ownership === filter,
  );

  return (
    <MotionSection
      id="projects"
      ariaLabelledBy="projects-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4">Selected work</p>
          <h2
            id="projects-heading"
            className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl"
          >
            Apps I&apos;ve{" "}
            <span className="font-serif font-normal italic tracking-normal text-accent">
              built & shipped
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-foreground-muted">
            Team products I contribute to at Onesttech, and apps I&apos;ve
            built on my own from first commit to store.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter projects"
          className="inline-flex shrink-0 self-start rounded-full border border-white/10 bg-white/[0.03] p-1 md:self-auto"
        >
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`focus-ring relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "text-background"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={project.wide ? "lg:col-span-2" : undefined}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </MotionSection>
  );
}
