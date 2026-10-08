import { ArrowUpRight, Panel } from "@/components/Section";
import { site, socials } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-3">
      <Panel tone="gray" className="px-5 pb-6 pt-14 sm:px-10 sm:pt-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <ArrowUpRight className="h-14 w-14 shrink-0 text-muted sm:h-24 sm:w-24" />
            <p className="text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-ink/80 sm:text-5xl">
              Let&apos;s work
              <br />
              together
            </p>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="focus-ring inline-flex h-12 items-center justify-center self-start rounded-xl border border-line-strong px-6 text-sm font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-panel sm:self-auto"
          >
            Send me a message
          </a>
        </div>

        <div className="mt-12 border-t border-line-strong pt-6 sm:mt-16">
          <p aria-hidden className="display select-none text-center text-[19.5vw] leading-[0.82] text-ink/80 2xl:text-[18rem]">
            Ishmak Rafi
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.fullName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring transition hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </footer>
  );
}
