"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
};

export function MotionSection({
  children,
  className,
  id,
  ariaLabelledBy,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={className}
      // Always reveal on view: the server renders the initial (hidden) state,
      // so skipping whileInView would leave the section invisible. Reduced
      // motion keeps the fade but drops the slide.
      initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      // "some" + a margin, not a ratio: tall sections (Projects on phones)
      // can never be 20% on screen at once.
      viewport={{ once: true, amount: "some", margin: "0px 0px -80px 0px" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
