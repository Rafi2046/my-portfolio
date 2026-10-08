import { stackMarquee } from "@/lib/content";

export function StackMarquee() {
  // Rendered twice so the track can loop seamlessly at -50%.
  const items = [...stackMarquee, ...stackMarquee];

  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-5 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      aria-label="Tech stack"
    >
      <ul className="marquee-track flex w-max items-center gap-10">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= stackMarquee.length}
            className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-foreground-muted"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
