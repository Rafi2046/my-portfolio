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

/** Three phones fanned out; the active step's phone sits in front. */
function PhoneStage({ active }: { active: number }) {
  const n = process.length;
  return (
    <div className="relative mx-auto hidden h-[min(72svh,620px)] w-full max-w-xl lg:block">
      {/* Soft spotlight and floor shadow */}
      <div aria-hidden className="absolute inset-x-[8%] top-[6%] bottom-[10%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--on-inverse)_14%,transparent),transparent)] blur-2xl" />
      <div aria-hidden className="absolute bottom-[3%] left-1/2 h-6 w-[46%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-xl" />

      {process.map((s, i) => {
        // -1 left, 0 front, 1 right — wraps so there is always one each side.
        const offset = ((i - active + 1 + n) % n) - 1;
        const front = offset === 0;
        return (
          <motion.div
            key={s.word}
            className="absolute bottom-[5%] left-1/2 h-[90%] origin-bottom -translate-x-1/2"
            style={{ aspectRatio: "560 / 1143", zIndex: front ? 3 : 1 }}
            initial={false}
            animate={{
              x: `${offset * 62}%`,
              rotate: offset * 7,
              scale: front ? 1 : 0.8,
              opacity: front ? 1 : 0.45,
              filter: front ? "blur(0px) brightness(1)" : "blur(1.5px) brightness(0.7)",
            }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
          >
            <Image
              src={s.image}
              alt=""
              fill
              quality={90}
              sizes="360px"
              className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        );
      })}

      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3">
        <span className="eyebrow tabular-nums text-on-inverse-muted">0{active + 1} / 0{n}</span>
        <span className="flex gap-1.5">
          {process.map((s, i) => (
            <span
              key={s.word}
              className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-on-inverse" : "w-3 bg-on-inverse/30"}`}
            />
          ))}
        </span>
      </div>
    </div>
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
            <PhoneStage active={active} />
          </div>
        </div>
      </div>
    </Panel>
  );
}
