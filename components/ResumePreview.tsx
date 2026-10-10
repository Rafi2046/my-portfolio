"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/content";

export const RESUME_FILENAME = "Ishmak-Rahat-Rafi-Flutter-Developer-Resume.pdf";

/**
 * Resume in a dialog: the page as a sharp, full-width image, with the PDF
 * to open or download in the footer. Rendered into <body> so a transformed
 * parent (like the navbar) can't trap the fixed overlay.
 */
export function ResumePreview({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  // Portals need the DOM, so wait for the first client render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-title"
            className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#141416] text-white shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2 id="cv-title" className="text-lg font-semibold tracking-tight">CV</h2>
                <p className="text-xs text-white/55">{site.fullName} · 1 page · PDF</p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                autoFocus
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </header>

            {/* A sharp image of the page fills the width; browsers' PDF viewers open zoomed out with a sidebar. */}
            <div className="min-h-0 flex-1 overflow-y-auto bg-[#2a2a2e] p-3 sm:p-6">
              <Image
                src={site.resumePreview}
                alt={`${site.fullName} — CV`}
                width={1588}
                height={2246}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 1000px"
                preload
                className="mx-auto h-auto w-full max-w-[1000px] rounded-md bg-white shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              />
            </div>

            <footer className="flex items-center justify-end gap-3 border-t border-white/10 px-5 py-4 sm:px-6">
              <a
                href={site.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mr-auto hidden text-sm text-white/60 underline-offset-4 transition hover:text-white hover:underline sm:inline"
              >
                Open PDF in a new tab
              </a>
              <button
                type="button"
                onClick={onClose}
                className="focus-ring inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold transition hover:bg-white/10"
              >
                Close
              </button>
              <a
                href={site.resumeHref}
                download={RESUME_FILENAME}
                className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:opacity-85"
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
                </svg>
                Download
              </a>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
