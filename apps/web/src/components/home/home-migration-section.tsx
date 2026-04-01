import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** One step in the high-level migration checklist shown on the homepage. */
type MigrationStep = {
  /** Display order label (string so we can keep leading zeros visually). */
  readonly step: string;
  /** Short title for the card header. */
  readonly title: string;
  /** Longer explanatory paragraph. */
  readonly body: string;
};

/** Static content: three-step migration path (kept in one array for clarity). */
const MIGRATION_STEPS: readonly MigrationStep[] = [
  {
    step: "01",
    title: "Inventory & backup",
    body: "Export browser profiles, save game sync, license keys, and verify you have recovery media. Assume you will need Windows once more for a single stubborn app.",
  },
  {
    step: "02",
    title: "Pick a distro",
    body: "Start conservative (Ubuntu LTS, Mint) unless you know you want a rolling release. Use our questionnaire for a structured suggestion.",
  },
  {
    step: "03",
    title: "Validate hardware",
    body: "Search your exact laptop model + Linux + Wi‑Fi chip. NVIDIA hybrid graphics and fingerprint readers still need extra research on some devices.",
  },
];

/**
 * Three-column step cards: inventory → distro choice → hardware validation.
 */
export function HomeMigrationSection() {
  return (
    // Standard section spacing consistent with other homepage bands.
    <section className="mx-auto max-w-5xl space-y-10 px-4 py-20 sm:px-6">
      {/* Section title only—body text lives inside each card. */}
      <h2 className="text-3xl font-semibold tracking-tight">
        {/* “High level” signals these are not exhaustive runbooks. */}
        Migration path (high level)
      </h2>
      {/* Three-up grid on large screens; stacks on small ones. */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Render each static step into a card with shared styling. */}
        {MIGRATION_STEPS.map((s) => (
          <Card
            // Key is stable because `step` codes are unique in the static array.
            key={s.step}
            className="border-border/60 bg-card/40"
          >
            <CardHeader>
              {/* Monospace step index for scanability. */}
              <p className="text-primary text-sm font-mono">{s.step}</p>
              {/* Step title in the standard card title style. */}
              <CardTitle className="text-lg">{s.title}</CardTitle>
              {/* Long-form guidance paragraph. */}
              <CardDescription className="text-base leading-relaxed">
                {/* Content comes from the constant above (not CMS). */}
                {s.body}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
