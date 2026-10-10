"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Panel, SectionTitle } from "@/components/Section";
import { skillGroups, stackMarquee } from "@/lib/content";

// Bento layout: the first and last cards are wide on large screens.
const SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Skills() {
  const reduce = useReducedMotion();
  const row = [...stackMarquee, ...stackMarquee];

  return (
    <Panel id="skills" tone="light" labelledBy="skills-heading" className="mt-3 py-14 sm:py-20">
      <div className="px-5 sm:px-10">
        <SectionTitle id="skills-heading" title="Stack" counter="05" kicker="What I build with" />

        <ul className="mt-12 grid gap-3 lg:grid-cols-12">
          {skillGroups.map((g, i) => (
            <motion.li
              key={g.id}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-line-strong bg-panel-2 p-6 transition-colors duration-500 hover:bg-ink hover:text-panel sm:p-8 ${SPAN[i]}`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow opacity-60">0{i + 1}</p>
                  <h3 className="display mt-3 text-5xl sm:text-6xl">{g.title}</h3>
                  <p className="mt-3 max-w-xs opacity-60">{g.description}</p>
                </div>
                <span aria-hidden className="display text-7xl opacity-10 transition-opacity duration-500 group-hover:opacity-25 sm:text-8xl">
                  {g.items.length}
                </span>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-current/20 px-3.5 py-1.5 text-sm transition-colors duration-500"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Ticker of everything in the toolbox */}
      <div className="mt-14 overflow-hidden border-y border-line-strong py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-10" style={{ animationDuration: "40s" }}>
          {row.map((t, i) => (
            <li key={`${t}-${i}`} aria-hidden={i >= stackMarquee.length || undefined} className="flex items-center gap-10">
              <span className="display text-4xl sm:text-5xl">{t}</span>
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-live" />
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
