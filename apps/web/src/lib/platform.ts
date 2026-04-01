/** Desktop Linux user-agent detection (excludes Android / typical mobile Linux UAs). */
export function isDesktopLinuxUserAgent(ua: string): boolean {
  const u = ua.toLowerCase();
  if (!u.includes("linux")) return false;
  if (u.includes("android")) return false;
  return true;
}

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") {
    return "";
  }
  const key = "quitwindows_device_id";
  const existing = window.localStorage.getItem(key);
  if (existing && existing.length >= 8) {
    return existing;
  }
  const id = crypto.randomUUID();
  window.localStorage.setItem(key, id);
  return id;
}
