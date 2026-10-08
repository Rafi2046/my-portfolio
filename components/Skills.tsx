"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Panel, SectionTitle } from "@/components/Section";
import { skillGroups } from "@/lib/content";

export function Skills() {
  const [open, setOpen] = useState<string>(skillGroups[0].id);

  return (
    <Panel id="skills" tone="light" labelledBy="skills-heading" className="mt-3 px-5 py-14 sm:px-10 sm:py-20">
      <SectionTitle id="skills-heading" title="Stack" watermark="Skills" counter="04/05" />

      <ul className="mt-10 border-t border-line-strong">
        {skillGroups.map((g) => {
          const isOpen = open === g.id;
          return (
            <li key={g.id} className="border-b border-line-strong">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`skill-${g.id}`}
                  onClick={() => setOpen(isOpen ? "" : g.id)}
                  className={`focus-ring flex w-full items-center justify-between gap-6 rounded-2xl px-1 py-6 text-left transition-colors sm:px-4 sm:py-8 ${
                    isOpen ? "sm:bg-panel-2" : "hover:text-muted"
                  }`}
                >
                  <span className="text-3xl font-medium uppercase tracking-tight sm:text-5xl">
                    {g.title}
                  </span>
                  <ArrowUpRight
                    className={`h-6 w-6 shrink-0 transition-transform duration-300 sm:h-8 sm:w-8 ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`skill-${g.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-5 px-1 pb-8 sm:flex-row sm:items-start sm:justify-between sm:px-4">
                      <p className="max-w-xs text-muted">{g.description}</p>
                      <ul className="flex max-w-2xl flex-wrap gap-2 sm:justify-end">
                        {g.items.map((item) => (
                          <li key={item} className="rounded-full border border-line-strong px-4 py-2 text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
