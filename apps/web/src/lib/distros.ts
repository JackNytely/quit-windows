export const DISTRO_OPTIONS = [
  { key: "ubuntu", label: "Ubuntu LTS" },
  { key: "linux_mint", label: "Linux Mint" },
  { key: "pop_os", label: "Pop!_OS" },
  { key: "fedora", label: "Fedora" },
  { key: "nobara", label: "Nobara Linux" },
  { key: "bazzite", label: "Bazzite (Steam-first)" },
  { key: "opensuse_tumbleweed", label: "openSUSE Tumbleweed" },
  { key: "debian", label: "Debian" },
  { key: "arch", label: "Arch Linux" },
  { key: "endeavour", label: "EndeavourOS" },
  { key: "kde_neon", label: "KDE neon" },
  { key: "nixos", label: "NixOS" },
  { key: "gentoo", label: "Gentoo" },
  { key: "other", label: "Other / not listed" },
] as const;

export type DistroKey = (typeof DISTRO_OPTIONS)[number]["key"];

export function distroLabel(key: string): string {
  const found = DISTRO_OPTIONS.find((d) => d.key === key);
  return found?.label ?? key;
}
