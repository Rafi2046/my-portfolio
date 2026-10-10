"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Panel, Magnetic } from "@/components/Section";
import { projects as allProjects } from "@/lib/content";

// The hub is about apps, so web projects stay out of it.
const projects = allProjects.filter((p) => !p.web);

// Positions are fractions of the stage, which spans the panel's full width.
// The SVG is sized to the stage in real pixels so strokes and dashes never stretch.
const HUB = { x: 0.5, y: 0.565 };

// Mirrored ")(" brackets: an outer and an inner column on each side.
// The eighth slot is the open "Your app" tile.
const SLOTS = [
  { x: 0.065, y: 0.16 },
  { x: 0.195, y: 0.425 },
  { x: 0.195, y: 0.71 },
  { x: 0.065, y: 0.9 },
  { x: 0.935, y: 0.16 },
  { x: 0.805, y: 0.425 },
  { x: 0.805, y: 0.71 },
  { x: 0.935, y: 0.9 },
];

function spoke(s: { x: number; y: number }, w: number, h: number) {
  const [x, y, hx, hy] = [s.x * w, s.y * h, HUB.x * w, HUB.y * h];
  const mx = (x + hx) / 2;
  return `M ${x} ${y} C ${mx} ${y}, ${mx} ${hy}, ${hx} ${hy}`;
}

const pct = (v: number) => `${v * 100}%`;

const tile =
  "focus-ring group flex min-w-[108px] flex-col items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] p-3 text-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-live/60 hover:bg-white/[0.07]";

/** Every app I've shipped, wired into one hub with light running along the wires. */
export function AppHub() {
  const reduce = useReducedMotion();
  const apps = projects.slice(0, SLOTS.length - 1);
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 680 });

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Panel
      labelledBy="hub-heading"
      className="mt-3 !bg-[#060806] px-5 py-16 !text-white sm:px-8 lg:px-0 lg:py-0"
    >
      {/* Green light pooling in from the corners and under the hub */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 75% at 0% 100%, rgb(34 197 94 / 0.20), transparent 70%), radial-gradient(45% 60% at 100% 0%, rgb(34 197 94 / 0.10), transparent 70%), radial-gradient(30% 40% at 50% 57%, rgb(34 197 94 / 0.12), transparent 70%)",
        }}
      />
      {/* Faint dot grid, faded out towards the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
      />

      {/* Wide screens: the wired hub, edge to edge */}
      <div ref={stage} className="relative hidden h-[660px] w-full lg:block xl:h-[720px]">
        <svg viewBox={`0 0 ${size.w} ${size.h}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {SLOTS.map((s, i) => {
            const d = spoke(s, size.w, size.h);
            return (
              <g key={i}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="white"
                  strokeOpacity={0.16}
                  strokeWidth={1.25}
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                {reduce
                  ? null
                  : [0, 1].map((k) => (
                      <path
                        key={k}
                        d={d}
                        pathLength={100}
                        fill="none"
                        stroke="var(--live)"
                        strokeWidth={2}
                        strokeLinecap="round"
                              filter="url(#hub-glow)"
                        className="hub-pulse"
                        style={{ animationDelay: `${1.2 + i * 0.4 + k * 1.6}s` }}
                      />
                    ))}
              </g>
            );
          })}
        </svg>

        {SLOTS.map((s, i) => {
          const p = apps[i];
          return (
            <motion.div
              key={p?.id ?? "yours"}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(s.x), top: pct(s.y) }}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {p ? (
                <Link href={`/work/${p.id}`} data-cursor="Open" className={tile}>
                  <Image src={p.icon} alt="" width={48} height={48} className="h-12 w-12 rounded-xl" />
                  <span className="whitespace-nowrap text-[13px] font-semibold">{p.title}</span>
                </Link>
              ) : (
                <YourApp />
              )}
            </motion.div>
          );
        })}

        {/* Hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(HUB.x), top: pct(HUB.y) }}
        >
          <span aria-hidden className="absolute inset-0 rounded-full bg-live/25 motion-safe:animate-ping [animation-duration:2.6s]" />
          <span className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] shadow-[0_0_120px_rgb(34_197_94/0.35)] xl:h-44 xl:w-44">
            <span className="display flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full bg-live text-5xl text-black shadow-[inset_0_-8px_20px_rgb(0_0_0/0.18),inset_0_6px_14px_rgb(255_255_255/0.35)] xl:h-32 xl:w-32">
              IR
            </span>
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[7%] text-center">
          <HubCopy />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[7%] flex justify-center">
          <HubCta />
        </div>
      </div>

      {/* Phones and tablets: icons in a grid */}
      <div className="relative text-center lg:hidden">
        <HubCopy />
        <ul className="mx-auto mt-10 grid max-w-md grid-cols-4 gap-3 sm:max-w-2xl sm:grid-cols-8">
          {apps.map((p) => (
            <li key={p.id}>
              <Link href={`/work/${p.id}`} className="focus-ring flex flex-col items-center gap-1.5 rounded-2xl border border-white/12 bg-white/[0.04] p-2.5">
                <Image src={p.icon} alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
                <span className="line-clamp-2 w-full text-[11px] font-semibold leading-tight tracking-tight">{p.title}</span>
              </Link>
            </li>
          ))}
          <li>
            <a href="#contact" className="focus-ring flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-live/50 p-2.5 text-live">
              <span className="flex h-10 w-10 items-center justify-center text-2xl leading-none">+</span>
              <span className="text-[11px] font-semibold">Your app</span>
            </a>
          </li>
        </ul>
        <div className="mt-10 flex justify-center">
          <HubCta />
        </div>
      </div>
    </Panel>
  );
}

/** The open slot: the next app on the wire is the visitor's. */
function YourApp() {
  return (
    <a
      href="#contact"
      className="focus-ring flex min-w-[108px] flex-col items-center gap-2 rounded-2xl border border-dashed border-live/50 bg-live/[0.06] p-3 text-center text-live backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-live/[0.12]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-live/40 text-2xl leading-none">+</span>
      <span className="w-full truncate text-[13px] font-semibold">Your app</span>
    </a>
  );
}

function HubCopy() {
  return (
    <>
      <p className="inline-flex items-center gap-2 rounded-full border border-live/30 bg-live/10 px-3.5 py-1.5 text-xs font-medium text-white/90">
        <span className="h-2 w-2 rounded-full bg-live shadow-[0_0_8px_var(--live)]" aria-hidden />
        {projects.length} apps · {projects.filter((p) => p.status === "live").length} live on the stores
      </p>
      <h2
        id="hub-heading"
        className="mx-auto mt-5 max-w-[34rem] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:max-w-[40rem] xl:text-6xl"
      >
        Let&apos;s Build Your Next App Together
      </h2>
    </>
  );
}

function HubCta() {
  return (
    <Magnetic>
    <a
      href="#contact"
      className="focus-ring pointer-events-auto inline-flex h-14 items-center gap-4 rounded-full bg-live pl-7 pr-2 text-sm font-semibold uppercase tracking-wide text-black shadow-[0_10px_40px_rgb(34_197_94/0.35)] transition hover:brightness-110"
    >
      Start a project
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
    </Magnetic>
  );
}
