"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Shot = { src: string; width: number; height: number; alt: string };

/**
 * Screens drift past like a news ticker. Hovering pauses the row,
 * and any screen opens full size in a lightbox.
 */
export function ScreensMarquee({ shots }: { shots: readonly Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);

  // Repeat short galleries so one pass is wider than the screen, then double it for a seamless loop.
  const base: { shot: Shot; index: number }[] = [];
  while (base.length < 8) shots.forEach((shot, index) => base.push({ shot, index }));
  const row = [...base, ...base];
  // Roughly constant speed regardless of how many screens there are.
  const duration = base.length * 6;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <>
      <div className="group relative overflow-hidden py-6 motion-reduce:overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul
          className="marquee-track flex w-max gap-8 group-hover:[animation-play-state:paused] sm:gap-12"
          style={{ animationDuration: `${duration}s` }}
        >
          {row.map(({ shot, index }, i) => (
            <li key={`${shot.src}-${i}`} className="w-44 shrink-0 sm:w-56" aria-hidden={i >= base.length || undefined}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                tabIndex={i >= base.length ? -1 : 0}
                className="focus-ring block w-full rounded-[2rem] transition duration-500 hover:-translate-y-2"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  quality={90}
                  sizes="(max-width: 640px) 176px, 224px"
                  className="h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)]"
                />
              </button>
              <p className="mt-4 line-clamp-2 text-center text-xs leading-snug text-muted">{shot.alt}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2 text-center text-xs text-muted">Hover to pause · tap a screen to open it</p>

      <AnimatePresence>
        {open !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={shots[open].alt}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.figure
              key={open}
              className="flex max-h-full flex-col items-center"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={shots[open].src}
                alt={shots[open].alt}
                width={shots[open].width}
                height={shots[open].height}
                quality={90}
                sizes="(max-width: 640px) 80vw, 420px"
                className="h-[78svh] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              />
              <figcaption className="mt-4 text-center text-sm text-white/80">
                <span className="eyebrow mr-2 text-white">
                  {String(open + 1).padStart(2, "0")}/{String(shots.length).padStart(2, "0")}
                </span>
                {shots[open].alt}
              </figcaption>
            </motion.figure>

            {[
              { label: "Previous screen", dir: -1, glyph: "←", side: "left-3 sm:left-8" },
              { label: "Next screen", dir: 1, glyph: "→", side: "right-3 sm:right-8" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={(e) => {
                  e.stopPropagation();
                  step(b.dir);
                }}
                className={`focus-ring absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black ${b.side}`}
              >
                <span aria-hidden>{b.glyph}</span>
              </button>
            ))}
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="focus-ring absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black"
            >
              <span aria-hidden>✕</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
