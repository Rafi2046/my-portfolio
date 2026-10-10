"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BrandIcon } from "@/components/BrandIcon";
import { CountUp, Panel, SectionTitle } from "@/components/Section";
import { journey } from "@/lib/content";

// Glossy tiles floating beside the story, each tipped back in 3D.
const TILES = [
  { name: "Flutter", className: "left-[6%] top-[4%] h-28 w-28", tilt: "rotateX(18deg) rotateY(-24deg) rotateZ(-6deg)", depth: 70, delay: "0s" },
  { name: "Dart", className: "right-[8%] top-[0%] h-32 w-32", tilt: "rotateX(14deg) rotateY(22deg) rotateZ(8deg)", depth: 110, delay: "-1.5s" },
  { name: "Firebase", className: "left-[38%] top-[34%] h-24 w-24", tilt: "rotateX(22deg) rotateY(-10deg) rotateZ(4deg)", depth: 40, delay: "-3s" },
  { name: "Supabase", className: "left-[2%] bottom-[8%] h-24 w-24", tilt: "rotateX(16deg) rotateY(-28deg) rotateZ(-10deg)", depth: 90, delay: "-4.5s" },
  { name: "Python", className: "right-[4%] bottom-[14%] h-28 w-28", tilt: "rotateX(20deg) rotateY(26deg) rotateZ(-4deg)", depth: 60, delay: "-2.2s" },
  { name: "GitHub", className: "left-[42%] bottom-[0%] h-20 w-20", tilt: "rotateX(24deg) rotateY(8deg) rotateZ(12deg)", depth: 30, delay: "-5.2s" },
];

function Tile({ tile, progress, reduce }: { tile: (typeof TILES)[number]; progress: ReturnType<typeof useScroll>["scrollYProgress"]; reduce: boolean }) {
  // Nearer tiles drift further as the section scrolls by.
  const y = useTransform(progress, [0, 1], [tile.depth, -tile.depth]);
  return (
    <motion.div style={reduce ? undefined : { y }} className={`absolute [perspective:700px] ${tile.className}`}>
      <div className="stage-float h-full w-full" style={{ animationDelay: tile.delay }}>
        <div
          className="flex h-full w-full items-center justify-center rounded-[28%] border border-white/70 bg-gradient-to-br from-white to-[#e6e6e3] shadow-[0_2px_0_#fff_inset,0_-6px_14px_rgba(0,0,0,0.08)_inset,0_12px_0_#c9c9c5,0_30px_50px_rgba(0,0,0,0.35)]"
          style={{ transform: tile.tilt }}
        >
          <BrandIcon name={tile.name} color className="h-1/2 w-1/2 drop-shadow-[0_3px_2px_rgba(0,0,0,0.18)]" />
        </div>
      </div>
    </motion.div>
  );
}

/** From first commit to the stores: the story, its numbers, and the years in between. */
export function Journey() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useRef<HTMLOListElement>(null);
  const { scrollYProgress: lineProgress } = useScroll({ target: line, offset: ["start 85%", "end 60%"] });

  return (
    <Panel id="journey" tone="gray" labelledBy="journey-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <SectionTitle id="journey-heading" title="The journey" counter="02" kicker="From first commit to the stores" aside="Since 2022" />

      <div ref={ref} className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[1.75rem] border border-line-strong bg-panel p-6 shadow-[0_30px_60px_rgba(0,0,0,0.12)] sm:p-10"
        >
          {journey.story.map((para) => (
            <p key={para.slice(0, 24)} className="mb-5 text-lg leading-relaxed text-ink/80 last:mb-0">
              {para}
            </p>
          ))}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
            {journey.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="display text-5xl">{s.count ? <CountUp value={s.value} /> : s.value}</dd>
                <dd className="eyebrow mt-2 text-live">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div aria-hidden className="relative hidden h-[30rem] lg:block">
          {TILES.map((t) => (
            <Tile key={t.name} tile={t} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>
      </div>

      {/* Milestones on a rail that fills in green as it scrolls past */}
      <ol ref={line} className="relative mt-16 grid gap-8 pl-8 lg:mt-24 lg:grid-cols-6 lg:gap-6 lg:pl-0 lg:pt-10">
        <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line-strong lg:bottom-auto lg:left-0 lg:right-0 lg:top-[13px] lg:h-px lg:w-auto" />
        <motion.span
          aria-hidden
          style={reduce ? undefined : { scaleY: lineProgress }}
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-live lg:hidden"
        />
        <motion.span
          aria-hidden
          style={reduce ? undefined : { scaleX: lineProgress }}
          className="absolute left-0 right-0 top-[13px] hidden h-px origin-left bg-live lg:block"
        />
        {journey.milestones.map((m, i) => (
          <motion.li
            key={m.year + m.title}
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span aria-hidden className="absolute -left-8 top-1 h-[15px] w-[15px] rounded-full border-2 border-live bg-panel-2 lg:-top-[34px] lg:left-0" />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{m.year}</p>
            <p className="mt-2 text-lg font-semibold tracking-tight">{m.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.text}</p>
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}
