"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Panel, Reveal, Magnetic } from "@/components/Section";
import { BrandIcon } from "@/components/BrandIcon";
import { site, socials } from "@/lib/content";

/** Starts after the intro curtain lifts (see globals.css). */
const AFTER_CURTAIN = 1.25;

/** The name dims toward its baseline so the head reads in front of it, magazine-cover style. */
const NAME_FADE = "linear-gradient(to bottom, black 35%, rgb(0 0 0 / var(--name-fade)))";

/** Lets the bottom of the portrait melt into the panel instead of ending in a hard crop. */
const PORTRAIT_FADE = "linear-gradient(to top, transparent, black var(--portrait-fade))";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollNameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scrollPortraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Depth parallax: the cursor (or tilting the phone) shifts the layers by different amounts,
  // portrait toward you, name and studio light the other way. -1..1 on each axis.
  const tilt = { stiffness: 70, damping: 18, mass: 0.8 };
  const tiltX = useSpring(0, tilt);
  const tiltY = useSpring(0, tilt);
  const portraitX = useTransform(tiltX, (v) => v * 22);
  const portraitY = useTransform(() => scrollPortraitY.get() + tiltY.get() * 12);
  const portraitRotate = useTransform(tiltX, (v) => v * 4);
  const nameX = useTransform(tiltX, (v) => v * -16);
  const nameY = useTransform(() => scrollNameY.get() + tiltY.get() * -10);
  const glowX = useTransform(tiltX, (v) => v * -30);
  const glowY = useTransform(tiltY, (v) => v * -20);

  const tiltToPointer = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    tiltX.set(((e.clientX - box.left) / box.width) * 2 - 1);
    tiltY.set(((e.clientY - box.top) / box.height) * 2 - 1);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // On phones and tablets the gyroscope drives the same parallax.
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: coarse)").matches || !("DeviceOrientationEvent" in window)) return;

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    let restBeta: number | null = null;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      // Whatever angle the phone is first held at counts as centre.
      restBeta ??= e.beta;
      tiltX.set(clamp(e.gamma / 25));
      tiltY.set(clamp((e.beta - restBeta) / 25));
    };
    const listen = () => window.addEventListener("deviceorientation", onOrient);

    // iOS only hands out motion data after a tap asks for it.
    const Orientation = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<PermissionState> };
    if (typeof Orientation.requestPermission !== "function") {
      listen();
    } else {
      const ask = () => {
        Orientation.requestPermission!()
          .then((state) => state === "granted" && listen())
          .catch(() => {});
      };
      window.addEventListener("touchend", ask, { once: true });
      return () => {
        window.removeEventListener("touchend", ask);
        window.removeEventListener("deviceorientation", onOrient);
      };
    }
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [reduce, tiltX, tiltY]);

  // Colour spotlight that follows the cursor over the portrait.
  const spot = { stiffness: 260, damping: 30, mass: 0.6 };
  const spotX = useSpring(useMotionValue(0), spot);
  const spotY = useSpring(useMotionValue(0), spot);
  const spotR = useSpring(0, { stiffness: 180, damping: 24 });
  const colorMask = useMotionTemplate`radial-gradient(circle ${spotR}px at ${spotX}px ${spotY}px, #000 55%, transparent 100%)`;

  const moveSpot = (e: PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    if (reduce || spotR.get() < 1) {
      spotX.jump(x);
      spotY.jump(y);
    } else {
      spotX.set(x);
      spotY.set(y);
    }
  };

  return (
    <div ref={ref} className="pt-2 sm:pt-3">
      <Panel tone="gray" labelledBy="hero-name" className="flex min-h-[calc(100svh-1rem)] flex-col pt-24 sm:pt-28">
        <div className="relative flex items-start justify-between px-5 sm:px-10">
          <p className="text-base font-medium leading-snug sm:text-lg">
            <Reveal immediate delay={AFTER_CURTAIN}>Flutter</Reveal>
            <Reveal immediate delay={AFTER_CURTAIN + 0.06}>
              Developer &amp; Builder
            </Reveal>
          </p>
          <FullName className="absolute left-1/2 top-1 hidden -translate-x-1/2 sm:flex" />
          <p className="text-right text-sm leading-snug text-muted">
            <Reveal immediate delay={AFTER_CURTAIN}>Based in Dhaka</Reveal>
            <Reveal immediate delay={AFTER_CURTAIN + 0.06}>
              Working at Onesttech
            </Reveal>
          </p>
        </div>

        {/* Stage: giant name behind, portrait in front */}
        <div
          className="relative min-h-[34rem] flex-1 md:min-h-[32rem]"
          onPointerMove={tiltToPointer}
          onPointerLeave={resetTilt}
        >
          {/* Soft studio light behind head and shoulders */}
          <motion.div
            aria-hidden
            style={reduce ? undefined : { x: glowX, y: glowY }}
            className="pointer-events-none absolute bottom-0 left-1/2 aspect-square h-[85%] -translate-x-1/2 translate-y-[12%] rounded-full bg-[radial-gradient(closest-side,var(--spotlight),transparent)]"
          />

          <motion.h1
            id="hero-name"
            style={{ ...(reduce ? {} : { x: nameX, y: nameY }), maskImage: NAME_FADE, WebkitMaskImage: NAME_FADE }}
            className="display absolute inset-x-0 top-[6%] select-none text-center text-[31vw] sm:top-[8%] md:text-[18.5vw] 2xl:text-[17rem]"
          >
            <span className="sr-only">{site.fullName}</span>
            <span aria-hidden className="flex flex-col items-center md:flex-row md:justify-center md:gap-[0.18em]">
              <Reveal immediate delay={AFTER_CURTAIN + 0.1}>Ishmak</Reveal>
              <Reveal immediate delay={AFTER_CURTAIN + 0.2}>Rafi</Reveal>
            </span>
          </motion.h1>

          <motion.div
            style={reduce ? undefined : { x: portraitX, y: portraitY, rotateY: portraitRotate, transformPerspective: 1200 }}
            className="absolute inset-x-0 bottom-0 flex h-[60%] justify-center md:h-[92%]"
          >
            <motion.div
              className="relative h-full"
              style={{ maskImage: PORTRAIT_FADE, WebkitMaskImage: PORTRAIT_FADE }}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: reduce ? 0 : AFTER_CURTAIN + 0.25, ease: [0.22, 1, 0.36, 1] }}
              onPointerEnter={(e) => {
                moveSpot(e);
                spotR.set(170);
              }}
              onPointerMove={moveSpot}
              onPointerLeave={() => spotR.set(0)}
            >
              <Image
                src="/rafi-portrait-studio.png"
                alt={`Portrait of ${site.fullName}`}
                width={542}
                height={784}
                preload
                sizes="(max-width: 768px) 80vw, 560px"
                className="h-full w-auto object-contain object-bottom grayscale contrast-[1.05]"
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ maskImage: colorMask, WebkitMaskImage: colorMask }}
              >
                <Image
                  src="/rafi-portrait-studio.png"
                  alt=""
                  width={542}
                  height={784}
                  sizes="(max-width: 768px) 80vw, 560px"
                  className="h-full w-full object-contain object-bottom saturate-[1.35] contrast-[1.08]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom overlay on wide screens */}
          <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between px-10 pb-8 lg:flex">
            <div className="max-w-xs">
              <p className="text-2xl font-semibold leading-tight">
                I build mobile apps people open every day.
              </p>
              <Magnetic className="mt-5">
              <a
                href="#projects"
                className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-panel transition hover:opacity-85"
              >
                See my work <ArrowUpRight className="h-4 w-4" />
              </a>
              </Magnetic>
            </div>
            <div className="flex flex-col items-end gap-2">
              <SocialRow />
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
          <FullName className="mb-3 flex sm:hidden" />
          <p className="text-2xl font-semibold leading-tight">
            I build mobile apps people open every day.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-panel"
            >
              See my work <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <SocialRow className="mt-4 flex-wrap" />
        </div>
      </Panel>
    </div>
  );
}

/** The full name, small, for where the giant display name shortens it. */
function FullName({ className = "" }: { className?: string }) {
  return (
    <p aria-hidden className={`items-center gap-3 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.3em] text-ink/80 sm:text-sm ${className}`}>
      <span className="h-px w-8 bg-ink/40 sm:w-12" />
      <Reveal immediate delay={AFTER_CURTAIN + 0.03}>{site.fullName}</Reveal>
      <span className="h-px w-8 bg-ink/40 sm:w-12" />
    </p>
  );
}

/** Every social account as a round icon button; the label shows as a tooltip. */
function SocialRow({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={s.label}
            title={s.label}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-panel/70 backdrop-blur transition hover:-translate-y-0.5 hover:bg-ink hover:text-panel"
          >
            <BrandIcon name={s.label} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
