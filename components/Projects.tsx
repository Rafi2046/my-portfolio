"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Panel, SectionTitle } from "@/components/Section";
import { projects, statusCopy, type Project } from "@/lib/content";

const filters = [
  { id: "all", label: "All" },
  { id: "team", label: "Team products" },
  { id: "personal", label: "My own apps" },
] as const;

type Filter = (typeof filters)[number]["id"];

export function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<Project | null>(null);

  // Cursor-following preview (pointer devices only, hidden on touch via CSS).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  function onMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

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
        <SectionTitle id="work-heading" title="Selected work" watermark="Portfolio" counter="02/05" />
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

      <div className="relative mt-4" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        <ul className="border-t border-dashed border-line-strong">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout={!reduce}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b border-dashed border-line-strong"
              >
                <Link
                  href={`/work/${p.id}`}
                  onMouseEnter={() => setHovered(p)}
                  onFocus={() => setHovered(null)}
                  className="focus-ring group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-6 sm:py-7"
                >
                  <span className="hidden w-8 font-mono text-xs text-muted sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src={p.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="h-11 w-11 rounded-xl border border-line sm:hidden"
                  />
                  <span className="min-w-0">
                    <span className="display block break-words text-[2.6rem] leading-[0.9] sm:truncate sm:leading-[0.86] transition-transform duration-500 group-hover:translate-x-3 sm:text-7xl lg:text-8xl">
                      {p.title}
                    </span>
                    <span className="mt-1 block truncate text-sm text-muted sm:hidden">
                      {p.tagline}
                    </span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden text-right sm:block">
                      <span className="block text-sm font-medium sm:text-base">{p.tagline}</span>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${p.status === "live" ? "bg-live" : "bg-muted"}`}
                        />
                        {statusCopy[p.status]}
                        {p.ownership === "team" ? " · Team" : ""}
                      </span>
                    </span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong transition group-hover:bg-ink group-hover:text-panel">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Floating cover preview that trails the cursor */}
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)]:lg:block"
        >
          <AnimatePresence>
            {hovered ? (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-4 border-panel shadow-2xl"
              >
                <Image src={hovered.cover} alt="" width={340} height={255} className="h-[255px] w-[340px] object-cover" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </Panel>
  );
}
