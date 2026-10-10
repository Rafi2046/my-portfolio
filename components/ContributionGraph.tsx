"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ContributionDay, ContributionRange } from "@/lib/github";

const LEVEL = ["bg-ink/[0.08]", "bg-live/35", "bg-live/55", "bg-live/80", "bg-live"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

const fmt = (n: number) => n.toLocaleString("en-US");
const longDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

function summarise(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  let busiest = days[0];
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (d.count > busiest.count) busiest = d;
  }
  return { active: days.filter((d) => d.count > 0).length, longest, busiest };
}

/** Weeks as Sunday-first columns, like GitHub, plus the column where each month starts. */
function layout(days: ContributionDay[]) {
  const first = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(first).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const months: { col: number; label: string }[] = [];
  weeks.forEach((week, col) => {
    const start = week.find((d) => d && d.date.endsWith("-01"));
    const label = start ? MONTHS[Number(start.date.slice(5, 7)) - 1] : col === 0 && week.some(Boolean) ? MONTHS[Number(week.find(Boolean)!.date.slice(5, 7)) - 1] : null;
    // Skip a label that would collide with the previous one.
    if (label && (months.length === 0 || col - months[months.length - 1].col >= 3)) months.push({ col, label });
  });
  return { weeks, months };
}

/**
 * GitHub calendar with a year picker. Squares keep GitHub's size instead of
 * stretching, the stats follow the selected year, and weeks sweep in left to
 * right whenever the year changes.
 */
export function ContributionGraph({ ranges, note }: { ranges: ContributionRange[]; note?: ReactNode }) {
  const [id, setId] = useState(ranges[0].id);
  const range = ranges.find((r) => r.id === id) ?? ranges[0];
  const { weeks, months } = useMemo(() => layout(range.days), [range]);
  const stats = useMemo(() => summarise(range.days), [range]);

  const box = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [tip, setTip] = useState<{ d: ContributionDay; x: number; y: number } | null>(null);

  // On narrow screens the calendar scrolls: show the latest weeks of a rolling range, January of a past year.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = range.id === "last" || range.id === String(new Date().getFullYear()) ? el.scrollWidth : 0;
  }, [range.id]);

  const show = (d: ContributionDay, el: HTMLElement) => {
    const outer = box.current!.getBoundingClientRect();
    const cell = el.getBoundingClientRect();
    setTip({ d, x: cell.left + cell.width / 2 - outer.left, y: cell.top - outer.top });
  };

  const tiles = [
    { label: "Contributions", value: fmt(range.total) },
    { label: "Active days", value: fmt(stats.active) },
    { label: "Longest streak", value: `${stats.longest}d` },
    { label: "Busiest day", value: fmt(stats.busiest.count), note: stats.busiest.count ? longDate(stats.busiest.date) : undefined },
  ];

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[auto_minmax(0,1fr)] xl:gap-10">
      <div className="min-w-0">
        <div role="tablist" aria-label="Contribution year" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
          {ranges.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={r.id === range.id}
              onClick={() => {
                setTip(null);
                setId(r.id);
              }}
              className={`focus-ring relative shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                r.id === range.id ? "text-panel" : "text-muted hover:text-ink"
              }`}
            >
              {r.id === range.id ? (
                <motion.span layoutId="year-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              ) : null}
              <span className="relative">
                {r.label}
                <span className={`ml-1.5 font-mono text-xs ${r.id === range.id ? "text-panel/60" : "text-muted/70"}`}>{fmt(r.total)}</span>
              </span>
            </button>
          ))}
        </div>

        <div ref={box} className="relative mt-5">
          <div ref={scroller} className="overflow-x-auto pb-2 [scrollbar-width:none]" onPointerLeave={() => setTip(null)}>
            <div
              role="img"
              aria-label={`${fmt(range.total)} contributions ${range.id === "last" ? "in the last 12 months" : `in ${range.label}`}`}
              className="flex w-max gap-[3px] text-[10px] leading-none text-muted sm:gap-1 sm:text-xs"
            >
              {/* Weekday labels down the side */}
              <span className="flex flex-col gap-[3px] pr-1.5 sm:gap-1">
                <span className="h-5" />
                {WEEKDAYS.map((w, i) => (
                  <span key={i} className="flex h-[11px] items-center sm:h-[13px]">{w}</span>
                ))}
              </span>
              {weeks.map((week, col) => {
                const month = months.find((x) => x.col === col);
                return (
                  <motion.span
                    key={`${range.id}-${col}`}
                    className="flex flex-col gap-[3px] sm:gap-1"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.35, delay: col * 0.01, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Month label, allowed to overflow into the next weeks */}
                    <span className="relative h-5">
                      {month ? <span className="absolute left-0 top-0 whitespace-nowrap">{month.label}</span> : null}
                    </span>
                    {Array.from({ length: 7 }, (_, row) => {
                      const d = week[row];
                      return d ? (
                        <span
                          key={d.date}
                          onPointerEnter={(e) => show(d, e.currentTarget)}
                          className={`h-[11px] w-[11px] rounded-[3px] outline outline-1 outline-transparent transition-[outline-color] hover:outline-ink/60 sm:h-[13px] sm:w-[13px] ${LEVEL[d.level]}`}
                        />
                      ) : (
                        <span key={`pad-${row}`} className="h-[11px] w-[11px] sm:h-[13px] sm:w-[13px]" />
                      );
                    })}
                  </motion.span>
                );
              })}
            </div>
          </div>

          {tip ? (
            <p
              role="status"
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-panel shadow-lg"
              style={{ left: tip.x, top: tip.y }}
            >
              {tip.d.count === 0 ? "No" : fmt(tip.d.count)} contribution{tip.d.count === 1 ? "" : "s"}
              <span className="text-panel/60"> · {longDate(tip.d.date)}</span>
            </p>
          ) : null}

          <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted">
            Less
            {LEVEL.map((c) => (
              <span key={c} className={`h-[11px] w-[11px] rounded-[3px] sm:h-[13px] sm:w-[13px] ${c}`} />
            ))}
            More
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-strong bg-line-strong sm:grid-cols-4 xl:grid-cols-2">
          {tiles.map((t) => (
            <div key={t.label} className="bg-panel-2 p-4">
              <dt className="text-xs text-muted">{t.label}</dt>
              <dd className="display mt-1 text-3xl sm:text-4xl">{t.value}</dd>
              {t.note ? <dd className="mt-1 text-xs text-muted">{t.note}</dd> : null}
            </div>
          ))}
        </dl>
        {note}
      </div>
    </div>
  );
}
