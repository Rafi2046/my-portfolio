import { MotionSection } from "@/components/MotionSection";
import { site } from "@/lib/content";

export function About() {
  return (
    <MotionSection
      id="about"
      ariaLabelledBy="about-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
        About
      </p>
      <h2
        id="about-heading"
        className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Shipping Flutter products with CS depth
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
        {site.journey}
      </p>
      <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
        {site.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </MotionSection>
  );
}
