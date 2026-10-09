"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Panel } from "@/components/Section";
import { projects } from "@/lib/content";

// Stage is drawn in a 1200 × 600 box; the hub sits in the middle.
const W = 1200;
const H = 600;
const HUB = { x: 600, y: 330 };

// Outer and inner columns on each side, like spokes feeding the hub.
const SLOTS = [
  { x: 120, y: 90 },
  { x: 330, y: 230 },
  { x: 120, y: 360 },
  { x: 330, y: 500 },
  { x: 1080, y: 90 },
  { x: 870, y: 280 },
  { x: 1080, y: 470 },
];

function spoke(x: number, y: number) {
  const mx = (x + HUB.x) / 2;
  return `M ${x} ${y} C ${mx} ${y}, ${mx} ${HUB.y}, ${HUB.x} ${HUB.y}`;
}

/** Every app I've shipped, wired into one hub with light running along the wires. */
export function AppHub() {
  const reduce = useReducedMotion();
  const apps = projects.slice(0, SLOTS.length);

  return (
    <Panel tone="gray" labelledBy="hub-heading" className="mt-3 px-5 py-16 sm:px-10 sm:py-20">
      {/* Wide screens: the wired hub */}
      <div className="relative mx-auto hidden max-w-6xl lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {apps.map((p, i) => {
            const d = spoke(SLOTS[i].x, SLOTS[i].y);
            return (
              <g key={p.id}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.18}
                  strokeWidth={1.2}
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                {reduce ? null : (
                  <path
                    d={d}
                    pathLength={100}
                    fill="none"
                    stroke="var(--live)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    filter="url(#hub-glow)"
                    className="hub-pulse"
                    style={{ animationDelay: `${1.2 + i * 0.45}s` }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {apps.map((p, i) => (
          <motion.div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(SLOTS[i].x / W) * 100}%`, top: `${(SLOTS[i].y / H) * 100}%` }}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/work/${p.id}`}
              data-cursor="Open" className="focus-ring group flex w-24 flex-col items-center gap-2 rounded-2xl border border-line-strong bg-panel p-3 text-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-1 hover:border-ink/50"
            >
              <Image src={p.icon} alt="" width={44} height={44} className="h-11 w-11 rounded-xl" />
              <span className="w-full truncate text-xs font-semibold">{p.title}</span>
            </Link>
          </motion.div>
        ))}

        {/* Hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(HUB.x / W) * 100}%`, top: `${(HUB.y / H) * 100}%` }}
        >
          <span aria-hidden className="absolute inset-0 rounded-full bg-live/30 motion-safe:animate-ping [animation-duration:2.4s]" />
          <span className="display relative flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-ink/10 bg-live bg-clip-padding text-4xl text-black shadow-[0_0_60px_color-mix(in_oklab,var(--live)_45%,transparent)]">
            IR
          </span>
        </div>

        <div className="absolute inset-x-0 top-[2%] text-center">
          <HubCopy />
        </div>
        <div className="absolute inset-x-0 bottom-[2%] flex justify-center">
          <HubCta />
        </div>
      </div>

      {/* Phones and tablets: icons in a grid */}
      <div className="text-center lg:hidden">
        <HubCopy />
        <ul className="mx-auto mt-10 grid max-w-md grid-cols-4 gap-3 sm:grid-cols-7 sm:max-w-2xl">
          {apps.map((p) => (
            <li key={p.id}>
              <Link href={`/work/${p.id}`} className="focus-ring flex flex-col items-center gap-1.5 rounded-2xl border border-line-strong p-2.5">
                <Image src={p.icon} alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
                <span className="w-full truncate text-[11px] font-semibold">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <HubCta />
        </div>
      </div>
    </Panel>
  );
}

function HubCopy() {
  return (
    <>
      <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-medium">
        <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
        {projects.length} apps, one developer
      </p>
      <h2 id="hub-heading" className="mx-auto mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
        Let&apos;s build your next app together
      </h2>
    </>
  );
}

function HubCta() {
  return (
    <a
      href="#contact"
      className="focus-ring inline-flex h-12 items-center gap-3 rounded-full bg-live pl-6 pr-1.5 text-sm font-semibold uppercase tracking-wide text-black transition hover:brightness-110"
    >
      Start a project
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
