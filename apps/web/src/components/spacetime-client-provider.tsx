"use client";

import { SpacetimeDBProvider } from "spacetimedb/react";
import { useSpacetimeDbConnectionBuilder } from "@/hooks/use-spacetime-db-connection-builder";

type SpacetimeClientProviderProps = {
  /** App subtree that may call Spacetime hooks when env is configured. */
  readonly children: React.ReactNode;
};

/**
 * Optional global provider: wraps children with a SpacetimeDB websocket when public env vars exist.
 *
 * If `NEXT_PUBLIC_SPACETIME_*` is missing, renders children without a provider (hooks under `SpacetimeDBProvider` must not run in that case).
 */
export function SpacetimeClientProvider({
  children,
}: SpacetimeClientProviderProps) {
  // Shared builder hook keeps URI/database wiring consistent with `StatsLive`.
  const connectionBuilder = useSpacetimeDbConnectionBuilder();
  // If env is incomplete, pass through without mounting a provider (no connection attempted).
  if (!connectionBuilder) {
    // Fragment avoids adding an extra DOM node around the app shell.
    return <>{children}</>;
  }
  // Provider manages the shared connection lifecycle for the subtree.
  return (
    <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
      {/* Children can use `useTable` / `useSpacetimeDB` as long as they are client components. */}
      {children}
    </SpacetimeDBProvider>
  );
}
