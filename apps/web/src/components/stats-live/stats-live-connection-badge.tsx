"use client";

import { Badge } from "@/components/ui/badge";
import type { SpacetimeLiveUiState } from "@/components/stats-live/spacetime-live-ui-state";

type StatsLiveConnectionBadgeProps = {
  /** Derived badge state (label + whether to use “live” styling). */
  readonly ui: SpacetimeLiveUiState;
};

/**
 * Small status chip: shows Connecting / Subscribing / Live / Error next to the card title.
 */
export function StatsLiveConnectionBadge({ ui }: StatsLiveConnectionBadgeProps) {
  // Destructure so JSX stays readable.
  const { live, statusLabel } = ui;
  return (
    // Primary styling only when both socket and subscription are healthy.
    <Badge
      // “default” is the filled primary look; “secondary” is muted for interim states.
      variant={live ? "default" : "secondary"}
      // Extra ring polish when fully live; otherwise keep spacing consistent.
      className={
        live
          ? "gap-1.5 pr-2 shadow-[0_0_0_1px_oklch(0.79_0.12_178/35%)]"
          : "gap-1.5"
      }
    >
      {/* Pulsing dot only in the fully live state (purely decorative). */}
      {live ? (
        <span
          // Tiny disc that reads as an activity indicator on dark backgrounds.
          className="bg-primary-foreground/90 size-2 animate-pulse rounded-full"
          // Hide the decorative dot from assistive tech; label text carries meaning.
          aria-hidden
        />
      ) : null}
      {/* Human-readable status string from `getSpacetimeLiveUiState`. */}
      {statusLabel}
    </Badge>
  );
}
