"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "@/components/Section";
import { site } from "@/lib/content";

/** Resume teaser with an in-page PDF preview and a download. */
export function ResumeCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
              download="Ishmak-Rahat-Rafi-Flutter-Developer-Resume.pdf"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold transition hover:bg-ink hover:text-panel"
            >
              Download PDF <ArrowUpRight className="h-4 w-4 rotate-90" />
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="fixed inset-0 z-[60] flex flex-col bg-black/80 p-3 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="mx-auto mb-3 flex w-full max-w-4xl items-center justify-between gap-3 text-white" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm font-medium">{site.fullName} — Resume</p>
              <div className="flex gap-2">
                <a
                  href={site.resumeHref}
                  download="Ishmak-Rahat-Rafi-Flutter-Developer-Resume.pdf"
                  className="focus-ring inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-black"
                >
                  Download
                </a>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setOpen(false)}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/30"
                >
                  <span aria-hidden>✕</span>
                </button>
              </div>
            </div>
            <motion.div
              className="mx-auto min-h-0 w-full max-w-4xl flex-1 overflow-auto rounded-xl bg-white"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Desktop browsers render the PDF itself; phones get the page image, since most can't embed PDFs. */}
              <iframe src={`${site.resumeHref}#view=FitH`} title="Resume PDF" className="hidden h-full w-full md:block" />
              <Image src="/resume-preview.webp" alt="Resume" width={1588} height={2246} sizes="100vw" className="h-auto w-full md:hidden" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
