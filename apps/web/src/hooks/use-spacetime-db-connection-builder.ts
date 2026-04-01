"use client";

import { useMemo } from "react";
import { DbConnection, type DbConnectionBuilder } from "@/lib/module_bindings";

/**
 * React hook that memoizes a {@link DbConnectionBuilder} from
 * `NEXT_PUBLIC_SPACETIME_URI` and `NEXT_PUBLIC_SPACETIME_DATABASE`.
 *
 * @returns A builder ready for {@link SpacetimeDBProvider}, or `null` when env is incomplete.
 */
export function useSpacetimeDbConnectionBuilder(): DbConnectionBuilder | null {
  // Memoize so the builder identity stays stable across renders unless env were to change (it does not at runtime).
  return useMemo(() => {
    // Read the public HTTP(S) base URL for SpacetimeDB (inlined at build time for the browser).
    const uri = process.env.NEXT_PUBLIC_SPACETIME_URI;
    // Read the published database name (must match `spacetime.json` / Maincloud).
    const database = process.env.NEXT_PUBLIC_SPACETIME_DATABASE;
    // Bail early when either value is missing so callers can render a setup hint instead of connecting.
    if (!uri || !database) {
      // Signal “not configured” to the UI layer.
      return null;
    }
    // Construct the typed client builder from generated module bindings.
    return DbConnection.builder().withUri(uri).withDatabaseName(database);
  }, []);
}
