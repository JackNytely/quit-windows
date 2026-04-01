/**
 * Maps SpacetimeDB connection + subscription flags into short labels for the badge.
 */

/** Inputs needed to derive the small status chip next to the card title. */
export type SpacetimeLiveUiInput = {
  /** True once the WebSocket session is considered active by the SDK. */
  readonly isActive: boolean;
  /** Populated when the managed connection hits an error. */
  readonly connectionError: Error | undefined;
  /** True after the table subscription has been applied at least once. */
  readonly subscribed: boolean;
};

/** Derived UI state for the “Live / Connecting…” badge. */
export type SpacetimeLiveUiState = {
  /** True when we show the pulsing dot and primary badge styling. */
  readonly live: boolean;
  /** Short human-readable status string for the badge body. */
  readonly statusLabel: string;
};

/**
 * Derives badge copy and “fully live” styling from connection + subscription readiness.
 *
 * @param input - Flags from {@link useSpacetimeDB} and `useTable`’s ready tuple.
 */
export function getSpacetimeLiveUiState(
  input: SpacetimeLiveUiInput,
): SpacetimeLiveUiState {
  // Destructure for straightforward branching below.
  const { isActive, connectionError, subscribed } = input;
  // Any explicit connection error wins and should surface to the user.
  if (connectionError) {
    // We are not “live” when errored.
    return { live: false, statusLabel: "Connection error" };
  }
  // Still handshaking or reconnecting: show a neutral pending state.
  if (!isActive) {
    // Not live until the socket is up.
    return { live: false, statusLabel: "Connecting…" };
  }
  // Connected but subscription query not applied yet (initial snapshot pending).
  if (!subscribed) {
    // Intermediate state between socket up and data subscription ready.
    return { live: false, statusLabel: "Subscribing…" };
  }
  // Socket up and subscription applied: show the success treatment.
  return { live: true, statusLabel: "Live" };
}
