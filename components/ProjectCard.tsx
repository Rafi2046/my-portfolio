"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(900px) rotateX(0deg) rotateY(0deg)",
  );
  const [glowing, setGlowing] = useState(false);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !ref.current) return;
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
    [reduceMotion],
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
      style={{ transform, transition: "transform 120ms ease-out" }}
      className={`glass group relative flex h-full flex-col rounded-2xl p-6 will-change-transform ${
        glowing ? "neon-border border-accent/40" : ""
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {project.tagline}
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
        {project.title}
      </h3>
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
    </div>
  );
}
