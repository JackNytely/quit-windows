export function getServerSpacetimeUri(): string | undefined {
  return process.env.SPACETIME_URI ?? process.env.NEXT_PUBLIC_SPACETIME_URI;
}

export function getServerSpacetimeDatabase(): string | undefined {
  return (
    process.env.SPACETIME_DATABASE_NAME ??
    process.env.NEXT_PUBLIC_SPACETIME_DATABASE
  );
}

export function getIpHashSecret(): string | undefined {
  return process.env.IP_HASH_SECRET;
}
