"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The closing name, its letters rising out of a mask one after another when the footer comes into view.
 * The line itself is observed: each letter starts pushed out of its mask, so it would never report as visible.
 */
export function FooterName({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      aria-hidden
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.045 }}
    >
      {/* Words stay whole so the name breaks between them, never inside one. */}
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
        {w > 0 ? " " : null}
        <span className="inline-block whitespace-nowrap">
          {word.split("").map((ch, i) => (
            // Clip only vertically, so letters like K can overhang their neighbours.
            <span key={i} className="inline-block overflow-x-visible overflow-y-clip pt-[0.06em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </span>
        </Fragment>
      ))}
    </motion.p>
  );
}
