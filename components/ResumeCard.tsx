"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { RESUME_FILENAME, ResumePreview } from "@/components/ResumePreview";
import { ArrowUpRight } from "@/components/Section";
import { site } from "@/lib/content";

/** Resume teaser with an in-page PDF preview and a download. */
export function ResumeCard() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="group mx-auto mt-12 grid max-w-3xl items-center gap-8 rounded-[1.75rem] border border-line-strong bg-panel-2 p-5 sm:grid-cols-[180px_1fr] sm:p-7">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Preview resume"
          className="focus-ring relative mx-auto block w-40 rotate-[-4deg] overflow-hidden rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition duration-500 group-hover:rotate-0 group-hover:scale-105 sm:w-full"
        >
          <Image src="/resume-preview.webp" alt="First page of the resume" width={1588} height={2246} sizes="180px" className="h-auto w-full" />
        </button>
        <div className="text-center sm:text-left">
          <p className="eyebrow text-muted">Resume · 1 page · PDF</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Prefer the short version?</h3>
          <p className="mt-2 leading-relaxed text-muted">
            Experience, the apps I&apos;ve shipped and my stack on one page — ready to forward to your team.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-panel transition hover:opacity-85"
            >
              Preview
            </button>
            <a
              href={site.resumeHref}
              download={RESUME_FILENAME}
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold transition hover:bg-ink hover:text-panel"
            >
              Download PDF <ArrowUpRight className="h-4 w-4 rotate-90" />
            </a>
          </div>
        </div>
      </div>

      <ResumePreview open={open} onClose={close} />
    </>
  );
}
