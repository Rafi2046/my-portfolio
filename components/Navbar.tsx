"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navLinks, projects, site } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-[88rem] rounded-2xl border border-line bg-panel/90 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <nav
          className="flex h-14 items-center justify-between gap-3 pl-2 pr-2 sm:pl-2.5"
          aria-label="Primary"
        >
          <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-xl">
            <span className="display flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-lg text-panel">
              IR
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide">
              {site.fullName.split(" ")[0]}{" "}
              <span className="font-bold">{site.navBrand}</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring text-sm font-medium uppercase tracking-wide text-ink/75 transition hover:text-ink"
                >
                  {link.label}
                  {link.label === "Work" ? (
                    <sup className="ml-0.5 font-mono text-[10px] text-muted">
                      ({projects.length})
                    </sup>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-medium xl:inline-flex">
              <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
              Available for new projects
            </span>
            <ThemeToggle />
            <Link
              href="/#contact"
              className="focus-ring hidden h-10 items-center rounded-full bg-ink px-5 text-xs font-semibold uppercase tracking-wider text-panel transition hover:opacity-85 sm:inline-flex"
            >
              Hire me
            </Link>
            <button
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="flex flex-col gap-1.5">
                <span className={`block h-0.5 w-4 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-4 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>

        {open ? (
          <ul id="mobile-nav" className="border-t border-line px-4 py-3 lg:hidden">
            {[...navLinks, { href: "/#contact", label: "Contact" }].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="display focus-ring block py-2 text-4xl"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
