"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Panel, Reveal } from "@/components/Section";
import { process } from "@/lib/content";

function Words({ active }: { active: number }) {
  return (
    <p className="display text-[17vw] md:text-[8.5rem] lg:text-[10rem]">
      {process.map((step, i) => (
        <span
          key={step.word}
          className={`block transition-colors duration-500 ${
            i === active ? "text-on-inverse" : "text-on-inverse-muted/45"
          }`}
        >
          {step.word}
        </span>
      ))}
    </p>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(process.length - 1, Math.floor(v * process.length)));
  });

  const step = process[active];

  return (
    <Panel tone="inverse" labelledBy="process-heading" className="mt-3">
      <div className="flex items-end justify-between px-5 pt-14 sm:px-10 sm:pt-20">
        <h2 id="process-heading" className="text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
          <Reveal>/How I work</Reveal>
        </h2>
        <p className="eyebrow pb-1 text-on-inverse-muted">03/05</p>
      </div>

      {/* Phones: a plain sequence */}
      <ol className="space-y-10 px-5 pb-14 pt-10 md:hidden">
        {process.map((s, i) => (
          <li key={s.word}>
            <p className="eyebrow text-on-inverse-muted">0{i + 1}</p>
            <p className="display mt-2 text-7xl">{s.word}</p>
            <p className="mt-4 leading-relaxed text-on-inverse-muted">{s.text}</p>
          </li>
        ))}
      </ol>

      {/* Tablet and up: pinned while the three steps scroll past */}
      <div ref={ref} className="relative hidden h-[240vh] md:block">
        <div className="sticky top-0 flex h-svh items-center px-10 py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <Words active={active} />
              <AnimatePresence mode="wait">
                <motion.p
                  key={step.word}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 max-w-md leading-relaxed text-on-inverse-muted"
                >
                  {step.text}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-panel-2 lg:block">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={step.image}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={step.image} alt="" fill sizes="448px" className="object-cover object-top" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 flex gap-1.5">
                {process.map((s, i) => (
                  <span
                    key={s.word}
                    className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-white" : "w-3 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
