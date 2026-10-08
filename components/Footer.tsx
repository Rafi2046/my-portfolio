import { site, socials } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-10 sm:px-8">
        <p className="eyebrow">Have an app in mind?</p>
        <a
          href={`mailto:${site.email}`}
          className="focus-ring mt-4 inline-block break-all text-3xl font-semibold tracking-[-0.03em] text-foreground transition-colors hover:text-accent sm:text-5xl"
        >
          {site.email}
        </a>
        <div className="mt-16 flex flex-col gap-6 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground-muted">
            © {year} {site.fullName}
          </p>
          <ul className="flex flex-wrap gap-5">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
