/**
 * Pure helpers for turning `switch_event` rows into aggregate numbers for the homepage card.
 */

/** Minimal row shape used by aggregation (matches generated `switch_event` row fields). */
export type SwitchEventRowForStats = {
  /** Normalized distro key from the module (camelCase in TS bindings). */
  readonly distroKey: string;
};

/** Result of aggregating switch events for display. */
export type SwitchEventStats = {
  /** Total number of recorded switch rows visible in this subscription snapshot. */
  readonly total: number;
  /** Up to three `(distroKey, count)` pairs, sorted descending by count. */
  readonly top: readonly (readonly [string, number])[];
};

/**
 * Computes total count and top-N distro breakdown from subscribed `switch_event` rows.
 *
 * @param rows - Live snapshot from `useTable(tables.switch_event)` (or equivalent).
 * @returns Totals and top-three distro keys by frequency.
 */
export function computeSwitchEventStats(
  rows: readonly SwitchEventRowForStats[],
): SwitchEventStats {
  // Start from the raw row count for the headline number.
  const total = rows.length;
  // Accumulate counts per distro key for the “top distros” list.
  const byDistro = new Map<string, number>();
  // Walk every row once; duplicates are already deduped server-side per device/IP rules.
  for (const r of rows) {
    // Read the current tally for this distro (default 0).
    const prev = byDistro.get(r.distroKey) ?? 0;
    // Increment the bucket for this distro key.
    byDistro.set(r.distroKey, prev + 1);
  }
  // Turn the map into a sortable array of `[key, count]` pairs.
  const pairs = [...byDistro.entries()];
  // Sort so the most common distros appear first.
  pairs.sort((a, b) => b[1] - a[1]);
  // Keep only the top three for the compact UI.
  const top = pairs.slice(0, 3);
  // Return both the headline total and the trimmed leaderboard.
  return { total, top };
}
