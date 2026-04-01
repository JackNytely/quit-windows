"use client";

import { useMemo } from "react";
import { useSpacetimeDB, useTable } from "spacetimedb/react";
import { tables } from "@/lib/module_bindings";
import { computeSwitchEventStats } from "@/components/stats-live/compute-switch-event-stats";
import { getSpacetimeLiveUiState } from "@/components/stats-live/spacetime-live-ui-state";
import { StatsLiveCommunityCard } from "@/components/stats-live/stats-live-community-card";
import { StatsLiveLoadingCard } from "@/components/stats-live/stats-live-loading-card";

/**
 * Inner tree that must render under SpacetimeDB `SpacetimeDBProvider`.
 * Subscribes to `switch_event` and renders aggregate UI.
 */
export function StatsLiveConnected() {
  // Connection manager snapshot: identity, errors, active flag, and accessor to `DbConnection`.
  const db = useSpacetimeDB();
  // Subscribe to the full `switch_event` table; SDK issues the SQL subscription under the hood.
  const [rows, subscribed] = useTable(tables.switch_event);
  // Derive `{ total, top }` from the current row snapshot whenever `rows` changes.
  const { total, top } = useMemo(
    // Pure aggregation keeps rendering cheap and testable.
    () => computeSwitchEventStats(rows),
    // Recompute only when the subscribed row set changes.
    [rows],
  );
  // Map raw flags into `{ live, statusLabel }` for the badge component.
  const liveUi = useMemo(
    // Combine websocket readiness + subscription readiness for a single UI model.
    () =>
      getSpacetimeLiveUiState({
        // From managed connection: socket established.
        isActive: db.isActive,
        // Surface hard failures distinctly from “still loading”.
        connectionError: db.connectionError,
        // From `useTable`: initial subscribe handshake completed at least once.
        subscribed,
      }),
    // Re-derive labels when any of the upstream flags change.
    [db.isActive, db.connectionError, subscribed],
  );
  // Until the subscription is applied, show skeleton instead of zeros vs loading ambiguity.
  if (!subscribed) {
    // Loading card keeps layout stable while the initial snapshot streams in.
    return <StatsLiveLoadingCard />;
  }
  // Happy path: show totals and top distros with live badge semantics.
  return (
    // Presentational card receives only primitives + derived UI state (easy to test).
    <StatsLiveCommunityCard total={total} top={top} liveUi={liveUi} />
  );
}
