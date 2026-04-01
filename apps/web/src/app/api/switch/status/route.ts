import { deviceIsRegistered } from "@/lib/spacetime-server";

export const runtime = "nodejs";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get("deviceId")?.trim();
  if (!deviceId || !UUID_RE.test(deviceId)) {
    return Response.json({ error: "invalid_device" }, { status: 400 });
  }
  try {
    const registered = await deviceIsRegistered(deviceId);
    return Response.json({ registered });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "missing_spacetime_config") {
      return Response.json({ registered: false, offline: true });
    }
    console.error("switch status", e);
    return Response.json({ error: "status_failed" }, { status: 500 });
  }
}
