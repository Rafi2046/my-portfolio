import { MotionSection } from "@/components/MotionSection";
import { liveApps } from "@/lib/content";

export function AlsoShipping() {
  return (
    <MotionSection
      id="shipping"
      ariaLabelledBy="shipping-heading"
      className="mx-auto max-w-6xl px-5 py-16 sm:px-8"
    >
      <div className="glass rounded-2xl px-6 py-8 sm:px-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Also shipping
        </p>
        <h2
          id="shipping-heading"
          className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Live apps in production
        </h2>
        <ul className="mt-8 divide-y divide-glass-border">
          {liveApps.map((app) => (
            <li
              key={app.name}
              className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{app.name}</p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {app.description} · {app.role}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {app.android ? (
                  <a
                    href={app.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm font-medium text-accent-soft underline-offset-4 hover:underline"
                  >
                    Android
                  </a>
                ) : null}
                {app.ios ? (
                  <a
                    href={app.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm font-medium text-accent-soft underline-offset-4 hover:underline"
                  >
                    iOS
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
