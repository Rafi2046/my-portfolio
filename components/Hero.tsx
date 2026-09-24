"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
      aria-labelledby="hero-name"
    >
      <div
        className="glow-orb -left-24 top-24 h-72 w-72 bg-accent/40"
        aria-hidden
      />
      <div
        className="glow-orb -right-16 bottom-20 h-80 w-80 bg-accent-soft/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--background-elevated)_0%,_transparent_55%)]"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          {site.role}
        </motion.p>

        <motion.h1
          id="hero-name"
          variants={item}
          className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          {site.fullName}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted sm:text-xl"
        >
          {site.headline} {site.supporting}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="focus-ring inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-accent-soft"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="focus-ring inline-flex items-center justify-center rounded-lg border border-glass-border bg-glass px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition hover:border-accent/50 hover:text-accent-soft"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
