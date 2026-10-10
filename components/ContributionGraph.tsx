"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ContributionDay } from "@/lib/github";

const LEVEL = ["bg-ink/[0.08]", "bg-live/35", "bg-live/55", "bg-live/80", "bg-live"];

/** GitHub-style calendar; weeks sweep in left to right the first time it scrolls into view. */
export function ContributionGraph({ days }: { days: ContributionDay[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  // On narrow screens the calendar scrolls; start at the most recent weeks.
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  // Columns are weeks starting on Sunday, like GitHub.
  const first = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(first).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div ref={ref} className="overflow-x-auto pb-2 [scrollbar-width:none]">
      <div className="flex min-w-[560px] gap-[3px]">
        {weeks.map((week, w) => (
          <motion.div
            key={w}
            className="flex flex-1 flex-col gap-[3px]"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.35, delay: w * 0.012, ease: [0.22, 1, 0.36, 1] }}
          >
            {week.map((d, i) =>
              d ? (
                <span
                  key={d.date}
                  title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                  className={`aspect-square w-full rounded-[3px] ${LEVEL[d.level]}`}
                />
              ) : (
                <span key={`pad-${i}`} className="aspect-square w-full" />
              ),
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
