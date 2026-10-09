"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ProjectStage } from "@/components/ProjectStage";
import { ArrowUpRight, Panel, SectionTitle } from "@/components/Section";
import { projects, statusCopy, type Project } from "@/lib/content";

const filters = [
  { id: "all", label: "All" },
  { id: "team", label: "Team products" },
  { id: "personal", label: "My own apps" },
] as const;

type Filter = (typeof filters)[number]["id"];

/** Card that rises into place while its artwork zooms out from 1.3× as it scrolls in. */
function ProjectCard({ project: p, reduce }: { project: Project; reduce: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link ref={ref} href={`/work/${p.id}`} data-cursor="View" className="focus-ring group block rounded-[1.25rem]">
        <div className="relative overflow-hidden rounded-[1.25rem] [transform:translateZ(0)]">
          <motion.div style={reduce ? undefined : { scale }} className="transition-[filter] duration-500 group-hover:brightness-110">
            <ProjectStage project={p} compact className="aspect-[4/3.4]" />
          </motion.div>
          <span className="absolute right-4 top-4 flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </span>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${p.status === "live" ? "bg-live" : "bg-white/60"}`} />
            {statusCopy[p.status]}
            {p.ownership === "team" ? " · Team" : ""}
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="display text-4xl underline-offset-[0.12em] group-hover:underline sm:text-5xl">{p.title}</h3>
            <p className="mt-2 line-clamp-2 max-w-lg leading-relaxed text-muted">{p.description}</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-panel-2 px-3 py-1.5 text-xs font-medium">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = projects.filter(
    (p) => filter === "all" || p.ownership === filter,
  );

  return (
    <Panel id="projects" tone="light" labelledBy="work-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <p className="max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
          Seven apps across Quran, finance, fuel, health and on-device AI.
          Four are live on the stores and used every day.
        </p>
        <div className="flex lg:justify-end">
          <a
            href="#contact"
            className="focus-ring flex h-28 w-28 items-center justify-center rounded-full border border-line-strong text-center text-sm font-semibold uppercase leading-tight transition hover:bg-ink hover:text-panel sm:h-32 sm:w-32 sm:text-base"
          >
            Get in
            <br />
            touch
          </a>
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle id="work-heading" title="Selected work" counter="02" kicker="Seven apps · four live on the stores" />
      </div>

      <div role="tablist" aria-label="Filter projects" className="no-scrollbar -mx-5 mt-8 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f.id ? "bg-ink text-panel" : "text-muted hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Two staggered columns; re-mounted on filter change so cards animate in again */}
      <div key={filter} className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
        {[0, 1].map((col) => (
          <div key={col} className={`flex flex-col gap-12 lg:gap-16 ${col === 1 ? "md:pt-40" : ""}`}>
            {visible
              .filter((_, i) => i % 2 === col)
              .map((p) => (
                <ProjectCard key={p.id} project={p} reduce={!!reduce} />
              ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}
