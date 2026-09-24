import { MotionSection } from "@/components/MotionSection";
import { proofPoints } from "@/lib/content";

export function ProofStrip() {
  return (
    <MotionSection
      ariaLabelledBy="proof-heading"
      className="mx-auto max-w-6xl px-5 pb-8 sm:px-8"
    >
      <h2 id="proof-heading" className="sr-only">
        Highlights
      </h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {proofPoints.map((point) => (
          <li
            key={point.label}
            className="glass rounded-2xl px-5 py-5 text-center sm:text-left"
          >
            <p className="font-display text-2xl font-semibold text-accent-soft sm:text-3xl">
              {point.value}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {point.label}
            </p>
            <p className="mt-1 text-xs text-foreground-muted">{point.detail}</p>
          </li>
        ))}
      </ul>
    </MotionSection>
  );
}
