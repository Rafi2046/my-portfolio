"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  /** Short line under the index, e.g. what the section shows. */
  kicker?: string;
  /** e.g. "02/05" */
  counter?: string;
  aside?: ReactNode;
  /** @deprecated kept for older call sites; no longer drawn. */
  watermark?: string;
};

/** Index + kicker on a hairline, then the title in big display type. */
export function SectionTitle({ id, title, kicker, counter, aside }: SectionTitleProps) {
  return (
    <div>
      <div className="flex items-center gap-4 border-t border-current/15 pt-4">
        {counter ? <span className="eyebrow tabular-nums">({counter.split("/")[0]})</span> : null}
        {kicker ? <span className="eyebrow opacity-60">{kicker}</span> : null}
        {aside ? <span className="eyebrow ml-auto text-right opacity-60">{aside}</span> : null}
      </div>
      <h2 id={id} className="display mt-6 text-[16vw] sm:text-[11vw] lg:text-[8.5rem]">
        <Reveal>{title}</Reveal>
      </h2>
    </div>
  );
}

/** Same heading for panels that render their own wrapper. */
export function PanelHeading({ id, title, index, kicker }: { id: string; title: string; index?: string; kicker?: string }) {
  return <SectionTitle id={id} title={title} counter={index} kicker={kicker} />;
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}

/** Counts up to a number the first time it scrolls into view; "1,103" keeps its commas, non-numeric values render as-is. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const target = /^\d[\d,]*$/.test(value) ? Number(value.replace(/,/g, "")) : null;
  const grouped = value.includes(",");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target === null || reduce) return;
    const controls = animate(0, target, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, target, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {target === null || reduce ? value : grouped ? n.toLocaleString("en-US") : n}
    </span>
  );
}

/**
 * Pulls its child a little towards the pointer and springs back on leave.
 * Mouse only, and off for reduced motion.
 */
export function Magnetic({ children, className = "", strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const box = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - box.left - box.width / 2) * strength);
        y.set((e.clientY - box.top - box.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
