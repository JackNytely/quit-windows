import { NextResponse } from "next/server";

/** Lightweight probe for Railway / load balancers (no SpacetimeDB or DB calls). */
export function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
