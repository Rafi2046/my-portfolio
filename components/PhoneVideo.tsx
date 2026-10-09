"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type AppVideo = {
  /** Path without extension; `.webm` and `.mp4` sit side by side. */
  src: string;
  poster: string;
  chapters: { t: number; label: string }[];
};

export type PhoneVideoHandle = { seek: (t: number) => void };

type Props = {
  video: AppVideo;
  title: string;
  className?: string;
  /** Called about four times a second with the current time. */
  onTime?: (t: number) => void;
  /** Hides the play/pause control (e.g. in hover previews). */
  bare?: boolean;
};

/**
 * A screen recording inside a CSS-drawn phone. It only downloads and plays
 * while on screen, pauses when it leaves, and never autoplays for people
 * who prefer reduced motion.
 */
export const PhoneVideo = forwardRef<PhoneVideoHandle, Props>(function PhoneVideo(
  { video, title, className = "", onTime, bare },
  ref,
) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const el = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    seek(t) {
      const v = el.current;
      if (!v) return;
      v.currentTime = t;
      setUserPaused(false);
      void v.play().catch(() => {});
    },
  }));

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const shouldPlay = visible && !userPaused && !reduce;

  useEffect(() => {
    const v = el.current;
    if (!v) return;
    if (shouldPlay) void v.play().catch(() => {});
    else v.pause();
  }, [shouldPlay]);

  return (
    <div ref={box} className={`relative ${className}`} style={{ aspectRatio: "9 / 19.5" }}>
      {/* Titanium band, black bezel, then the screen */}
      <div className="absolute inset-0 rounded-[15%/7%] bg-[linear-gradient(150deg,#55555c_0%,#1c1c1f_30%,#0d0d0f_70%,#46464c_100%)] p-[1.1%] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)]">
        <div className="h-full w-full rounded-[14%/6.5%] bg-black p-[2.6%]">
          <div className="relative h-full w-full overflow-hidden rounded-[12%/5.6%] bg-black">
            <video
              ref={el}
              muted
              loop
              playsInline
              preload={visible ? "auto" : "none"}
              poster={video.poster}
              aria-label={`${title} app walkthrough`}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => onTime?.(e.currentTarget.currentTime)}
              className="h-full w-full object-cover object-top"
            >
              {visible ? (
                <>
                  <source src={`${video.src}.webm`} type="video/webm" />
                  <source src={`${video.src}.mp4`} type="video/mp4" />
                </>
              ) : null}
            </video>
            {/* Dynamic island and a soft glass glare */}
            <span aria-hidden className="absolute left-1/2 top-[1.6%] h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_35%)]" />
          </div>
        </div>
      </div>

      {bare ? null : (
        <button
          type="button"
          onClick={() => {
            if (reduce) {
              const v = el.current;
              if (v?.paused) void v.play().catch(() => {});
              else v?.pause();
              return;
            }
            setUserPaused((p) => !p);
          }}
          aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
          className="focus-ring absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-panel text-ink shadow-lg transition hover:scale-105"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15L19.5 12z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});
