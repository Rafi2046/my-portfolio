"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
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

/** Each app gets the presentation that suits it, not one template for all. */
function Scene({ project, priority }: { project: Project; priority?: boolean }) {
  const shots = project.gallery ?? [];
  const [a, b, c] = shots;
  const cards = project.cards ?? [];
  const variant = project.stage ?? (shots.length ? "fan" : "icon");

  switch (variant) {
    // Phone in hand, flanked by two blurred screens.
    case "hand":
      return (
        <>
          {b ? <Phone shot={b} className="bottom-[10%] left-1/2 h-[70%]" style={{ transform: "translateX(-145%) rotate(-9deg)", transformOrigin: "50% 100%", filter: "brightness(.6) blur(.15cqw)" }} /> : null}
          {c ? <Phone shot={c} className="bottom-[10%] left-1/2 h-[70%]" style={{ transform: "translateX(45%) rotate(9deg)", transformOrigin: "50% 100%", filter: "brightness(.6) blur(.15cqw)" }} /> : null}
          {project.hand ? (
            // The phone sits at 41% of the photo's width, so shift it to the centre.
            <div className="absolute left-1/2 top-[7%] h-[134%] -translate-x-[41%]" style={{ aspectRatio: "1100 / 1476" }}>
              <Image src={project.hand} alt="" fill preload={priority} quality={90} sizes="(max-width: 768px) 80vw, 720px" className="object-contain drop-shadow-[0_3cqw_4cqw_rgba(0,0,0,0.45)]" />
            </div>
          ) : null}
        </>
      );

    // Phones lying on a tilted plane, with the live gauge standing up in front.
    case "isometric":
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

    // One phone with its reminder cards pulled out and floating.
    case "float":
      return (
        <>
          {a ? <Phone shot={a} priority={priority} className="bottom-[6%] left-1/2 h-[86%]" style={{ transform: "translateX(-50%) rotate(-4deg)" }} /> : null}
          {cards[0] ? <Card card={cards[0]} className="left-[8%] top-[20%] w-[34%]" style={{ rotate: "-5deg" }} /> : null}
          {cards[1] ? <Card card={cards[1]} className="bottom-[16%] right-[7%] w-[34%]" style={{ rotate: "4deg" }} delay={1.2} /> : null}
        </>
      );

    // Paper documents around the phone, with a scan line sweeping the front page.
    case "scan":
      return (
        <>
          {cards.slice(0, 3).map((d, i) => (
            <div key={d.src} className={`absolute ${SCAN_SPOTS[i]}`} style={{ aspectRatio: `${d.w} / ${d.h}` }}>
              <div className="stage-float relative h-full w-full overflow-hidden rounded-[0.6cqw] shadow-[0_2cqw_4cqw_rgba(0,0,0,0.45)]" style={{ animationDelay: `${i * 0.7}s` }}>
                <Image src={d.src} alt="" fill quality={85} sizes="(max-width: 768px) 30vw, 280px" className="object-cover" />
                {i === 0 ? (
                  <span aria-hidden className="stage-scan absolute inset-x-0 h-[3%] bg-gradient-to-b from-transparent via-sky-400/80 to-transparent shadow-[0_0_2cqw_0.6cqw_rgba(56,189,248,0.6)]" />
                ) : null}
              </div>
            </div>
          ))}
          {a ? <Phone shot={a} priority={priority} className="bottom-[6%] left-1/2 h-[86%] -translate-x-1/2" /> : null}
        </>
      );

    // Two phones overlapping, with balance tiles floating off the edges.
    case "duo":
      return (
        <>
          {b ? <Phone shot={b} className="bottom-[4%] left-1/2 h-[80%]" style={{ transform: "translateX(-4%) rotate(7deg)", filter: "brightness(.8)" }} /> : null}
          {a ? <Phone shot={a} priority={priority} className="bottom-[8%] left-1/2 h-[86%]" style={{ transform: "translateX(-84%) rotate(-3deg)" }} /> : null}
          {cards[0] ? <Card card={cards[0]} className="left-[6%] top-[22%] w-[21%]" /> : null}
          {cards[1] ? <Card card={cards[1]} className="left-[9%] top-[40%] w-[21%]" delay={0.8} /> : null}
          {cards[2] ? <Card card={cards[2]} className="bottom-[10%] right-[5%] w-[31%]" delay={1.6} /> : null}
        </>
      );

    // A single phone with sound rings spreading out behind it.
    case "waves":
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              aria-hidden
              className="stage-ring absolute left-1/2 top-1/2 aspect-square w-[34%] rounded-full border-[0.25cqw] border-amber-200/50"
              style={{ animationDelay: `${i * 1.1}s` }}
            />
          ))}
          {a ? <Phone shot={a} priority={priority} className="bottom-[6%] left-1/2 h-[86%] -translate-x-1/2" /> : null}
          {cards[0] ? <Card card={cards[0]} className="bottom-[12%] left-1/2 w-[40%] -translate-x-[10%]" delay={0.5} /> : null}
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

    case "fan":
      return (
        <>
          {[b, c].map((s, i) =>
            s ? (
              <Phone
                key={s.src}
                shot={s}
                className="bottom-[8%] left-1/2 h-[84%]"
                style={{ transform: `translateX(calc(-50% + ${i === 0 ? -62 : 62}%)) rotate(${i === 0 ? -8 : 8}deg) scale(.84)`, transformOrigin: "50% 100%", filter: "brightness(.72)" }}
              />
            ) : null,
          )}
          {a ? <Phone shot={a} priority={priority} className="bottom-[8%] left-1/2 h-[84%] -translate-x-1/2" /> : null}
        </>
      );

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
export function ProjectStage({ project, interactive, compact, priority, className = "" }: Props) {
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
        <Scene project={project} priority={priority} />
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
