import { ArrowUpRight, Panel } from "@/components/Section";
import { site, socials } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-3">
      <Panel tone="gray" className="px-5 pb-6 pt-10 sm:px-10 sm:pt-12">
        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${site.email}`} className="focus-ring inline-flex items-center gap-1.5 font-medium transition hover:opacity-70">
            {site.email} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href={site.phoneHref} className="focus-ring font-mono text-muted transition hover:text-ink">
            {site.phone}
          </a>
        </div>

        <div className="mt-8 border-t border-line-strong pt-6">
          <p aria-hidden className="display select-none text-center text-[19.5vw] leading-[0.82] text-ink 2xl:text-[18rem]">
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
