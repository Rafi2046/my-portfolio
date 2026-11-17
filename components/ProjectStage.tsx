"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import type { Project } from "@/lib/content";

type Props = {
  project: Project;
  /** Tilts the scene towards the cursor. */
  interactive?: boolean;
  /** Small rendering (cards, previews): drops the caption chip. */
  compact?: boolean;
  priority?: boolean;
  className?: string;
  isHovered?: boolean;
};

type Shot = NonNullable<Project["gallery"]>[number];
type StageCard = NonNullable<Project["cards"]>[number];

const PHONE_SIZES = "(max-width: 768px) 55vw, 420px";

/** One flat phone mockup, sized by height and positioned by the caller. */
function Phone({ shot, className = "", style, priority }: { shot: Shot; className?: string; style?: CSSProperties; priority?: boolean }) {
  return (
    <div className={`absolute ${className}`} style={{ aspectRatio: `${shot.width} / ${shot.height}`, ...style }}>
      <Image
        src={shot.src}
        alt=""
        fill
        preload={priority}
        quality={90}
        sizes={PHONE_SIZES}
        className="object-contain drop-shadow-[0_2.5cqw_3cqw_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}

/** A cut-out piece of real UI floating in front of the phones. */
function Card({ card, className = "", style, delay = 0 }: { card: StageCard; className?: string; style?: CSSProperties; delay?: number }) {
  return (
    <div className={`absolute ${className}`} style={{ aspectRatio: `${card.w} / ${card.h}`, ...style }}>
      <div className="stage-float relative h-full w-full" style={{ animationDelay: `${delay}s` }}>
        <Image src={card.src} alt="" fill quality={90} sizes="(max-width: 768px) 45vw, 360px" className="object-contain drop-shadow-[0_2cqw_3cqw_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}

type Screen = NonNullable<Project["screens"]>[number];

/** A desktop browser window around a website screenshot, sized by width and positioned by the caller. */
function Browser({ screen, url, className = "", style, priority }: { screen: Screen; url: string; className?: string; style?: CSSProperties; priority?: boolean }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[1cqw] border border-white/15 bg-[#0d1117] shadow-[0_3cqw_5cqw_rgba(0,0,0,0.55)] ${className}`}
      style={style}
    >
      <div className="flex h-[3.2cqw] items-center gap-[0.7cqw] border-b border-white/10 px-[1.2cqw]">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="h-[0.9cqw] w-[0.9cqw] rounded-full" style={{ background: c }} />
        ))}
        <span className="mx-auto w-[45%] truncate rounded-full bg-white/[0.07] px-[1cqw] text-center text-[1.2cqw] leading-[1.9cqw] text-white/55">{url}</span>
      </div>
      <div className="relative" style={{ aspectRatio: `${screen.width} / ${screen.height}` }}>
        <Image src={screen.src} alt="" fill preload={priority} quality={90} sizes="(max-width: 768px) 90vw, 900px" className="object-cover object-top" />
      </div>
    </div>
  );
}

const SCAN_SPOTS = [
  "left-[9%] top-[16%] w-[25%] -rotate-[10deg]",
  "right-[8%] top-[10%] w-[23%] rotate-[8deg]",
  "right-[14%] bottom-[-8%] w-[22%] -rotate-[4deg]",
];

/** Ultra-smooth, lazy-loaded CSS phone mockup with video playback on hover (ANML style). */
function StagePhoneVideo({
  video,
  title,
  poster,
  isHovered,
  className = "",
  style,
}: {
  video: NonNullable<Project["video"]>;
  title: string;
  poster: string;
  isHovered?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isHovered && !hasInteracted) {
      setHasInteracted(true);
    }
    const v = videoRef.current;
    if (!v) return;
    if (isHovered) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isHovered, hasInteracted]);

  return (
    <div className={`absolute select-none pointer-events-none ${className}`} style={{ aspectRatio: "9 / 19.5", ...style }}>
      {/* Phone chassis: ultra-deep obsidian titanium edge, black bezel, realistic cinematic shadow */}
      <div className="absolute inset-0 rounded-[15%/7%] bg-[linear-gradient(150deg,#38383c_0%,#141416_30%,#08080a_70%,#26262a_100%)] p-[1.1%] shadow-[0_25px_50px_-10px_rgba(0,0,0,0.7),0_0_25px_rgba(0,0,0,0.35)] drop-shadow-[0_2.5cqw_3.5cqw_rgba(0,0,0,0.55)]">
        <div className="h-full w-full rounded-[14%/6.5%] bg-black p-[2.3%]">
          <div className="relative h-full w-full overflow-hidden rounded-[12%/5.6%] bg-black ring-1 ring-inset ring-black/40">
            {/* Crisp static poster displayed instantly without video decode lag */}
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 768px) 60vw, 420px"
              quality={90}
              className={`object-cover object-top transition-opacity duration-300 ${isHovered && hasInteracted ? "opacity-0" : "opacity-100"}`}
            />
            {/* Live video mounted on first hover for 120fps performance */}
            {hasInteracted ? (
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="auto"
                aria-label={`${title} app preview`}
                className={`h-full w-full object-cover object-top transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <source src={`${video.src}.webm`} type="video/webm" />
                <source src={`${video.src}.mp4`} type="video/mp4" />
              </video>
            ) : null}
            {/* Dynamic island */}
            <span aria-hidden className="absolute left-1/2 top-[1.6%] h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-black z-10" />
            {/* Soft glass reflection */}
            <span aria-hidden className="absolute -inset-y-full -left-1/2 w-full rotate-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Each app gets the presentation that suits it, not one template for all. */
function Scene({ project, priority, compact, isHovered }: { project: Project; priority?: boolean; compact?: boolean; isHovered?: boolean }) {
  const shots = project.gallery ?? [];
  const [a, b, c] = shots;
  const cards = project.cards ?? [];
  const variant = project.stage ?? (shots.length ? "fan" : "icon");

  switch (variant) {
    // Phone in hand fallback or trio fan: elegant center hero phone with video, flanked by companion screens
    case "hand":
    case "fan": {
      const springTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
      return (
        <>
          {[b, c].map((s, i) =>
            s ? (
              <motion.div
                key={s.src}
                className="absolute bottom-[8%] left-1/2 h-[84%]"
                style={{
                  aspectRatio: `${s.width} / ${s.height}`,
                  transformOrigin: "50% 100%",
                }}
                animate={
                  isHovered
                    ? {
                        x: `calc(-50% + ${i === 0 ? -74 : 74}%)`,
                        rotate: i === 0 ? -12 : 12,
                        scale: 0.88,
                        filter: "brightness(0.85)",
                      }
                    : {
                        x: `calc(-50% + ${i === 0 ? -62 : 62}%)`,
                        rotate: i === 0 ? -8 : 8,
                        scale: 0.84,
                        filter: "brightness(0.72)",
                      }
                }
                transition={springTransition}
              >
                <Phone shot={s} className="h-full w-full" />
              </motion.div>
            ) : null,
          )}
          <motion.div
            className="absolute bottom-[8%] left-1/2 h-[84%]"
            style={{
              aspectRatio: a ? `${a.width} / ${a.height}` : "9 / 19.5",
              x: "-50%",
            }}
            animate={isHovered ? { scale: 1.03, y: -6 } : { scale: 1, y: 0 }}
            transition={springTransition}
          >
            {compact && project.video ? (
              <StagePhoneVideo
                video={project.video}
                title={project.title}
                poster={project.video.poster}
                isHovered={isHovered}
                className="h-full w-full"
              />
            ) : a ? (
              <Phone shot={a} priority={priority} className="h-full w-full" />
            ) : null}
          </motion.div>
        </>
      );
    }

    // FuelSync: automotive dashboard with live phone swap & efficiency gauge
    case "isometric": {
      const springTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
      if (compact && project.video) {
        return (
          <>
            {/* Phone B (Stats graph) — supporting phone, stays behind/fans to right on hover */}
            {b ? (
              <motion.div
                className="absolute bottom-[6%] left-1/2 h-[84%]"
                style={{ aspectRatio: `${b.width} / ${b.height}` }}
                animate={
                  isHovered
                    ? { x: "18%", y: "4%", rotate: 9, scale: 0.88, filter: "brightness(0.62) blur(0.04cqw)", zIndex: 10 }
                    : { x: "6%", y: "2%", rotate: 6, scale: 0.9, filter: "brightness(0.68) blur(0.06cqw)", zIndex: 10 }
                }
                transition={springTransition}
              >
                <Image src={b.src} alt="" fill sizes={PHONE_SIZES} quality={90} className="object-contain drop-shadow-[0_2.5cqw_3cqw_rgba(0,0,0,0.55)]" />
              </motion.div>
            ) : null}

            {/* Hero Phone (Trip / Fuel Video) — in FRONT and crisp focus playing video */}
            <motion.div
              className="absolute bottom-[6%] left-1/2 h-[88%]"
              style={{ aspectRatio: "9 / 19.5" }}
              animate={
                isHovered
                  ? { x: "-46%", y: "-3%", rotate: 0, scale: 1.05, filter: "brightness(1) blur(0px)", zIndex: 25 }
                  : { x: "-50%", y: "0%", rotate: -2, scale: 1, filter: "brightness(1) blur(0px)", zIndex: 20 }
              }
              transition={springTransition}
            >
              <StagePhoneVideo
                video={project.video}
                title={project.title}
                poster={project.video.poster}
                isHovered={isHovered}
                className="h-full w-full"
              />
            </motion.div>

            {/* Automotive Efficiency Circular Gauge (37.8 km/L) */}
            {cards[0] ? (
              <motion.div
                className="absolute bottom-[8%] right-[6%] w-[26%]"
                animate={isHovered ? { scale: 1.08, rotate: 3, y: "-2%" } : { scale: 1, rotate: 0, y: "0%" }}
                transition={springTransition}
              >
                <Card card={cards[0]} className="w-full" delay={0.4} />
              </motion.div>
            ) : null}
          </>
        );
      }
      return (
        <>
          <div className="absolute inset-0 [perspective:2200px]">
            <div
              className="absolute left-1/2 top-1/2 flex h-[112%] items-center gap-[4cqw] [transform-style:preserve-3d]"
              style={{ transform: "translate(-50%,-48%) rotateX(50deg) rotateZ(-30deg)" }}
            >
              {[b, a, c].map((s, i) =>
                s ? (
                  <div key={s.src} className="relative h-full" style={{ aspectRatio: `${s.width} / ${s.height}`, transform: `translateY(${i === 1 ? -8 : 6}%)` }}>
                    <Image src={s.src} alt="" fill preload={priority && i === 1} quality={90} sizes={PHONE_SIZES} className="object-contain drop-shadow-[-2cqw_3cqw_2.5cqw_rgba(0,0,0,0.55)]" />
                  </div>
                ) : null,
              )}
            </div>
          </div>
          {cards[0] ? <Card card={cards[0]} className="bottom-[8%] right-[7%] w-[24%]" delay={0.4} /> : null}
        </>
      );
    }

    // One phone with its reminder cards pulled out and floating.
    case "float": {
      const springTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
      return (
        <>
          <motion.div
            className="absolute bottom-[6%] left-1/2 h-[86%]"
            style={{ aspectRatio: "9 / 19.5" }}
            animate={isHovered ? { x: "-50%", y: "-2%", rotate: -2, scale: 1.02 } : { x: "-50%", y: "0%", rotate: -4, scale: 1 }}
            transition={springTransition}
          >
            {compact && project.video ? (
              <StagePhoneVideo
                video={project.video}
                title={project.title}
                poster={project.video.poster}
                isHovered={isHovered}
                className="h-full w-full"
              />
            ) : a ? (
              <Phone shot={a} priority={priority} className="h-full w-full" />
            ) : null}
          </motion.div>
          {cards[0] ? (
            <motion.div
              className="absolute left-[8%] top-[20%] w-[34%]"
              animate={isHovered ? { x: "-8%", y: "-4%", rotate: -7 } : { x: "0%", y: "0%", rotate: -5 }}
              transition={springTransition}
            >
              <Card card={cards[0]} className="w-full" />
            </motion.div>
          ) : null}
          {cards[1] ? (
            <motion.div
              className="absolute bottom-[16%] right-[7%] w-[34%]"
              animate={isHovered ? { x: "8%", y: "4%", rotate: 6 } : { x: "0%", y: "0%", rotate: 4 }}
              transition={springTransition}
            >
              <Card card={cards[1]} className="w-full" delay={1.2} />
            </motion.div>
          ) : null}
        </>
      );
    }

    // Paper documents around the phone, with smooth document drift and laser sweep on hover
    case "scan": {
      const springTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
      return (
        <>
          {cards.slice(0, 3).map((d, i) => (
            <motion.div
              key={d.src}
              className={`absolute ${SCAN_SPOTS[i]}`}
              style={{ aspectRatio: `${d.w} / ${d.h}` }}
              animate={
                isHovered
                  ? i === 0
                    ? { x: "-6%", y: "-4%", rotate: -13 }
                    : i === 1
                    ? { x: "6%", y: "-3%", rotate: 11 }
                    : { x: "5%", y: "4%", rotate: -2 }
                  : { x: "0%", y: "0%" }
              }
              transition={springTransition}
            >
              <div className="stage-float relative h-full w-full overflow-hidden rounded-[0.6cqw] shadow-[0_2cqw_4cqw_rgba(0,0,0,0.45)]" style={{ animationDelay: `${i * 0.7}s` }}>
                <Image src={d.src} alt="" fill quality={85} sizes="(max-width: 768px) 30vw, 280px" className="object-cover brightness-[0.97]" />
                {i === 0 ? (
                  <span aria-hidden className="stage-scan absolute inset-x-0 h-[3%] bg-gradient-to-b from-transparent via-sky-400/80 to-transparent shadow-[0_0_2cqw_0.6cqw_rgba(56,189,248,0.6)]" />
                ) : null}
              </div>
            </motion.div>
          ))}
          <motion.div
            className="absolute bottom-[4%] left-1/2 h-[90%]"
            style={{ aspectRatio: "9 / 19.5" }}
            animate={isHovered ? { x: "-50%", y: "-2%", scale: 1.02 } : { x: "-50%", y: "0%", scale: 1 }}
            transition={springTransition}
          >
            {compact && project.video ? (
              <StagePhoneVideo
                video={project.video}
                title={project.title}
                poster={project.video.poster}
                isHovered={isHovered}
                className="h-full w-full"
              />
            ) : project.device ? (
              <div className="relative h-full w-full" style={{ aspectRatio: "1459 / 1755" }}>
                <Image src={project.device} alt="" fill preload={priority} quality={90} sizes="(max-width: 768px) 70vw, 640px" className="object-contain" />
              </div>
            ) : a ? (
              <Phone shot={a} priority={priority} className="h-full w-full" />
            ) : null}
          </motion.div>
        </>
      );
    }

    // Two phones overlapping with smooth 3D depth swap on hover
    case "duo": {
      const springTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
      return (
        <>
          {/* Phone B (Transactions) — supporting phone, stays behind/fans to right on hover */}
          {b ? (
            <motion.div
              className="absolute bottom-[5%] left-1/2 h-[84%]"
              style={{ aspectRatio: `${b.width} / ${b.height}` }}
              animate={
                isHovered
                  ? { x: "16%", y: "4%", rotate: 9, scale: 0.88, filter: "brightness(0.62) blur(0.04cqw)", zIndex: 10 }
                  : { x: "6%", y: "2%", rotate: 6, scale: 0.9, filter: "brightness(0.68) blur(0.06cqw)", zIndex: 10 }
              }
              transition={springTransition}
            >
              <Image src={b.src} alt="" fill sizes={PHONE_SIZES} quality={90} className="object-contain drop-shadow-[0_2.5cqw_3cqw_rgba(0,0,0,0.55)]" />
            </motion.div>
          ) : null}

          {/* Phone A (Budget / Live Video) — HERO PHONE in FRONT, in crisp focus playing video */}
          <motion.div
            className="absolute bottom-[6%] left-1/2 h-[88%]"
            style={{ aspectRatio: "9 / 19.5" }}
            animate={
              isHovered
                ? { x: "-46%", y: "-3%", rotate: 0, scale: 1.05, filter: "brightness(1) blur(0px)", zIndex: 25 }
                : { x: "-50%", y: "0%", rotate: -2, scale: 1, filter: "brightness(1) blur(0px)", zIndex: 20 }
            }
            transition={springTransition}
          >
            {compact && project.video ? (
              <StagePhoneVideo
                video={project.video}
                title={project.title}
                poster={project.video.poster}
                isHovered={isHovered}
                className="h-full w-full"
              />
            ) : a ? (
              <Phone shot={a} priority={priority} className="h-full w-full" />
            ) : null}
          </motion.div>

          {/* Floating balance cards with opposing parallax drift */}
          {cards[0] ? (
            <motion.div
              className="absolute left-[5%] top-[22%] w-[22%]"
              animate={isHovered ? { x: "-6%", y: "-4%", rotate: -4 } : { x: "0%", y: "0%", rotate: 0 }}
              transition={springTransition}
            >
              <Card card={cards[0]} className="w-full" />
            </motion.div>
          ) : null}

          {cards[2] ? (
            <motion.div
              className="absolute bottom-[10%] right-[5%] w-[29%]"
              animate={isHovered ? { x: "5%", y: "4%", rotate: 3 } : { x: "0%", y: "0%", rotate: 0 }}
              transition={springTransition}
            >
              <Card card={cards[2]} className="w-full" delay={1.2} />
            </motion.div>
          ) : null}
        </>
      );
    }

    // A single phone with sound rings spreading out behind it.
    case "waves": {
      const springTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="stage-ring absolute left-1/2 top-1/2 aspect-square w-[34%] rounded-full border-[0.25cqw] border-amber-200/50"
              style={{ animationDelay: `${i * 1.1}s` }}
              animate={isHovered ? { scale: 1.15, opacity: 0.9 } : { scale: 1, opacity: 0.65 }}
              transition={springTransition}
            />
          ))}
          <motion.div
            className="absolute bottom-[6%] left-1/2 h-[86%]"
            style={{ aspectRatio: "9 / 19.5", x: "-50%" }}
            animate={isHovered ? { scale: 1.025, y: -8 } : { scale: 1, y: 0 }}
            transition={springTransition}
          >
            {compact && project.video ? (
              <StagePhoneVideo
                video={project.video}
                title={project.title}
                poster={project.video.poster}
                isHovered={isHovered}
                className="h-full w-full"
              />
            ) : a ? (
              <Phone shot={a} priority={priority} className="h-full w-full" />
            ) : null}
          </motion.div>
          {cards[0] ? (
            <motion.div
              className="absolute bottom-[12%] left-1/2 w-[40%]"
              animate={isHovered ? { x: "-5%", y: -8, scale: 1.04 } : { x: "-10%", y: 0, scale: 1 }}
              transition={springTransition}
            >
              <Card card={cards[0]} className="w-full" delay={0.5} />
            </motion.div>
          ) : null}
        </>
      );
    }

    // The club logo's four coloured hands circling the phone (a photo-real pair when there's one), with real cards floating off it.
    case "circle":
      return (
        <>
          <span
            aria-hidden
            className="stage-spin absolute left-1/2 top-1/2 aspect-square w-[52%] rounded-full opacity-80 [mask:radial-gradient(closest-side,transparent_calc(100%-1cqw),#000_calc(100%-0.9cqw))]"
            style={{ background: "conic-gradient(#f6c700 0 21%, transparent 0 25%, #219fd9 0 46%, transparent 0 50%, #d9232d 0 71%, transparent 0 75%, #6d9a3a 0 96%, transparent 0)" }}
          />
          {compact && project.video ? (
            <StagePhoneVideo
              video={project.video}
              title={project.title}
              poster={project.video.poster}
              isHovered={isHovered}
              className="bottom-[6%] left-1/2 h-[86%] -translate-x-1/2"
            />
          ) : project.device ? (
            <div className="absolute bottom-[3%] left-1/2 h-[94%] -translate-x-1/2" style={{ aspectRatio: "1440 / 1960" }}>
              <Image src={project.device} alt="" fill preload={priority} quality={90} sizes="(max-width: 768px) 60vw, 560px" className="object-contain drop-shadow-[0_3cqw_4cqw_rgba(0,0,0,0.45)]" />
            </div>
          ) : a ? (
            <Phone shot={a} priority={priority} className="bottom-[6%] left-1/2 h-[86%] -translate-x-1/2" />
          ) : null}
          {cards[0] ? <Card card={cards[0]} className={`left-[4%] top-[24%] ${project.device ? "w-[25%]" : "w-[30%]"}`} style={{ rotate: "-5deg" }} /> : null}
          {cards[1] ? <Card card={cards[1]} className={`bottom-[14%] right-[4%] ${project.device ? "w-[26%]" : "w-[30%]"}`} style={{ rotate: "4deg" }} delay={1.2} /> : null}
        </>
      );

    // A website: the Bangla page behind, the English page in front.
    case "browser": {
      const [front, back] = project.screens ?? [];
      const url = project.web ? new URL(project.web).host : "";
      return (
        <>
          {back ? <Browser screen={back} url={url} className="right-[3%] top-[10%] w-[58%]" style={{ transform: "rotate(3deg)", filter: "brightness(.7)" }} /> : null}
          {front ? <Browser screen={front} url={url} priority={priority} className="bottom-[8%] left-[5%] w-[68%]" style={{ transform: "rotate(-2deg)" }} /> : null}
        </>
      );
    }

    default:
      return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div aria-hidden className="absolute -inset-[35%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.28),transparent)]" />
          <Image src={project.icon} alt="" width={512} height={512} preload={priority} className="relative h-[26cqw] w-[26cqw] drop-shadow-[0_3cqw_4cqw_rgba(0,0,0,0.55)]" />
        </div>
      );
  }
}

/** Tinted showcase of an app, staged in the style that fits it. */
export function ProjectStage({ project, interactive, compact, priority, className = "", isHovered }: Props) {
  const reduce = useReducedMotion();
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });
  const tint = project.tint;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || reduce) return;
    const box = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - box.left) / box.width - 0.5) * 8);
    tiltX.set(-((e.clientY - box.top) / box.height - 0.5) * 6);
  };
  const reset = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`@container relative isolate overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 95% at 50% 0%, color-mix(in oklab, ${tint}, white 22%) 0%, ${tint} 42%, color-mix(in oklab, ${tint}, black 62%) 100%)`,
      }}
    >
      {/* Fine grid fading out towards the edges */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:6cqw_6cqw] [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent)]"
      />
      {/* Oversized title watermark */}
      <p
        aria-hidden
        className="display absolute inset-x-0 top-[4%] select-none whitespace-nowrap text-center text-[19cqw] leading-none text-white/[0.07]"
      >
        {project.title}
      </p>
      {/* Light falling on the scene, and its shadow on the floor */}
      <div aria-hidden className="absolute left-1/2 top-[12%] h-[70%] w-[55%] -translate-x-1/2 rounded-full bg-white/15 blur-[8cqw]" />
      <div aria-hidden className="absolute bottom-[5%] left-1/2 h-[6%] w-[48%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-[2.5cqw]" />

      <motion.div className="absolute inset-0 [perspective:1400px]" style={{ rotateX: tiltX, rotateY: tiltY }}>
        <Scene project={project} priority={priority} compact={compact} isHovered={isHovered} />
      </motion.div>

      {/* Inner edge highlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />

      {compact ? null : (
        <div className="absolute bottom-[4%] left-[3%] z-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-black/25 py-2 pl-2 pr-4 text-white backdrop-blur-md sm:flex">
          <Image src={project.icon} alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{project.title}</span>
            <span className="block text-xs text-white/65">{project.tagline}</span>
          </span>
        </div>
      )}
    </div>
  );
}
