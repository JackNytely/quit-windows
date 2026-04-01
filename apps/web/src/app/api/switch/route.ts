import { registerSwitchOnServer } from "@/lib/spacetime-server";
import { getClientIp } from "@/lib/ip";

export const runtime = "nodejs";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      deviceId?: string;
      distroKey?: string;
    };
    const deviceId = body.deviceId?.trim();
    const distroKey = body.distroKey?.trim().toLowerCase();
    if (!deviceId || !UUID_RE.test(deviceId)) {
      return Response.json({ error: "invalid_device" }, { status: 400 });
    }
    if (!distroKey || distroKey.length < 2 || distroKey.length > 64) {
      return Response.json({ error: "invalid_distro" }, { status: 400 });
    }
    const clientIp = getClientIp(request);
    await registerSwitchOnServer({ deviceId, distroKey, clientIp });
    return Response.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "missing_spacetime_config") {
      return Response.json({ error: "server_misconfigured" }, { status: 503 });
    }
    if (
      msg.includes("UniqueAlreadyExists") ||
      msg.includes("unique") ||
      msg.includes("Unique")
    ) {
      return Response.json({ error: "duplicate" }, { status: 409 });
    }
    console.error("switch register", e);
    return Response.json({ error: "register_failed" }, { status: 500 });
  }
}
