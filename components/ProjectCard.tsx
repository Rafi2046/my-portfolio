"use client";

import { useCallback, useId, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [transform, setTransform] = useState(
    "perspective(900px) rotateX(0deg) rotateY(0deg)",
  );
  const [glowing, setGlowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || expanded || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * 10;
      const rotateX = ((midY - y) / midY) * 10;
      setTransform(
        `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      );
    },
    [reduceMotion, expanded],
  );

  const reset = useCallback(() => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg)");
    setGlowing(false);
  }, []);

  return (
    <div
      ref={ref}
      role="article"
      onMouseMove={handleMove}
      onMouseEnter={() => setGlowing(true)}
      onMouseLeave={reset}
      style={{
        transform: expanded
          ? "perspective(900px) rotateX(0deg) rotateY(0deg)"
          : transform,
        transition: "transform 120ms ease-out",
      }}
      className={`glass group relative flex h-full flex-col rounded-2xl p-6 will-change-transform ${
        glowing || expanded ? "neon-border border-accent/40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {project.tagline}
        </p>
        {project.kind === "lab" ? (
          <span className="shrink-0 rounded-md border border-glass-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground-muted">
            Lab
          </span>
        ) : (
          <span className="shrink-0 rounded-md border border-accent/30 bg-accent-dim px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent-soft">
            Live
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
        {project.title}
      </h3>
      {project.role ? (
        <p className="mt-1 text-sm text-accent-soft">{project.role}</p>
      ) : null}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted sm:text-base">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-glass-border bg-background/40 px-2.5 py-1 text-xs text-foreground-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="focus-ring text-sm font-medium text-accent-soft underline-offset-4 hover:underline"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Hide case study" : "Case study"}
        </button>
        {project.android ? (
          <a
            href={project.android}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-sm text-foreground-muted underline-offset-4 hover:text-accent-soft hover:underline"
          >
            Android
          </a>
        ) : null}
        {project.ios ? (
          <a
            href={project.ios}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-sm text-foreground-muted underline-offset-4 hover:text-accent-soft hover:underline"
          >
            iOS
          </a>
        ) : null}
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={panelId}
            key="case-study"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <dl className="mt-5 space-y-4 border-t border-glass-border pt-5 text-sm">
              <div>
                <dt className="font-medium text-foreground">Challenge</dt>
                <dd className="mt-1 text-foreground-muted">
                  {project.caseStudy.challenge}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Architecture</dt>
                <dd className="mt-1 text-foreground-muted">
                  {project.caseStudy.architecture}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Outcome</dt>
                <dd className="mt-1 text-foreground-muted">
                  {project.caseStudy.outcome}
                </dd>
              </div>
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
