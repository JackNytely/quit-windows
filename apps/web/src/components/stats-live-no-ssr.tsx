"use client";

import dynamic from "next/dynamic";

/**
 * Client-only boundary for {@link StatsLive}: SpacetimeDB React hooks cannot run during SSR.
 *
 * The dynamic import with `ssr: false` must live in a Client Component (not in a Server Component file).
 */
export const StatsLiveNoSsr = dynamic(
  // Lazy-load the real implementation from the stats-live feature folder.
  () =>
    import("@/components/stats-live").then((mod) => mod.StatsLive),
  // Disable server rendering for this subtree to avoid hook/runtime mismatches.
  { ssr: false },
);
