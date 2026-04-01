"use client";

import { distroLabel } from "@/lib/distros";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatsLiveConnectionBadge } from "@/components/stats-live/stats-live-connection-badge";
import type { SpacetimeLiveUiState } from "@/components/stats-live/spacetime-live-ui-state";

type StatsLiveCommunityCardProps = {
  /** Formatted total for the headline metric. */
  readonly total: number;
  /** Top distro keys with counts (already capped upstream). */
  readonly top: readonly (readonly [string, number])[];
  /** Connection + subscription summary for the badge. */
  readonly liveUi: SpacetimeLiveUiState;
};

/**
 * Filled-in “Community signal” card: total, top distros, and live status badge.
 */
export function StatsLiveCommunityCard({
  total,
  top,
  liveUi,
}: StatsLiveCommunityCardProps) {
  return (
    // Main glass card once data subscription is ready.
    <Card className="border-border/60 bg-card/40 backdrop-blur">
      {/* Header stacks title, badge, and explanatory paragraph. */}
      <CardHeader className="space-y-2">
        {/* Row aligns title left and status chip right on wide screens. */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Section title shown after we know Spacetime is configured. */}
          <CardTitle className="text-lg">Community signal</CardTitle>
          {/* Live / connecting indicator driven by Spacetime hook state. */}
          <StatsLiveConnectionBadge ui={liveUi} />
        </div>
        {/* Privacy + mechanics blurb; mentions real-time subscription behavior. */}
        <p className="text-muted-foreground text-sm font-normal">
          {/* Explains what a “switch” row represents. */}
          Anonymous, self-reported switches (device ID + hashed IP to limit
          {/* Sentence continues on the next line in source for readability. */}
          duplicates). Totals update in real time via a SpacetimeDB subscription.
        </p>
      </CardHeader>
      {/* Body stacks the headline number and the distro list. */}
      <CardContent className="space-y-6">
        {/* Block for the big aggregate count. */}
        <div>
          {/* Label above the number for screen-reader + visual hierarchy. */}
          <p className="text-muted-foreground text-sm">Total recorded</p>
          {/* Keyed by total so a brief enter animation can run on each change. */}
          <p
            // Changing `key` remounts the node when the number changes (subtle motion).
            key={total}
            // Large monospace number with motion-safe entrance classes from Tailwind config.
            className="font-mono text-4xl font-semibold tracking-tight tabular-nums motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300"
          >
            {/* Locale-aware thousands separators for readability at scale. */}
            {total.toLocaleString()}
          </p>
        </div>
        {/* Leaderboard section for distro popularity. */}
        <div>
          {/* Section label for the ordered list below. */}
          <p className="text-muted-foreground mb-2 text-sm">Top distros</p>
          {/* Ordered list keeps rank semantics for assistive tech. */}
          <ol className="flex flex-col gap-2">
            {/* Empty state when no rows exist yet in the subscribed snapshot. */}
            {top.length === 0 ? (
              <li className="text-muted-foreground text-sm">
                {/* Friendly nudge when the table is empty. */}
                No entries yet—be the first on Linux.
              </li>
            ) : (
              // Map each `(distroKey, count)` pair into a row.
              top.map(([key, n], i) => (
                <li
                  // Stable key: distro key is unique in the top list.
                  key={key}
                  // Flex row: label left, numeric badge right.
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  {/* Left side: rank number + human distro name. */}
                  <span className="flex items-center gap-2">
                    {/* Rank index (1-based) for quick scanning. */}
                    <span className="text-muted-foreground w-5">{i + 1}.</span>
                    {/* Pretty label resolved from internal distro key constants. */}
                    <span>{distroLabel(key)}</span>
                  </span>
                  {/* Right side: numeric count with tabular figures. */}
                  <Badge variant="secondary" className="tabular-nums">
                    {/* Same locale formatting as the headline metric. */}
                    {n.toLocaleString()}
                  </Badge>
                </li>
              ))
            )}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
