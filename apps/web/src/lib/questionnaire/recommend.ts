import { getSoftwareById } from "./catalog";
import type {
  DistroId,
  QuestionnaireAnswers,
  RecommendationResult,
} from "./types";

const DISTROS: Record<
  DistroId,
  { title: string; blurb: string; gaming: number; easy: number; stability: number; latest: number }
> = {
  ubuntu: {
    title: "Ubuntu LTS",
    blurb:
      "Huge community, long support windows, and broad third-party documentation. A strong default when you want fewer surprises.",
    gaming: 7,
    easy: 10,
    stability: 9,
    latest: 5,
  },
  linux_mint: {
    title: "Linux Mint",
    blurb:
      "Very Windows-familiar desktop defaults (Cinnamon), conservative updates, and excellent for daily desktop use.",
    gaming: 7,
    easy: 10,
    stability: 9,
    latest: 4,
  },
  fedora: {
    title: "Fedora Workstation",
    blurb:
      "Up-to-date stack, strong defaults for developers, and solid Wayland session polish on modern hardware.",
    gaming: 8,
    easy: 7,
    stability: 7,
    latest: 9,
  },
  nobara: {
    title: "Nobara Linux",
    blurb:
      "Fedora-based with gaming-focused patches and helpers—aimed at people who want Steam/Proton to “just work” sooner.",
    gaming: 10,
    easy: 7,
    stability: 6,
    latest: 8,
  },
  pop_os: {
    title: "Pop!_OS",
    blurb:
      "Polished desktop, strong developer ergonomics, and historically thoughtful NVIDIA-focused workflows (verify your GPU generation).",
    gaming: 8,
    easy: 8,
    stability: 8,
    latest: 7,
  },
  bazzite: {
    title: "Bazzite",
    blurb:
      "Immutable, game-console-like experience built for Steam-first workflows and frequent hardware—great when gaming is the top priority.",
    gaming: 10,
    easy: 7,
    stability: 7,
    latest: 8,
  },
  arch: {
    title: "Arch Linux",
    blurb:
      "Rolling release with the newest packages and the Arch User Repository—best when you enjoy troubleshooting and control.",
    gaming: 8,
    easy: 3,
    stability: 4,
    latest: 10,
  },
  cachyos: {
    title: "CachyOS",
    blurb:
      "Arch-based and performance-focused, with tuned kernels and gaming-friendly defaults. Great when you want very fresh packages and strong performance without as much manual setup as vanilla Arch.",
    gaming: 10,
    easy: 6,
    stability: 5,
    latest: 10,
  },
  opensuse_tumbleweed: {
    title: "openSUSE Tumbleweed",
    blurb:
      "Rolling but tested snapshots—often a sweet spot between freshness and QA discipline.",
    gaming: 7,
    easy: 6,
    stability: 7,
    latest: 9,
  },
  debian: {
    title: "Debian stable",
    blurb:
      "Rock-solid and conservative—great when you value stability over the newest drivers and desktop features.",
    gaming: 6,
    easy: 7,
    stability: 10,
    latest: 3,
  },
};

const PRIORITY_WEIGHT: Record<string, number> = {
  gaming: 3,
  easy: 2,
  stability: 2,
  latest: 2,
};

export function recommend(
  answers: QuestionnaireAnswers,
): RecommendationResult {
  const blockers: { label: string; note?: string }[] = [];
  for (const id of answers.blockingIds) {
    const item = getSoftwareById(id);
    if (!item) continue;
    if (item.linuxStatus === "no_practical_alternative") {
      blockers.push({ label: item.label, note: item.note });
    }
  }
  if (blockers.length > 0) {
    return {
      outcome: "block",
      reasons: [
        "You marked at least one must-have tool that still has no practical native Linux replacement for most people. Switching can still be right later—but today it may cost more time than it saves.",
        "Common paths: keep Windows for that workload, dual-boot, GPU passthrough VM, or use a different machine for the blocker.",
      ],
      blockers,
    };
  }

  const scores: Record<DistroId, number> = {
    ubuntu: 0,
    linux_mint: 0,
    fedora: 0,
    nobara: 0,
    pop_os: 0,
    bazzite: 0,
    arch: 0,
    cachyos: 0,
    opensuse_tumbleweed: 0,
    debian: 0,
  };

  (Object.keys(DISTROS) as DistroId[]).forEach((id) => {
    let s = 0;
    for (const p of answers.priorities) {
      const w = PRIORITY_WEIGHT[p] ?? 1;
      s += DISTROS[id][p] * w;
    }
    if (answers.experience === "beginner") {
      s += DISTROS[id].easy * 2;
    } else if (answers.experience === "advanced") {
      s += DISTROS[id].latest;
    } else {
      s += (DISTROS[id].easy + DISTROS[id].stability) * 0.75;
    }

    const gamingHeavy = answers.softwareIds.some((sid) => {
      const it = getSoftwareById(sid);
      return (
        it?.category === "Games" &&
        (it.linuxStatus === "good_proton" || it.linuxStatus === "native")
      );
    });
    if (gamingHeavy || answers.priorities.includes("gaming")) {
      s += DISTROS[id].gaming * 1.5;
    }

    scores[id] = s;
  });

  let best: DistroId = "ubuntu";
  let bestScore = -Infinity;
  (Object.keys(scores) as DistroId[]).forEach((id) => {
    if (scores[id] > bestScore) {
      bestScore = scores[id];
      best = id;
    }
  });

  const d = DISTROS[best];
  const bullets: string[] = [
    `Experience level: ${answers.experience} — this pick biases toward ${
      answers.experience === "beginner"
        ? "clear defaults and lots of community answers online"
        : answers.experience === "advanced"
          ? "fresh packages and tunability"
          : "balance"
    }.`,
  ];
  if (answers.priorities.length) {
    bullets.push(
      `You prioritized: ${answers.priorities.join(", ")} — scoring weighted those goals.`,
    );
  }

  return {
    outcome: "recommend",
    distroId: best,
    summary: d.blurb,
    bullets,
  };
}
