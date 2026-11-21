"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { projects, type Project } from "@/lib/content";

type Shot = { src: string; title: string; live: boolean; status: Project["status"] };

/** Every app's screens, dealt round-robin so neighbours come from different apps. */
const shots: Shot[] = (() => {
  const piles = projects
    .filter((p) => p.gallery?.length)
    .map((p) =>
      (p.gallery ?? []).map((g) => ({
        src: g.src,
        // Long names are cut to their first two words so the label stays a chip.
        title: p.title.split(" ").slice(0, 2).join(" "),
        live: p.status === "live",
        status: p.status,
      })),
    );
  const out: Shot[] = [];
  for (let round = 0; piles.some((pile) => round < pile.length); round++) {
    for (const pile of piles) if (round < pile.length) out.push(pile[round]);
  }
  return out;
})();

/** Which screen card i shows. Screens are dealt app by app, so neighbours along a row differ. */
const shotOf = (i: number) => shots[i % shots.length];

const appCount = new Set(shots.map((s) => s.title)).size;
const liveCount = new Set(shots.filter((s) => s.live).map((s) => s.title)).size;
const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const word = (n: number) => WORDS[n] ?? String(n);

const GLOBE_RADIUS = 1.1;
/** Only this many survive the burst; the rest (the smallest tiles) melt away with the globe. */
const CLOUD_COUNT = 96;
const GRID_COLS = 6;
/** Rows in the wall's loop; four show at a time while the fifth wraps round out of sight. */
const GRID_ROWS = 5;
const WALL_SCALE = 0.72;
const WALL_COL = 0.33;
const WALL_ROW = 0.61;
/** The row position the scan band sits on. */
const SCAN_ROW = 2;
/** Short status labels that fit on a card. */
const STATUS_CHIP: Record<Project["status"], string> = { live: "Live", building: "In dev", prototype: "Prototype" };
/** Wall slot k is filled by card k × 3; stepping by 3 gives every slot a different screen. */
const gridSlotOf = (i: number) => (i % 3 === 0 && i / 3 < GRID_COLS * GRID_ROWS ? i / 3 : -1);
/** Six of the grid cards (each a different app's home screen) stay on to circle the case-study card. */
const RING_CARDS = [0, 3, 6, 36, 39, 69];
const RING_SPOTS = [
  [-0.84, -0.8, -5],
  [0.86, -0.86, 4],
  [-0.98, 0.12, 3],
  [0.98, 0.18, -3],
  [-0.76, 0.98, -4],
  [0.72, 1.02, 5],
];

/** Stable pseudo-random in [0, 1) so server and client agree. */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const RAD = Math.PI / 180;
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ramp = (v: number, from: number, to: number) => clamp((v - from) / (to - from));
const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** A card's pose: x, y, z in sphere radii, then rotateX/Y/Z in degrees, scale, opacity. */
type Pose = [number, number, number, number, number, number, number, number];

/**
 * Where each card sits on the globe. Cards come in four sizes and are scattered freely, big
 * ones first and smaller ones dropped into the gaps, each kept only if it clears every card
 * already placed. That gives the loose, hand-laid look of a collage without any screen
 * cutting into another.
 */
const TIERS: [size: number, count: number][] = [
  [0.62, 14],
  [0.5, 30],
  [0.38, 60],
  [0.27, 110],
];
const LAT: number[] = [];
const LON: number[] = [];
const SIZE: number[] = [];
(() => {
  const gap = 0.022;
  let draw = 0;
  const next = () => rand(draw++, 11);
  for (const [size, count] of TIERS) {
    const w = 0.36 * size;
    const h = 0.753 * size;
    for (let placed = 0, tries = 0; placed < count && tries < 30000; tries++) {
      const lat = Math.asin((next() * 2 - 1) * 0.92) / RAD;
      const lon = next() * 360;
      const clear = LAT.every((otherLat, j) => {
        const otherH = 0.753 * SIZE[j];
        const otherW = 0.36 * SIZE[j];
        // Sideways room is measured at whichever card sits nearer a pole, where the globe is narrower.
        const edge = Math.max(Math.abs(lat), Math.abs(otherLat)) * RAD;
        let turn = Math.abs(lon - LON[j]) % 360;
        if (turn > 180) turn = 360 - turn;
        const dx = turn * RAD * Math.cos(edge) * GLOBE_RADIUS;
        const dy = Math.abs(lat - otherLat) * RAD * GLOBE_RADIUS;
        return dx > (w + otherW) / 2 + gap || dy > (h + otherH) / 2 + gap;
      });
      if (!clear) continue;
      LAT.push(lat);
      LON.push(lon);
      SIZE.push(size);
      placed++;
    }
  }
})();
const CARD_COUNT = LAT.length;
const STAGGER = Array.from({ length: CARD_COUNT }, (_, i) => rand(i, 9));

/** Camera distance in radii and the globe's forward lean; both mirror the CSS on the stage. */
const CAMERA = 5;
const LEAN = -10;
const TILT_SIN = Math.sin(LEAN * RAD);
const TILT_COS = Math.cos(LEAN * RAD);

/**
 * Globe pose at a given spin. Cards fade out well before they turn edge-on, so the ball reads
 * solid and no bright sliver flashes along the rim.
 */
function spherePose(i: number, spin: number, out: Pose) {
  let yaw = (LON[i] + spin) % 360;
  if (yaw > 180) yaw -= 360;
  if (yaw < -180) yaw += 360;
  const pitch = -LAT[i];
  const cp = Math.cos(pitch * RAD);
  const facing = cp * Math.cos(yaw * RAD);
  const reach = GLOBE_RADIUS;
  const up = -Math.sin(pitch * RAD);
  out[0] = cp * Math.sin(yaw * RAD) * reach;
  out[1] = up * reach;
  out[2] = facing * reach;
  out[3] = pitch;
  out[4] = yaw;
  out[5] = 0;
  out[6] = SIZE[i];
  // How squarely the card faces the camera, allowing for the globe's lean and the perspective
  // (camera 5 radii away): 0 is edge-on, 1 is flat to the viewer.
  const depth = up * TILT_SIN + facing * TILT_COS;
  const square = (CAMERA * depth - reach) / Math.sqrt(CAMERA * CAMERA + reach * reach - 2 * CAMERA * reach * depth);
  out[7] = smooth(clamp((square - 0.12) / 0.3));
}

/** Loose cloud the globe bursts into. */
const CLOUD: Pose[] = Array.from({ length: CARD_COUNT }, (_, i) => {
  const yaw = LON[i] * RAD;
  const cp = Math.cos(LAT[i] * RAD);
  const reach = 1.25 + rand(i, 1) * 1.25;
  const z = cp * Math.cos(yaw) * reach * 0.8;
  return [
    cp * Math.sin(yaw) * reach * 1.5,
    Math.sin(LAT[i] * RAD) * reach * 0.95,
    z,
    (rand(i, 2) - 0.5) * 90,
    (rand(i, 3) - 0.5) * 120,
    (rand(i, 4) - 0.5) * 80,
    0.36 + rand(i, 5) * 0.26,
    i >= CLOUD_COUNT ? 0 : z < 0 ? 0.5 : 1,
  ];
});

/** Tidy wall of screens; everything that has no slot drifts off and fades. */
const GRID: Pose[] = CLOUD.map((c, i) => {
  const slot = gridSlotOf(i);
  if (slot < 0) return [c[0] * 1.5, c[1] * 1.5, c[2] - 0.6, c[3], c[4], c[5], 0.3, 0];
  const col = slot % GRID_COLS;
  const row = Math.floor(slot / GRID_COLS);
  return [(col - (GRID_COLS - 1) / 2) * WALL_COL, (row - GRID_ROWS / 2) * WALL_ROW, 0, 0, 0, 0, WALL_SCALE, 1];
});

/**
 * The wall in motion: rows glide upwards without pause, like headlines on a news ticker, and
 * wrap from top to bottom out of sight. Writes the pose for `slot` at loop position `shift` and
 * returns how fully the card sits in the scan band (0–1).
 */
function wallPose(slot: number, shift: number, out: Pose) {
  const col = slot % GRID_COLS;
  const at = (((Math.floor(slot / GRID_COLS) - shift) % GRID_ROWS) + GRID_ROWS) % GRID_ROWS;
  out[0] = (col - (GRID_COLS - 1) / 2) * WALL_COL;
  out[1] = (at - GRID_ROWS / 2) * WALL_ROW;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 0;
  out[6] = WALL_SCALE;
  out[7] = smooth(clamp(at / 0.7)) * smooth(clamp((GRID_ROWS - at) / 0.7));
  return smooth(clamp(1 - Math.abs(at - SCAN_ROW) / 0.55));
}

/** Six screens around the case-study card; `spread` narrows the ring on phones. */
const ringPoses = (spread: number): Pose[] =>
  GRID.map((g, i) => {
    const spot = RING_CARDS.indexOf(i);
    if (spot < 0) return [g[0] * 1.9, g[1] * 1.9, -0.8, g[3], g[4], g[5], 0.5, 0];
    const [x, y, roll] = RING_SPOTS[spot];
    return [x * spread, y, 0.05, 0, 0, roll, 0.86, 1];
  });
const RING_WIDE = ringPoses(1);
const RING_NARROW = ringPoses(0.9);

/** Where the formation sits on the stage (fractions of its width and height) at each step. */
const ANCHORS_WIDE = [[0.73, 0.57], [0.5, 0.5], [0.3, 0.54], [0.68, 0.5]];
const ANCHORS_NARROW = [[0.5, 0.73], [0.5, 0.44], [0.5, 0.41], [0.5, 0.39]];

const poseStyle = (p: Pose) => ({
  transform: `translate3d(calc(var(--r) * ${p[0].toFixed(4)}), calc(var(--r) * ${p[1].toFixed(4)}), calc(var(--r) * ${p[2].toFixed(4)})) rotateY(${p[4].toFixed(2)}deg) rotateX(${p[3].toFixed(2)}deg) rotateZ(${p[5].toFixed(2)}deg) scale(${p[6].toFixed(4)})`,
  opacity: p[7].toFixed(3),
});

/** The resting globe, rendered on the server and kept as-is under reduced motion. */
const INITIAL = Array.from({ length: CARD_COUNT }, (_, i) => {
  const pose: Pose = [0, 0, 0, 0, 0, 0, 1, 1];
  spherePose(i, 0, pose);
  return poseStyle(pose);
});

const BRIEF_ROWS = [
  ["Problem", "w-[58%]"],
  ["Approach", "w-[44%]"],
  ["Result", "w-[52%]"],
  ["Stack", "w-[36%]"],
];
/** Local 0–1 progress for one piece of the case-study card, starting `at` of the way through the fill. */
const fillAt = (at: number) => ({ "--p": `clamp(0, calc((var(--fill) - ${at}) * 4), 1)` }) as CSSProperties;

/**
 * Dust: three sheets of specks at different depths. Each sheet is one element whose dots are
 * box-shadows, so a few hundred specks cost three layers.
 */
const DUST = [-1.2, 0.2, 1.4].map((depth, layer) => ({
  depth,
  shadows: Array.from({ length: 120 }, (_, n) => {
    const i = layer * 200 + n;
    const x = ((rand(i, 21) - 0.5) * 7.6).toFixed(3);
    const y = ((rand(i, 22) - 0.5) * 4.6).toFixed(3);
    const alpha = Math.round(35 + rand(i, 23) * 55);
    const grow = rand(i, 24) > 0.7 ? "1px" : "0";
    return `calc(var(--r) * ${x}) calc(var(--r) * ${y}) 0 ${grow} color-mix(in srgb, var(--ink) ${alpha}%, transparent)`;
  }).join(", "),
}));

const preserve: CSSProperties = { transformStyle: "preserve-3d" };

function Beat({ n, className, children }: { n: number; className: string; children: ReactNode }) {
  return (
    <p
      className={`absolute bottom-10 left-5 right-5 z-20 text-4xl font-medium leading-[1.02] tracking-tight md:text-5xl ${className}`}
      style={{ opacity: `var(--b${n})`, transform: `translateY(calc((1 - var(--b${n})) * 36px))` }}
    >
      {children}
    </p>
  );
}

/**
 * Opening of the work section, told with one set of app screens that keeps re-forming
 * as you scroll: a turning globe, a burst into a cloud, a scanned wall that picks out
 * the live apps, then six screens around a case-study card before the project grid.
 */
export function WorkGlobe({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(stage, { margin: "200px 0px" });
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useEffect(() => {
    if (reduce || !inView) return;
    const narrowQuery = window.matchMedia("(max-width: 767px)");
    const from: Pose = [0, 0, 0, 0, 0, 0, 1, 1];
    const wall: Pose = [0, 0, 0, 0, 0, 0, 1, 1];
    let raf = 0;
    let last = 0;
    // Scroll arrives in steps; easing towards it keeps the turn and the morphs from twitching.
    let v = scrollYProgress.get();
    // Radius in pixels, so each frame writes plain lengths instead of calc() the browser must re-resolve.
    let r = 0;
    const measure = () => {
      r = (cardEls.current[0]?.offsetWidth ?? 0) / 0.36;
    };
    measure();
    const resize = new ResizeObserver(measure);
    if (stage.current) resize.observe(stage.current);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const el = stage.current;
      const pin = anchor.current;
      if (!el || !pin) return;
      if (!r) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      v += (scrollYProgress.get() - v) * (dt ? 1 - Math.exp(-dt * 9) : 1);
      const t = now / 1000;
      const narrow = narrowQuery.matches;

      // 0 globe → 1 cloud → 2 wall → 3 ring, with a hold between each move.
      const phase = smooth(ramp(v, 0.1, 0.27)) + smooth(ramp(v, 0.36, 0.52)) + smooth(ramp(v, 0.66, 0.82));
      const step = Math.min(2, Math.floor(phase));
      const u = phase - step;
      const forms: (Pose[] | null)[] = [null, CLOUD, GRID, narrow ? RING_NARROW : RING_WIDE];
      const focus = smooth(ramp(v, 0.54, 0.6)) * (1 - smooth(ramp(v, 0.66, 0.72)));
      const drift = clamp(phase) * (1 - clamp(phase - 1));
      const spin = t * 5 + v * 220;
      const fromForm = forms[step];
      const toForm = forms[step + 1] as Pose[];
      // The wall never stops: rows glide up at a steady pace, about four seconds each.
      const shift = t * 0.26;

      for (let i = 0; i < CARD_COUNT; i++) {
        const card = cardEls.current[i];
        if (!card) continue;
        let a = from;
        if (fromForm) a = fromForm[i];
        else spherePose(i, spin, from);
        let b = toForm[i];
        const slot = gridSlotOf(i);
        let lit = 0;
        if (slot >= 0 && (fromForm === GRID || toForm === GRID)) {
          lit = wallPose(slot, shift, wall);
          if (fromForm === GRID) a = wall;
          else b = wall;
        }
        // Cards leave one after another rather than as a block.
        const k = smooth(clamp(u * 1.4 - STAGGER[i] * 0.4));
        const bob = Math.sin(t * 0.7 + i) * 0.035 * drift;
        let opacity = mix(a[7], b[7], k);
        if (slot >= 0) {
          // Rows outside the scan band sit back; the row inside it shows its status.
          opacity *= 1 - 0.66 * focus * (1 - lit);
          card.style.setProperty("--lit", lit.toFixed(3));
        }
        card.style.transform = `translate3d(${(mix(a[0], b[0], k) * r).toFixed(2)}px, ${((mix(a[1], b[1], k) + bob) * r).toFixed(2)}px, ${(mix(a[2], b[2], k) * r).toFixed(2)}px) rotateY(${mix(a[4], b[4], k).toFixed(3)}deg) rotateX(${mix(a[3], b[3], k).toFixed(3)}deg) rotateZ(${mix(a[5], b[5], k).toFixed(3)}deg) scale(${mix(a[6], b[6], k).toFixed(4)})`;
        // Opacity only: toggling visibility made the browser build and drop layers as cards crossed the rim.
        const shown = opacity.toFixed(3);
        if (card.style.opacity !== shown) card.style.opacity = shown;
      }

      const spots = narrow ? ANCHORS_NARROW : ANCHORS_WIDE;
      pin.style.left = `${(mix(spots[step][0], spots[step + 1][0], u) * 100).toFixed(3)}%`;
      pin.style.top = `${(mix(spots[step][1], spots[step + 1][1], u) * 100).toFixed(3)}%`;

      const b2 = smooth(ramp(v, 0.2, 0.28)) * (1 - smooth(ramp(v, 0.36, 0.42)));
      const b3 = smooth(ramp(v, 0.5, 0.57)) * (1 - smooth(ramp(v, 0.66, 0.71)));
      const b4 = smooth(ramp(v, 0.8, 0.87));
      const set = (name: string, n: number) => el.style.setProperty(name, n.toFixed(4));
      set("--tilt", 1 - clamp(phase));
      set("--wall", clamp(1 - Math.abs(phase - 2)));
      // Specks hang faintly round the globe, fill the air with the burst, and clear for the wall.
      set("--dust", (0.45 + 0.55 * clamp(phase)) * (1 - clamp(phase - 1)));
      set("--dust-spread", 0.5 + 0.5 * clamp(phase));
      set("--focus", focus);
      set("--ring", smooth(ramp(v, 0.76, 0.86)));
      set("--fill", ramp(v, 0.83, 0.97));
      set("--b1", 1 - ramp(v, 0.06, 0.18));
      set("--b2", b2);
      set("--b3", b3);
      set("--b4", b4);
      set("--scrim", narrow ? Math.max(b2, b3, b4) : b2);
      set("--hint", 1 - ramp(v, 0, 0.06));
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
    };
  }, [reduce, inView, scrollYProgress]);

  // The formation leans a little towards the pointer.
  const tiltX = useSpring(0, { stiffness: 60, damping: 14 });
  const tiltY = useSpring(0, { stiffness: 60, damping: 14 });

  return (
    <div ref={track} className={reduce ? "" : "h-[380svh] md:h-[440svh]"}>
      <div
        ref={stage}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const box = e.currentTarget.getBoundingClientRect();
          tiltY.set(((e.clientX - box.left) / box.width - 0.5) * 10);
          tiltX.set(((e.clientY - box.top) / box.height - 0.5) * -8);
        }}
        onPointerLeave={() => {
          tiltX.set(0);
          tiltY.set(0);
        }}
        className="work-globe-stage sticky top-0 isolate h-svh overflow-hidden"
        style={
          {
            "--tilt": 1,
            "--wall": 0,
            "--dust": 0.45,
            "--dust-spread": 0.5,
            "--focus": 0,
            "--ring": 0,
            "--fill": 0,
            "--b1": 1,
            "--b2": 0,
            "--b3": 0,
            "--b4": 0,
            "--scrim": 0,
            "--hint": 1,
          } as CSSProperties
        }
      >
        <div ref={anchor} aria-hidden className="work-globe-anchor pointer-events-none absolute">
          {/* Soft light the globe sits in. */}
          <div className="work-globe-glow absolute" />

          {/* Case-study card the last six screens gather around. */}
          <div className="work-globe-brief absolute rounded-[1.4em] border border-line-strong bg-panel-2 p-[1.6em] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <p className="eyebrow !text-[0.72em] text-muted">Case study</p>
            <span className="work-globe-fill mt-[1.1em] block h-[0.55em] w-3/5 origin-left rounded-full bg-ink" style={fillAt(0)} />
            <ul className="mt-[1.6em] flex flex-col gap-[1.05em]">
              {BRIEF_ROWS.map(([label, width], row) => (
                <li key={label} className="flex items-center gap-[0.9em]" style={fillAt(0.12 + row * 0.2)}>
                  {/* The label flies in from the phones on alternating sides, then its line writes itself. */}
                  <span
                    className="work-globe-fly rounded-full bg-ink/10 px-[0.9em] py-[0.35em] font-medium"
                    style={{ "--from": row % 2 ? "22em" : "-14em" } as CSSProperties}
                  >
                    {label}
                  </span>
                  <span className={`work-globe-fill work-globe-fill-late h-[0.4em] origin-left rounded-full bg-ink/25 ${width}`} />
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute inset-0" style={{ perspective: `calc(var(--r) * ${CAMERA})` }}>
            <motion.div className="absolute inset-0" style={{ ...preserve, rotateX: tiltX, rotateY: tiltY }}>
              <div
                className="absolute inset-0"
                style={{
                  ...preserve,
                  // The globe leans forward; the wall instead swings round so its left edge comes towards you.
                  transform: `rotateY(calc(var(--wall) * 26deg)) rotateX(calc(var(--wall) * 6deg)) rotateZ(calc(var(--tilt) * 8deg - var(--wall) * 3deg)) rotateX(calc(var(--tilt) * ${LEAN}deg))`,
                }}
              >
                {DUST.map((sheet, layer) => (
                  <span
                    key={layer}
                    className="work-globe-dust absolute left-0 top-0"
                    style={{
                      boxShadow: sheet.shadows,
                      transform: `translateZ(calc(var(--r) * ${sheet.depth})) scale(var(--dust-spread))`,
                      animationDelay: `${layer * -7}s`,
                    }}
                  />
                ))}
                {INITIAL.map((style, i) => {
                  const shot = shotOf(i);
                  const inGrid = gridSlotOf(i) >= 0;
                  return (
                    <div
                      key={i}
                      ref={(node) => {
                        cardEls.current[i] = node;
                      }}
                      className="work-globe-card absolute left-1/2 top-1/2"
                      style={style}
                      suppressHydrationWarning
                    >
                      <Image
                        src={shot.src}
                        alt=""
                        width={1144}
                        height={2392}
                        sizes="(max-width: 767px) 96px, 192px"
                        // Loaded up front so nothing decodes mid-spin.
                        loading="eager"
                        decoding="async"
                        className="h-auto w-full"
                        draggable={false}
                      />
                      {inGrid ? (
                        <span
                          className="work-globe-chip left-1/2 top-[70%] -translate-x-1/2 bg-white text-black"
                          style={{ opacity: "calc(var(--focus) * var(--lit, 0))" }}
                        >
                          <span className={`h-[0.5em] w-[0.5em] rounded-full ${shot.live ? "bg-live" : "bg-black/35"}`} />
                          {STATUS_CHIP[shot.status]}
                        </span>
                      ) : null}
                      {RING_CARDS.includes(i) ? (
                        <span className="work-globe-chip left-[58%] top-[86%] bg-ink text-panel" style={{ opacity: "var(--ring)" }}>
                          <svg viewBox="0 0 12 12" className="absolute -left-[0.9em] -top-[0.9em] h-[1.1em] w-[1.1em] fill-ink stroke-panel" strokeWidth="1">
                            <path d="M1 1l9 3.6-3.8 1.4L4.8 10z" />
                          </svg>
                          {shot.title}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
                {/* Scan band the rows pass through; it lies on the wall, so it tilts with it. */}
                <span
                  className="work-globe-scan absolute left-0 top-0"
                  style={{ opacity: "var(--focus)", transform: "translateZ(calc(var(--r) * 0.04))" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Fades the lower screens back so each line stays readable over white UI. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[60%] bg-linear-to-t from-panel via-panel/85 to-transparent"
          style={{ opacity: "var(--scrim)" }}
        />

        <div
          className="relative z-10 px-5 pt-24 sm:px-10 sm:pt-28"
          style={{ opacity: "var(--b1)", transform: "translateY(calc((1 - var(--b1)) * -48px))" }}
        >
          {children}
        </div>

        {reduce ? null : (
          <>
            <p
              aria-hidden
              className="eyebrow absolute bottom-6 left-5 z-10 flex items-center gap-2 sm:bottom-8 sm:left-10"
              style={{ opacity: "calc(0.6 * var(--hint))" }}
            >
              <span className="inline-block h-px w-8 bg-current" />
              Scroll to step inside
            </p>
            <Beat n={2} className="md:bottom-14 md:left-auto md:right-10 md:w-[36rem]">
              {word(appCount)} apps. {shots.length} screens.
              <span className="block text-muted">Quran, finance, fuel, health, AI and community.</span>
            </Beat>
            <Beat n={3} className="md:bottom-auto md:left-auto md:right-10 md:top-1/2 md:w-[30rem] md:-translate-y-1/2 lg:w-[34rem]">
              {word(liveCount)} are live on the stores.
              <span className="block text-muted">Real apps, on real phones, opened every day.</span>
            </Beat>
            <Beat n={4} className="md:bottom-14 md:right-auto md:left-10 md:w-[30rem]">
              Every app has a story.
              <span className="block text-muted">Problem, approach, result. Pick one and step inside.</span>
            </Beat>
          </>
        )}
      </div>
    </div>
  );
}
