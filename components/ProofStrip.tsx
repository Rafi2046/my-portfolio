import { MotionSection } from "@/components/MotionSection";
import { proofPoints } from "@/lib/content";

export function ProofStrip() {
  return (
    <MotionSection
      ariaLabelledBy="proof-heading"
      className="mx-auto max-w-6xl px-5 pt-20 sm:px-8"
    >
      <h2 id="proof-heading" className="eyebrow mb-6">
        April – October 2026, by the numbers
      </h2>
      <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
        {proofPoints.map((point) => (
          <li key={point.label} className="bg-background-elevated p-6 sm:p-7">
            <p className="text-4xl font-semibold tracking-tight text-foreground">
              {point.value}
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">
              {point.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
              {point.detail}
            </p>
          </li>
        ))}
      </ul>
    </MotionSection>
  );
}
