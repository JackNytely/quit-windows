"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Shown when `NEXT_PUBLIC_SPACETIME_*` is not set; explains which vars to configure.
 */
export function StatsLiveMissingEnvCard() {
  return (
    // Outer card matches the glassy style used elsewhere on the marketing page.
    <Card className="border-border/60 bg-card/40 backdrop-blur">
      {/* Title row only—no badge because we are not connected at all. */}
      <CardHeader>
        {/* Short heading that matches the feature name in copy. */}
        <CardTitle className="text-lg">Live switch counter</CardTitle>
      </CardHeader>
      {/* Instructional body: tells developers exactly which env keys to add. */}
      <CardContent className="text-muted-foreground text-sm">
        {/* Lead-in sentence fragment. */}
        Set {/* Inline code for the URI variable name. */}
        <code className="text-foreground/90">NEXT_PUBLIC_SPACETIME_URI</code>{" "}
        {/* Conjunction between the two required keys. */}
        and {/* Second env key for database name. */}
        <code className="text-foreground/90">
          NEXT_PUBLIC_SPACETIME_DATABASE
        </code>{" "}
        {/* Explains the outcome once configured. */}
        to show aggregate stats from SpacetimeDB.
      </CardContent>
    </Card>
  );
}
