import { ViewTransition, type ReactNode } from "react";

const DIRECTION = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

/** Slides the page in the direction of travel; untyped navigations (browser back, refresh) don't animate. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DIRECTION} exit={DIRECTION} default="none">
      {children}
    </ViewTransition>
  );
}

/** Pairs a project's stage on the card with the hero stage on its case study, so one morphs into the other. */
export function StageMorph({ id, children }: { id: string; children: ReactNode }) {
  return (
    <ViewTransition name={`stage-${id}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
