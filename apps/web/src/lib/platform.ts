/** Desktop Linux user-agent detection (excludes Android / typical mobile Linux UAs). */
export function isDesktopLinuxUserAgent(ua: string): boolean {
  const u = ua.toLowerCase();
  if (!u.includes("linux")) return false;
  if (u.includes("android")) return false;
  return true;
}

export type DetectableDistroKey =
  | "ubuntu"
  | "linux_mint"
  | "pop_os"
  | "fedora"
  | "nobara"
  | "bazzite"
  | "opensuse_tumbleweed"
  | "debian"
  | "arch"
  | "endeavour"
  | "kde_neon"
  | "nixos"
  | "gentoo"
  | "cachyos";

/**
 * Best-effort distro detection from browser-exposed strings.
 *
 * Important: web pages cannot directly read `/etc/os-release`, so this only works
 * when the browser/UA includes distro-specific tokens (not guaranteed).
 */
export function detectLinuxDistroFromNavigator(
  nav: Pick<Navigator, "userAgent" | "platform"> & { oscpu?: string },
): DetectableDistroKey | null {
  const haystack = `${nav.userAgent} ${nav.platform} ${nav.oscpu ?? ""}`.toLowerCase();

  if (
    haystack.includes("cachyos") ||
    haystack.includes("cachy os") ||
    haystack.includes("cachy-linux") ||
    haystack.includes("cachy")
  ) {
    return "cachyos";
  }
  if (haystack.includes("nobara")) return "nobara";
  if (haystack.includes("bazzite")) return "bazzite";
  if (haystack.includes("endeavouros") || haystack.includes("endeavour")) return "endeavour";
  if (haystack.includes("pop!_os") || haystack.includes("pop os") || haystack.includes("pop-os")) return "pop_os";
  if (haystack.includes("linux mint") || haystack.includes("linuxmint")) return "linux_mint";
  if (haystack.includes("ubuntu")) return "ubuntu";
  if (haystack.includes("fedora")) return "fedora";
  if (haystack.includes("opensuse") || haystack.includes("tumbleweed")) return "opensuse_tumbleweed";
  if (haystack.includes("kde neon") || haystack.includes("kdeneon")) return "kde_neon";
  if (haystack.includes("nixos")) return "nixos";
  if (haystack.includes("gentoo")) return "gentoo";
  if (haystack.includes("debian")) return "debian";
  if (haystack.includes("arch")) return "arch";

  return null;
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
