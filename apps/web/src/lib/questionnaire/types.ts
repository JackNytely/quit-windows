export type LinuxStatus =
  | "native"
  | "good_proton"
  | "workable"
  | "no_practical_alternative"
  | "cloud_only";

export type SoftwareItem = {
  id: string;
  label: string;
  category: string;
  linuxStatus: LinuxStatus;
  note?: string;
};

export type Priority = "gaming" | "stability" | "latest" | "easy";

export type Experience = "beginner" | "intermediate" | "advanced";

export type QuestionnaireAnswers = {
  experience: Experience;
  priorities: Priority[];
  /** Software ids the user depends on */
  softwareIds: string[];
  /** Ids marked as must-have blockers */
  blockingIds: string[];
};

export type DistroId =
  | "ubuntu"
  | "linux_mint"
  | "fedora"
  | "nobara"
  | "pop_os"
  | "bazzite"
  | "arch"
  | "opensuse_tumbleweed"
  | "debian";

export type RecommendationResult =
  | {
      outcome: "block";
      reasons: string[];
      blockers: { label: string; note?: string }[];
    }
  | {
      outcome: "recommend";
      distroId: DistroId;
      summary: string;
      bullets: string[];
    };
