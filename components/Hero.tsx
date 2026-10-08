"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Float } from "@/components/Float";
import { projects, site, socials } from "@/lib/content";

const heroStats = [
  { value: "436", label: "commits since April" },
  { value: "4", label: "apps live on stores" },
  { value: "7", label: "apps built & shipping" },
];

/** Where each app icon floats around the portrait card. */
const iconSpots = [
  { id: "rushd", className: "-left-3 top-[14%] sm:-left-10", delay: 0 },
  { id: "quran-audio", className: "-right-3 top-[8%] sm:-right-8", delay: 0.6 },
  { id: "budget-mint", className: "-left-3 bottom-[30%] sm:-left-12", delay: 1.1 },
  { id: "fuelsync", className: "-right-3 bottom-[38%] sm:-right-10", delay: 0.3 },
  { id: "dosey", className: "-right-2 bottom-[10%] hidden sm:block", delay: 0.9 },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const github = socials.find((s) => s.label === "GitHub");
  const linkedin = socials.find((s) => s.label === "LinkedIn");

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
      aria-labelledby="hero-name"
    >
      <div className="grid-backdrop" aria-hidden />
      <div
        className="glow-orb -top-40 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 bg-accent/25"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-sm text-foreground/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 text-lg text-foreground-muted"
          >
            Hi, I&apos;m{" "}
            <span id="hero-name" className="font-medium text-foreground">
              {site.fullName}
            </span>
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl"
          >
            I build mobile apps people{" "}
            <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-accent">
              open every day.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted"
          >
            {site.supporting}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-accent-soft"
            >
              See my work
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              Get in touch
            </a>
            {[github, linkedin].map((s) =>
              s ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring px-2 py-3 text-sm text-foreground-muted underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  {s.label}
                </a>
              ) : null,
            )}
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-foreground-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1a2110] via-[#0f1209] to-background">
            <div
              className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_20%,rgba(197,240,74,0.28),transparent_65%)]"
              aria-hidden
            />
            <Image
              src="/rafi-portrait.png"
              alt={`${site.fullName}, Flutter developer`}
              width={682}
              height={969}
              preload
              className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto object-contain object-bottom"
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Currently at Onesttech
                </p>
                <p className="text-xs text-foreground-muted">
                  Dhaka, Bangladesh
                </p>
              </div>
              <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">
                Flutter
              </span>
            </div>
          </div>

          {iconSpots.map((spot) => {
            const project = projects.find((p) => p.id === spot.id);
            if (!project) return null;
            return (
              <Float
                key={spot.id}
                className={`absolute z-10 ${spot.className}`}
                duration={5 + spot.delay}
                delay={spot.delay}
                y={10}
              >
                <div className="rounded-2xl border border-white/10 bg-[#11141a]/80 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  <Image
                    src={project.icon}
                    alt={project.title}
                    title={project.title}
                    width={48}
                    height={48}
                    className="h-11 w-11 rounded-xl object-cover sm:h-12 sm:w-12"
                  />
                </div>
              </Float>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
