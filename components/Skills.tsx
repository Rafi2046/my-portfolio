"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Panel, SectionTitle } from "@/components/Section";
import { BrandIcon } from "@/components/BrandIcon";
import { skillGroups, stackMarquee, toolGroups } from "@/lib/content";

// Bento layout: the first and last cards are wide on large screens.
const SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/** Each tool row rises in on its own, one after another down the column. */
const toolRow = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Skills() {
  const reduce = useReducedMotion();
  const row = [...stackMarquee, ...stackMarquee];

  return (
    <Panel id="skills" tone="light" labelledBy="skills-heading" className="mt-3 py-14 sm:py-20">
      <div className="px-5 sm:px-10">
        <SectionTitle id="skills-heading" title="Stack" counter="06" kicker="What I build with" />

        <ul className="mt-12 grid gap-3 lg:grid-cols-12">
          {skillGroups.map((g, i) => (
            <motion.li
              key={g.id}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              data-spotlight
              className={`group relative overflow-hidden rounded-[1.5rem] border border-line-strong bg-panel-2 p-6 transition-colors duration-500 hover:bg-ink hover:text-panel sm:p-8 ${SPAN[i]}`}
            >
              <p className="eyebrow opacity-60">0{i + 1}</p>
              <h3 className="display mt-3 text-5xl sm:text-6xl">{g.title}</h3>
              <p className="mt-3 max-w-xs opacity-60">{g.description}</p>
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

        {/* Languages and tools, with their marks; no made-up percentages */}
        <div className="mt-16 border-t border-line-strong pt-6">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Languages & tools</h3>
          <p className="mt-2 text-muted">Everything here is in code on my GitHub or in the apps above.</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {toolGroups.map((g, gi) => (
              <motion.div
                key={g.title}
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: gi * 0.08 } } }}
              >
                <motion.p className="eyebrow text-muted" variants={toolRow}>
                  {g.title}
                </motion.p>
                <ul className="mt-4">
                  {g.items.map((t) => (
                    <motion.li
                      key={t.name}
                      variants={toolRow}
                      className="group/tool relative flex items-center gap-3 border-b border-line py-2.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition duration-300 ease-out group-hover/tool:-translate-y-0.5 group-hover/tool:scale-110 group-hover/tool:-rotate-3 group-hover/tool:shadow-[0_8px_18px_rgba(0,0,0,0.22)] motion-reduce:transform-none">
                        {t.icon ? (
                          <BrandIcon name={t.icon} color className="h-[18px] w-[18px]" />
                        ) : (
                          <span className="text-sm font-bold text-black/70">{t.name[0]}</span>
                        )}
                      </span>
                      <span className="text-[15px] font-medium transition-transform duration-300 ease-out group-hover/tool:translate-x-1 motion-reduce:transform-none">
                        {t.name}
                      </span>
                      {/* The hairline under the row draws in solid on hover. */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover/tool:scale-x-100"
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
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
