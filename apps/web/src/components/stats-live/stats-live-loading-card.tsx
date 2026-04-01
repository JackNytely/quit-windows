"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton state while the SpacetimeDB socket connects and the initial subscription applies.
 */
export function StatsLiveLoadingCard() {
  return (
    // Same shell as the final card so layout does not jump when data arrives.
    <Card className="border-border/60 bg-card/40 backdrop-blur">
      {/* Title matches the pre-data label so the header does not flicker wording. */}
      <CardHeader>
        {/* Mirrors the missing-env card title for consistency. */}
        <CardTitle className="text-lg">Live switch counter</CardTitle>
      </CardHeader>
      {/* Placeholder bars approximate the final total + list height. */}
      <CardContent className="space-y-3">
        {/* Wide skeleton for the big total line. */}
        <Skeleton className="h-10 w-full" />
        {/* Second skeleton for the “top distros” block. */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
