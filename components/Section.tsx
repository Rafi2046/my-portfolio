"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Tone = "light" | "gray" | "inverse";

const toneClass: Record<Tone, string> = {
  light: "bg-panel text-ink",
  gray: "bg-panel-2 text-ink",
  inverse: "bg-inverse text-on-inverse",
};

type PanelProps = {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/** A rounded section sitting on the grey canvas. */
export function Panel({
  id,
  tone = "light",
  labelledBy,
  className = "",
  children,
}: PanelProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative mx-2 overflow-clip rounded-[1.75rem] sm:mx-3 sm:rounded-[2.25rem] ${toneClass[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

/** Slides content up from behind a mask, the way both references reveal type. */
export function Reveal({ children, className, delay = 0, immediate }: RevealProps) {
  const reduce = useReducedMotion();
  const variants = {
    hidden: { y: reduce ? "0%" : "105%", opacity: reduce ? 0 : 1 },
    show: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: reduce ? 0.2 : 0.9,
        // Reduced motion has no intro curtain to wait for.
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // The mask (outer span) is what gets observed: the inner text starts
  // pushed out of the mask, so observing it would never report it visible.
  return (
    <motion.span
      className={`block overflow-hidden ${className ?? ""}`}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : {
            whileInView: "show",
            viewport: { once: true, margin: "0px 0px -60px 0px" },
          })}
    >
      <motion.span className="block" variants={variants}>
        {children}
      </motion.span>
    </motion.span>
  );
}

type SectionTitleProps = {
  id: string;
  title: string;
  watermark?: string;
  /** e.g. "02/05" */
  counter?: string;
  aside?: ReactNode;
};

/** "/TITLE" heading with a faint outlined watermark word behind it. */
export function SectionTitle({ id, title, watermark, counter, aside }: SectionTitleProps) {
  return (
    <div className="relative">
      {watermark ? (
        <p
          aria-hidden
          className="watermark absolute -top-4 left-1/2 -translate-x-1/2 text-[18vw] sm:-top-8 lg:text-[11rem]"
        >
          {watermark}
        </p>
      ) : null}
      <div className="relative flex items-end justify-between gap-6">
        <h2 id={id} className="text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
          <Reveal>/{title}</Reveal>
        </h2>
        {counter || aside ? (
          <div className="shrink-0 pb-1 text-right text-sm opacity-60">
            {aside ?? counter}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
