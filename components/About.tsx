import { MotionSection } from "@/components/MotionSection";
import { site } from "@/lib/content";

export function About() {
  return (
    <MotionSection
      id="about"
      ariaLabelledBy="about-heading"
      className="mx-auto grid max-w-6xl gap-10 px-5 py-28 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
    >
      <div>
        <p className="eyebrow mb-4">About</p>
        <h2
          id="about-heading"
          className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl"
        >
          Shipping Flutter products,{" "}
          <span className="font-serif font-normal italic tracking-normal text-accent">
            end to end.
          </span>
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-foreground-muted">
          {site.journey}
        </p>
      </div>
      <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
        {site.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </MotionSection>
  );
}
