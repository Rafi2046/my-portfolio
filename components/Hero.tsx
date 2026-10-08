"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Panel, Reveal } from "@/components/Section";
import { site, socials } from "@/lib/content";

/** Starts after the intro curtain lifts (see globals.css). */
const AFTER_CURTAIN = 1.25;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div ref={ref} className="pt-2 sm:pt-3">
      <Panel tone="gray" labelledBy="hero-name" className="flex min-h-[calc(100svh-1rem)] flex-col pt-24 sm:pt-28">
        <div className="flex items-start justify-between px-5 sm:px-10">
          <p className="text-base font-medium leading-snug sm:text-lg">
            <Reveal immediate delay={AFTER_CURTAIN}>Flutter</Reveal>
            <Reveal immediate delay={AFTER_CURTAIN + 0.06}>
              Developer &amp; Builder
            </Reveal>
          </p>
          <p className="text-right text-sm leading-snug text-muted">
            <Reveal immediate delay={AFTER_CURTAIN}>Based in Dhaka</Reveal>
            <Reveal immediate delay={AFTER_CURTAIN + 0.06}>
              Working at Onesttech
            </Reveal>
          </p>
        </div>

        {/* Stage: giant name behind, portrait in front */}
        <div className="relative min-h-[34rem] flex-1 md:min-h-[32rem]">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="pointer-events-none absolute left-1/2 top-[6%] h-[115%] -translate-x-[62%] text-ink/20"
          >
            <circle cx="50" cy="50" r="49.7" fill="none" stroke="currentColor" strokeWidth="0.15" />
          </svg>

          <motion.h1
            id="hero-name"
            style={reduce ? undefined : { y: nameY }}
            className="display absolute inset-x-0 top-[6%] select-none text-center text-[31vw] sm:top-[8%] md:text-[18.5vw] 2xl:text-[17rem]"
          >
            <span className="sr-only">{site.fullName}</span>
            <span aria-hidden className="flex flex-col items-center md:flex-row md:justify-center md:gap-[0.18em]">
              <Reveal immediate delay={AFTER_CURTAIN + 0.1}>Ishmak</Reveal>
              <Reveal immediate delay={AFTER_CURTAIN + 0.2}>Rafi</Reveal>
            </span>
          </motion.h1>

          <motion.div
            style={reduce ? undefined : { y: portraitY }}
            className="absolute inset-x-0 bottom-0 flex h-[60%] justify-center md:h-[92%]"
          >
            <motion.div
              className="relative h-full"
              initial={reduce ? false : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: reduce ? 0 : AFTER_CURTAIN + 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/rafi-portrait.png"
                alt={`Portrait of ${site.fullName}`}
                width={682}
                height={969}
                preload
                sizes="(max-width: 768px) 80vw, 560px"
                className="h-full w-auto object-contain object-bottom grayscale contrast-[1.05]"
              />
            </motion.div>
          </motion.div>

          {/* Bottom overlay on wide screens */}
          <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between px-10 pb-8 lg:flex">
            <div className="max-w-xs">
              <p className="text-2xl font-semibold leading-tight">
                I build mobile apps people open every day.
              </p>
              <a
                href="#projects"
                className="focus-ring mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-panel transition hover:opacity-85"
              >
                See my work <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-col items-end gap-2">
              {socials.slice(0, 3).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-panel/70 px-4 py-2 text-sm backdrop-blur transition hover:bg-ink hover:text-panel"
                >
                  {s.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
              <a href="#about" className="focus-ring mt-4 flex flex-col items-center gap-1 text-sm">
                Scroll down
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="motion-safe:animate-bounce">
                  <path d="M7 0v20M1 14l6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom block on phones and tablets */}
        <div className="border-t border-line bg-panel-2 px-5 py-6 sm:px-10 lg:hidden">
          <p className="text-2xl font-semibold leading-tight">
            I build mobile apps people open every day.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a
              href="#projects"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-panel"
            >
              See my work <ArrowUpRight className="h-4 w-4" />
            </a>
            {socials.slice(0, 2).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
