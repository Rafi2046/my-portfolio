"use client";

import { useRef, useState } from "react";
import { PhoneVideo, type AppVideo, type PhoneVideoHandle } from "@/components/PhoneVideo";

const fmt = (t: number) => `0:${String(Math.floor(t)).padStart(2, "0")}`;

/** Recorded tour of the app with chapters that follow along and jump on click. */
export function Walkthrough({ video, title, tint }: { video: AppVideo; title: string; tint: string }) {
  const player = useRef<PhoneVideoHandle>(null);
  const [time, setTime] = useState(0);
  const chapters = video.chapters;
  const active = chapters.reduce((acc, c, i) => (time >= c.t ? i : acc), 0);

  return (
    <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
      <div
        className="relative mx-auto flex w-full max-w-md justify-center rounded-[2rem] py-10"
        style={{ background: `radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, ${tint}, transparent 35%), transparent 75%)` }}
      >
        <PhoneVideo ref={player} video={video} title={title} onTime={setTime} className="w-[min(68vw,300px)]" />
      </div>

      <div>
        <p className="max-w-md text-lg leading-relaxed text-muted">
          The real app, recorded on a real phone — not a clickable prototype. Pick a chapter to jump straight to it.
        </p>
        <ol className="mt-8 border-t border-line-strong">
          {chapters.map((c, i) => {
            const isActive = i === active;
            const end = chapters[i + 1]?.t;
            const progress = isActive && end ? Math.min(1, (time - c.t) / (end - c.t)) : isActive ? 1 : 0;
            return (
              <li key={c.t} className="border-b border-line-strong">
                <button
                  type="button"
                  onClick={() => player.current?.seek(c.t + 0.05)}
                  aria-current={isActive ? "step" : undefined}
                  className={`focus-ring group relative flex w-full items-center gap-5 py-5 text-left transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  <span className="eyebrow w-10 tabular-nums">{fmt(c.t)}</span>
                  <span className="display flex-1 text-3xl sm:text-4xl">{c.label}</span>
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 rounded-full transition ${isActive ? "bg-live" : "bg-line-strong group-hover:bg-muted"}`}
                  />
                  {/* Progress through this chapter */}
                  <span aria-hidden className="absolute bottom-[-1px] left-0 h-[2px] bg-ink transition-[width] duration-300 ease-linear" style={{ width: `${progress * 100}%` }} />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
