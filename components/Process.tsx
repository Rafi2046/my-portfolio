"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Panel, SectionTitle } from "@/components/Section";
import { process, projects } from "@/lib/content";

/* ───────────────────────── shared bits ───────────────────────── */

/** 0 → 1 as `p` moves through [from, to]. */
function useStage(p: MotionValue<number>, from: number, to: number) {
  return useTransform(p, [from, to], [0, 1], { clamp: true });
}

/** Window chrome around every scene so the three read as one product. */
function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0d0f13] text-[#e8eaee] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-xs text-white/50">{title}</span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* ───────────────────────── PLAN: architecture draws itself ───────────────────────── */

const NODES = [
  { id: "ui", x: 40, y: 150, w: 160, label: "Screens", sub: "Flutter widgets", at: 0 },
  { id: "state", x: 260, y: 150, w: 160, label: "State", sub: "Riverpod", at: 0.12 },
  { id: "repo", x: 480, y: 150, w: 170, label: "Repository", sub: "one source of truth", at: 0.24 },
  { id: "local", x: 700, y: 60, w: 180, label: "Drift / SQLite", sub: "works offline", at: 0.36 },
  { id: "remote", x: 700, y: 240, w: 180, label: "Firebase · Supabase", sub: "sync & auth", at: 0.46 },
  { id: "i18n", x: 40, y: 300, w: 160, label: "EN · BN", sub: "every string", at: 0.56 },
] as const;

/** Narrow screens stack the same diagram vertically. */
const NODES_V = [
  { id: "ui", x: 20, y: 20, w: 170, label: "Screens", sub: "Flutter widgets", at: 0 },
  { id: "state", x: 20, y: 120, w: 170, label: "State", sub: "Riverpod", at: 0.12 },
  { id: "repo", x: 20, y: 220, w: 170, label: "Repository", sub: "source of truth", at: 0.24 },
  { id: "local", x: 20, y: 330, w: 170, label: "Drift / SQLite", sub: "works offline", at: 0.36 },
  { id: "remote", x: 215, y: 330, w: 170, label: "Firebase", sub: "sync & auth", at: 0.46 },
  { id: "i18n", x: 215, y: 20, w: 170, label: "EN · BN", sub: "every string", at: 0.56 },
] as const;

const EDGES_V = [
  { d: "M105 80 V120", at: 0.14 },
  { d: "M105 180 V220", at: 0.26 },
  { d: "M105 280 V330", at: 0.38 },
  { d: "M105 300 C105 315 300 300 300 330", at: 0.48 },
  { d: "M190 50 H215", at: 0.58 },
];

const EDGES = [
  { d: "M200 180 H260", at: 0.14 },
  { d: "M420 180 H480", at: 0.26 },
  { d: "M650 170 C675 170 675 90 700 90", at: 0.38 },
  { d: "M650 190 C675 190 675 270 700 270", at: 0.48 },
  { d: "M120 210 V300", at: 0.58 },
];

function PlanNode({ n, p }: { n: (typeof NODES)[number] | (typeof NODES_V)[number]; p: MotionValue<number> }) {
  const t = useStage(p, n.at, n.at + 0.12);
  const y = useTransform(t, [0, 1], [14, 0]);
  // Never fully hidden: the diagram rests as a faint outline until its turn.
  const opacity = useTransform(t, [0, 1], [0.16, 1]);
  return (
    <motion.g style={{ opacity, y }}>
      <rect x={n.x} y={n.y} width={n.w} height={60} rx={14} fill="#161a21" stroke="rgba(255,255,255,0.18)" />
      <text x={n.x + 16} y={n.y + 26} fill="#f2f3f5" fontSize="16" fontWeight="600">
        {n.label}
      </text>
      <text x={n.x + 16} y={n.y + 45} fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="var(--font-geist-mono)">
        {n.sub}
      </text>
    </motion.g>
  );
}

function PlanEdge({ d, p, at }: { d: string; p: MotionValue<number>; at: number }) {
  const len = useStage(p, at, at + 0.12);
  return (
    <>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.5} strokeDasharray="4 5" />
      <motion.path d={d} fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" style={{ pathLength: len, opacity: len }} />
    </>
  );
}

function Note({ p, at, className, children }: { p: MotionValue<number>; at: number; className: string; children: ReactNode }) {
  const t = useStage(p, at, at + 0.1);
  const scale = useTransform(t, [0, 1], [0.8, 1]);
  return (
    <motion.div
      style={{ opacity: t, scale }}
      className={`absolute rounded-lg bg-[#fde68a] px-3 py-2 font-mono text-[11px] font-medium text-[#3b2f05] shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PlanScene({ p }: { p: MotionValue<number> }) {
  return (
    <Window title="docs/architecture.md">
      {/* blueprint grid */}
      <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(#5b8cff_1px,transparent_1px),linear-gradient(90deg,#5b8cff_1px,transparent_1px)] [background-size:28px_28px]" />
      <svg viewBox="0 0 920 380" className="absolute inset-x-[4%] top-[10%] hidden h-[68%] w-[92%] sm:block">
        {EDGES.map((e) => (
          <PlanEdge key={e.d} d={e.d} p={p} at={e.at} />
        ))}
        {NODES.map((n) => (
          <PlanNode key={n.id} n={n} p={p} />
        ))}
      </svg>
      <svg viewBox="0 0 405 400" className="absolute inset-x-[5%] top-[6%] h-[70%] w-[90%] sm:hidden">
        {EDGES_V.map((e) => (
          <PlanEdge key={e.d} d={e.d} p={p} at={e.at} />
        ))}
        {NODES_V.map((n) => (
          <PlanNode key={n.id} n={n} p={p} />
        ))}
      </svg>
      <Note p={p} at={0.7} className="bottom-[13%] left-[5%] -rotate-3 sm:bottom-[8%] sm:left-[30%]">
        Who opens this every day?
      </Note>
      <Note p={p} at={0.78} className="bottom-[4%] right-[6%] rotate-2 sm:bottom-[12%] sm:left-[60%] sm:right-auto">
        Must work with no signal
      </Note>
      <Note p={p} at={0.86} className="bottom-[22%] right-[5%] rotate-3 sm:bottom-auto sm:top-[6%]">
        Bangla + English from day one
      </Note>
    </Window>
  );
}

/* ───────────────────────── BUILD: code types itself ───────────────────────── */

type Tok = [string, string];
const C = { k: "#c792ea", t: "#82aaff", f: "#ffcb6b", a: "#89ddff", x: "#e8eaee", m: "#697098" };
const CODE: Tok[][] = [
  [["@riverpod", C.a]],
  [["class ", C.k], ["TodayDoses ", C.t], ["extends ", C.k], ["_$TodayDoses ", C.t], ["{", C.x]],
  [["  @override", C.a]],
  [["  Stream", C.t], ["<", C.x], ["List", C.t], ["<", C.x], ["Dose", C.t], [">> ", C.x], ["build", C.f], ["() =>", C.x]],
  [["      ref.", C.x], ["watch", C.f], ["(doseRepo).", C.x], ["watchToday", C.f], ["();", C.x]],
  [["", C.x]],
  [["  // Taking a dose also silences its alarm.", C.m]],
  [["  Future", C.t], ["<", C.x], ["void", C.k], ["> ", C.x], ["take", C.f], ["(", C.x], ["Dose ", C.t], ["dose) ", C.x], ["async ", C.k], ["{", C.x]],
  [["    await ", C.k], ["ref.", C.x], ["read", C.f], ["(doseRepo).", C.x], ["markTaken", C.f], ["(dose);", C.x]],
  [["    await ", C.k], ["AlarmService", C.t], [".", C.x], ["cancel", C.f], ["(dose.alarmId);", C.x]],
  [["  }", C.x]],
  [["}", C.x]],
];
const LINE_LEN = CODE.map((line) => line.reduce((m, [s]) => m + s.length, 0) + 1);
const TOTAL = LINE_LEN.reduce((a, b) => a + b, 0);
/** Character offset where each line starts. */
const LINE_START = LINE_LEN.map((_, i) => LINE_LEN.slice(0, i).reduce((a, b) => a + b, 0));
/** Character offset where each token starts, per line. */
const TOK_START = CODE.map((line, i) => line.map((_, j) => LINE_START[i] + line.slice(0, j).reduce((m, [s]) => m + s.length, 0)));

function Typed({ chars }: { chars: number }) {
  return (
    <pre className="font-mono text-[10px] leading-[1.75] sm:text-[12px] xl:text-[13.5px]">
      {CODE.map((line, i) => {
        const into = chars - LINE_START[i];
        const isTyping = into > 0 && into < LINE_LEN[i];
        return (
          <div key={i} className="flex">
            <span className="w-7 shrink-0 select-none text-right text-white/25">{i + 1}</span>
            <span className="whitespace-pre pl-4">
              {line.map(([s, color], j) => {
                const shown = s.slice(0, Math.max(0, chars - TOK_START[i][j]));
                return shown ? (
                  <span key={j} style={{ color }}>
                    {shown}
                  </span>
                ) : null;
              })}
              {isTyping ? <span className="ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse bg-[#82aaff]" /> : null}
            </span>
          </div>
        );
      })}
    </pre>
  );
}

function Toast({ p, at, className, children }: { p: MotionValue<number>; at: number; className: string; children: ReactNode }) {
  const t = useStage(p, at, at + 0.08);
  const x = useTransform(t, [0, 1], [24, 0]);
  return (
    <motion.div
      style={{ opacity: t, x }}
      className={`absolute flex items-center gap-2 rounded-xl border border-white/10 bg-[#161a21]/95 px-3.5 py-2.5 font-mono text-xs text-white shadow-xl backdrop-blur ${className}`}
    >
      {children}
    </motion.div>
  );
}

function BuildScene({ p }: { p: MotionValue<number> }) {
  const [chars, setChars] = useState(() => Math.round(Math.min(1, p.get() / 0.75) * TOTAL));
  useMotionValueEvent(p, "change", (v) => setChars(Math.round(Math.min(1, v / 0.75) * TOTAL)));
  const phone = useStage(p, 0.05, 0.25);
  const phoneY = useTransform(phone, [0, 1], [60, 0]);
  return (
    <Window title="lib/features/doses/today_doses.dart">
      <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden p-4 pt-5 sm:p-5 sm:pt-6">
          <Typed chars={chars} />
        </div>
        <div className="relative hidden overflow-hidden border-l border-white/10 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(91,140,255,0.18),transparent)] sm:block">
          <motion.div style={{ opacity: phone, y: phoneY }} className="absolute inset-x-0 bottom-[-8%] top-[8%] flex justify-center">
            <div className="relative h-full" style={{ aspectRatio: "1144 / 2392" }}>
              <Image src="/projects/phones/dosey-home.webp" alt="" fill quality={90} sizes="260px" className="object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
      <Toast p={p} at={0.78} className="bottom-[16%] right-[4%] sm:bottom-auto sm:top-[6%]">
        <span className="text-[#ffcb6b]">⚡</span> Hot reload
      </Toast>
      <Toast p={p} at={0.88} className="bottom-[5%] right-[4%] sm:bottom-auto sm:top-[19%]">
        <span className="text-[#22c55e]">✓</span> Tests passed
      </Toast>
    </Window>
  );
}

/* ───────────────────────── SHIP: release pipeline ───────────────────────── */

const PIPELINE = ["flutter build appbundle", "Unit & widget tests", "Store review", "Live"];

function PipelineStep({ p, i, label, last }: { p: MotionValue<number>; i: number; label: string; last: boolean }) {
  const at = 0.06 + i * 0.13;
  const [done, setDone] = useState(() => p.get() > at + 0.1);
  useMotionValueEvent(p, "change", (v) => setDone(v > at + 0.1));
  const fill = useStage(p, at + 0.1, at + 0.2);
  return (
    <li>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors duration-300 ${
            done ? "border-[#22c55e] bg-[#22c55e] text-black" : "border-white/20 text-white/40"
          }`}
        >
          {done ? "✓" : i + 1}
        </span>
        <span className={`font-mono text-[12px] transition-colors sm:text-[13px] ${done ? "text-white" : "text-white/45"}`}>{label}</span>
      </div>
      {last ? null : (
        <div className="ml-[13px] h-6 w-[2px] bg-white/10">
          <motion.div className="h-full w-full origin-top bg-[#22c55e]" style={{ scaleY: fill }} />
        </div>
      )}
    </li>
  );
}

function LiveApp({ p, i, app }: { p: MotionValue<number>; i: number; app: (typeof projects)[number] }) {
  const t = useStage(p, 0.58 + i * 0.07, 0.68 + i * 0.07);
  const scale = useTransform(t, [0, 1], [0.92, 1]);
  const opacity = useTransform(t, [0, 1], [0.22, 1]);
  return (
    <motion.li style={{ opacity, scale }} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-[#161a21] p-2 text-center sm:gap-2 sm:rounded-2xl sm:p-3 xl:p-4">
      <Image src={app.icon} alt="" width={56} height={56} className="h-9 w-9 rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl xl:h-14 xl:w-14" />
      <span className="line-clamp-1 text-[11px] font-semibold sm:text-sm">{app.title}</span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22c55e]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#4ade80]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" /> Live
      </span>
    </motion.li>
  );
}

const LIVE = projects.filter((x) => x.status === "live" && !x.web);

function ShipScene({ p }: { p: MotionValue<number> }) {
  const outro = useStage(p, 0.88, 0.98);
  return (
    <Window title="release · production">
      <div className="absolute inset-0 grid grid-cols-1 content-start gap-6 p-5 sm:grid-cols-[0.8fr_1.4fr] sm:content-stretch sm:p-6 xl:p-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">Pipeline</p>
          <ol className="mt-4 sm:mt-5">
            {PIPELINE.map((label, i) => (
              <PipelineStep key={label} p={p} i={i} label={label} last={i === PIPELINE.length - 1} />
            ))}
          </ol>
        </div>
        <div className="flex min-h-0 flex-col">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">On the stores</p>
          <ul className="mt-4 grid grid-cols-4 gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3">
            {LIVE.map((app, i) => (
              <LiveApp key={app.id} p={p} i={i} app={app} />
            ))}
          </ul>
          <motion.p style={{ opacity: outro }} className="mt-auto pt-4 font-mono text-xs leading-relaxed text-white/55">
            Then the growth phase: crash reports, rating prompts, faster start-up.
          </motion.p>
        </div>
      </div>
    </Window>
  );
}

const SCENES = [PlanScene, BuildScene, ShipScene];

/* ───────────────────────── section ───────────────────────── */

/** Phones and tablets: each step plays its scene while it scrolls through the viewport. */
function MobileStep({ i }: { i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 70%"] });
  const full = useMotionValue(1);
  const Scene = SCENES[i];
  const s = process[i];
  return (
    <li ref={ref}>
      <p className="eyebrow text-on-inverse-muted">0{i + 1}</p>
      <p className="display mt-2 text-7xl">{s.word}</p>
      <p className="mt-4 max-w-xl leading-relaxed text-on-inverse-muted">{s.text}</p>
      <div className="mt-6 h-[min(120vw,560px)]">
        <Scene p={reduce ? full : scrollYProgress} />
      </div>
    </li>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = process.length;
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.floor(v * n))));

  // Progress inside each step, finishing a little early so each scene rests complete before the next.
  const p0 = useTransform(scrollYProgress, [0, 0.27], [0, 1]);
  const p1 = useTransform(scrollYProgress, [1 / 3, 0.6], [0, 1]);
  const p2 = useTransform(scrollYProgress, [2 / 3, 0.94], [0, 1]);
  const full = useMotionValue(1);
  const local = reduce ? [full, full, full] : [p0, p1, p2];
  const Scene = SCENES[active];

  return (
    <Panel tone="inverse" labelledBy="process-heading" className="mt-3">
      <div className="px-5 pt-14 sm:px-10 sm:pt-20">
        <SectionTitle id="process-heading" title="How I work" counter="05" kicker="Plan · Build · Ship" />
      </div>

      <ol className="space-y-16 px-5 pb-14 pt-10 sm:px-10 lg:hidden">
        {process.map((s, i) => (
          <MobileStep key={s.word} i={i} />
        ))}
      </ol>

      {/* Desktop: pinned while the three steps play out */}
      <div ref={ref} className="relative hidden h-[360vh] lg:block">
        <div className="sticky top-0 flex h-svh items-center px-10 py-14">
          <div className="mx-auto grid h-full max-h-[760px] w-full max-w-[1600px] grid-cols-[minmax(0,0.75fr)_minmax(0,1.45fr)] items-center gap-14">
            <div>
              <ol>
                {process.map((s, i) => (
                  <li key={s.word} className="border-t border-inverse-line py-3">
                    <div className="flex items-baseline gap-4">
                      <span className="eyebrow text-on-inverse-muted">0{i + 1}</span>
                      <span
                        className={`display text-[5rem] transition-colors duration-500 xl:text-[6.5rem] ${
                          i === active ? "text-on-inverse" : "text-on-inverse-muted/40"
                        }`}
                      >
                        {s.word}
                      </span>
                    </div>
                    <div className="mt-2 h-[2px] w-full bg-inverse-line">
                      <motion.div className="h-full origin-left bg-live" style={{ scaleX: local[i] }} />
                    </div>
                  </li>
                ))}
              </ol>
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 max-w-md leading-relaxed text-on-inverse-muted"
                >
                  {process[active].text}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative h-full max-h-[620px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Scene p={local[active]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
