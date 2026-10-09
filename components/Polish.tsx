"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Weighted smooth scrolling on wheel/trackpad; touch keeps native scrolling. */
function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: { offset: -96 } });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [reduce]);
  return null;
}

/**
 * A small dot that follows the pointer. Over anything marked
 * data-cursor="View" it grows into a labelled disc.
 */
function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const last = useRef<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches && !reduce);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? null;
      if (next !== last.current) {
        last.current = next;
        setLabel(next);
      }
    };
    const leave = () => setHidden(true);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[11px] font-semibold uppercase tracking-[0.14em] text-black mix-blend-difference"
        animate={{
          width: label ? 88 : 10,
          height: label ? 88 : 10,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label ? <span className="mix-blend-normal">{label}</span> : null}
      </motion.div>
    </motion.div>
  );
}

/** Site-wide finishing: smooth scroll, film grain and the custom cursor. */
export function Polish() {
  return (
    <>
      <SmoothScroll />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[80]" />
      <Cursor />
    </>
  );
}
