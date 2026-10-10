import { FooterName } from "@/components/FooterName";
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
          <FooterName text="Ishmak Rafi" className="display select-none text-center text-[19.5vw] leading-[0.82] text-ink 2xl:text-[18rem]" />
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-6 sm:justify-start">
            <p>© {year} {site.fullName}. All rights reserved.</p>
            <a href="#top" className="focus-ring group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-ink transition hover:opacity-70">
              Back to top
              <ArrowUpRight className="h-3.5 w-3.5 -rotate-45 transition group-hover:-translate-y-0.5" />
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
