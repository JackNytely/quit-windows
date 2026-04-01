"use client";

import { SpacetimeDBProvider } from "spacetimedb/react";
import { useSpacetimeDbConnectionBuilder } from "@/hooks/use-spacetime-db-connection-builder";
import { StatsLiveMissingEnvCard } from "@/components/stats-live/stats-live-missing-env-card";
import { StatsLiveConnected } from "@/components/stats-live/stats-live-connected";

/**
 * Homepage widget: connects to SpacetimeDB (when env is present) and shows live community stats.
 */
export function StatsLive() {
  // Resolve builder from public env; `null` means we should show setup instructions instead.
  const connectionBuilder = useSpacetimeDbConnectionBuilder();
  // If either public env var is missing, do not mount the provider or WebSocket at all.
  if (!connectionBuilder) {
    // Developer-facing card explaining which variables belong in `.env.local`.
    return <StatsLiveMissingEnvCard />;
  }
  // Provider owns connection refcounting and websocket lifecycle for this URI/database pair.
  return (
    <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
      {/* Children run under the same managed connection context as other `useTable` hooks. */}
      <StatsLiveConnected />
    </SpacetimeDBProvider>
  );
}
