"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FloatProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
  rotate?: number;
  "aria-hidden"?: boolean;
};

export function Float({
  children,
  className,
  duration = 4.5,
  delay = 0,
  y = 12,
  x = 0,
  rotate = 0,
  "aria-hidden": ariaHidden,
}: FloatProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} aria-hidden={ariaHidden}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      aria-hidden={ariaHidden}
      animate={{
        y: [0, -y, 0],
        x: x ? [0, x, 0] : 0,
        rotate: rotate ? [0, rotate, 0] : 0,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

type OrbitBadgeProps = {
  label: string;
  className?: string;
  duration?: number;
  delay?: number;
};

export function OrbitBadge({
  label,
  className,
  duration = 5,
  delay = 0,
}: OrbitBadgeProps) {
  return (
    <Float className={className} duration={duration} delay={delay} y={10} x={4}>
      <div className="glass select-none rounded-2xl border border-white/15 px-3.5 py-2.5 text-sm font-semibold text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <span className="bg-gradient-to-r from-accent-soft to-accent bg-clip-text text-transparent">
          {label}
        </span>
      </div>
    </Float>
  );
}
