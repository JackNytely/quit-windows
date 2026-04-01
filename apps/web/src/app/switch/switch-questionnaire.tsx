"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SOFTWARE_CATALOG } from "@/lib/questionnaire/catalog";
import { recommend } from "@/lib/questionnaire/recommend";
import type {
  Experience,
  Priority,
  QuestionnaireAnswers,
} from "@/lib/questionnaire/types";
import { distroLabel } from "@/lib/distros";
import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const STEPS = 4;

export function SwitchQuestionnaire() {
  const [step, setStep] = useState(0);
  const [experience, setExperience] = useState<Experience>("beginner");
  const [priorities, setPriorities] = useState<Priority[]>(["easy", "stability"]);
  const [softwareIds, setSoftwareIds] = useState<string[]>([]);
  const [blockingIds, setBlockingIds] = useState<string[]>([]);

  const answers: QuestionnaireAnswers = useMemo(
    () => ({
      experience,
      priorities,
      softwareIds,
      blockingIds,
    }),
    [experience, priorities, softwareIds, blockingIds],
  );

  const result = useMemo(() => recommend(answers), [answers]);

  function toggleSoftware(id: string, on: boolean) {
    setSoftwareIds((prev) =>
      on ? [...new Set([...prev, id])] : prev.filter((x) => x !== id),
    );
    if (!on) {
      setBlockingIds((b) => b.filter((x) => x !== id));
    }
  }

  function toggleBlocker(id: string, on: boolean) {
    if (on) {
      setSoftwareIds((s) => [...new Set([...s, id])]);
      setBlockingIds((b) => [...new Set([...b, id])]);
    } else {
      setBlockingIds((b) => b.filter((x) => x !== id));
    }
  }

  function togglePriority(p: Priority) {
    setPriorities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  }

  const pct = Math.round(((step + 1) / STEPS) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <Progress value={pct} className="h-2" />
        <p className="text-muted-foreground text-sm">
          Step {step + 1} of {STEPS}
        </p>
      </div>

      {step === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Comfort level</CardTitle>
            <CardDescription>
              Linux is approachable, but the right distro matches how much you
              like to tinker versus ship work.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={experience}
              onValueChange={(v) => setExperience(v as Experience)}
              className="grid gap-3"
            >
              {(
                [
                  ["beginner", "Beginner", "Prefer GUIs and copy-paste fixes."],
                  [
                    "intermediate",
                    "Intermediate",
                    "Okay with occasional terminal steps.",
                  ],
                  [
                    "advanced",
                    "Advanced",
                    "Comfortable debugging drivers, kernels, and configs.",
                  ],
                ] as const
              ).map(([val, title, desc]) => (
                <label
                  key={val}
                  className="border-border hover:bg-muted/40 flex cursor-pointer items-start gap-3 rounded-xl border p-4"
                >
                  <RadioGroupItem value={val} id={val} />
                  <div>
                    <div className="font-medium">{title}</div>
                    <div className="text-muted-foreground text-sm">{desc}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ) : null}

      {step === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>What matters most?</CardTitle>
            <CardDescription>
              Pick all that apply—we weight your answers when matching a
              distro.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["gaming", "Gaming & Proton"],
                ["stability", "Stability"],
                ["latest", "Newest packages"],
                ["easy", "Minimal maintenance"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => togglePriority(key)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  priorities.includes(key)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-muted/40"
                }`}
              >
                {label}
              </button>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card>
          <CardHeader>
            <CardTitle>Software you rely on</CardTitle>
            <CardDescription>
              Select what you use regularly. Honest answers keep recommendations
              grounded.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[min(420px,55vh)] pr-4">
              <div className="space-y-8">
                {[
                  "Games",
                  "Creative",
                  "Productivity",
                  "CAD / 3D",
                  "Audio",
                  "Development",
                  "Streaming",
                  "Web",
                  "Cloud",
                ].map((cat) => {
                  const items = SOFTWARE_CATALOG.filter(
                    (s) => s.category === cat,
                  );
                  if (!items.length) return null;
                  return (
                    <section key={cat}>
                      <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase">
                        {cat}
                      </h3>
                      <div className="space-y-3">
                        {items.map((s) => (
                          <div
                            key={s.id}
                            className="flex flex-col gap-2 rounded-lg border border-border/80 p-3 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                id={s.id}
                                checked={softwareIds.includes(s.id)}
                                onCheckedChange={(c) =>
                                  toggleSoftware(s.id, c === true)
                                }
                              />
                              <div>
                                <Label htmlFor={s.id} className="font-medium">
                                  {s.label}
                                </Label>
                                {s.note ? (
                                  <p className="text-muted-foreground text-xs">
                                    {s.note}
                                  </p>
                                ) : null}
                                <p className="text-muted-foreground mt-1 text-xs capitalize">
                                  Linux outlook:{" "}
                                  <span className="text-foreground/90">
                                    {s.linuxStatus.replaceAll("_", " ")}
                                  </span>
                                </p>
                              </div>
                            </div>
                            {softwareIds.includes(s.id) ? (
                              <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                                <Checkbox
                                  id={`${s.id}-block`}
                                  checked={blockingIds.includes(s.id)}
                                  onCheckedChange={(c) =>
                                    toggleBlocker(s.id, c === true)
                                  }
                                />
                                <Label
                                  htmlFor={`${s.id}-block`}
                                  className="text-muted-foreground text-xs"
                                >
                                  Must-have / blocking
                                </Label>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : null}

      {step === 3 ? (
        <Card>
          <CardHeader>
            <CardTitle>Your result</CardTitle>
            <CardDescription>
              We bias toward honesty: if your must-haves are not realistically
              replaceable yet, we will say so.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.outcome === "block" ? (
              <div className="space-y-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                <p className="font-semibold text-amber-200">
                  We don’t recommend switching yet
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                  {result.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <div>
                  <p className="mb-2 text-sm font-medium">Blockers</p>
                  <ul className="space-y-2 text-sm">
                    {result.blockers.map((b) => (
                      <li key={b.label}>
                        <span className="font-medium">{b.label}</span>
                        {b.note ? (
                          <span className="text-muted-foreground">
                            {" "}
                            — {b.note}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4">
                <p className="text-sm font-medium text-emerald-200">
                  Suggested starting point
                </p>
                <p className="text-2xl font-semibold tracking-tight">
                  {distroLabel(result.distroId)}
                </p>
                <p className="text-muted-foreground text-sm">{result.summary}</p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                  {result.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-muted-foreground text-xs">
              This is guidance, not a guarantee. Always verify hardware support
              (Wi‑Fi, Bluetooth, hybrid graphics) on your exact laptop model
              before wiping drives.
            </p>
          </CardContent>
        </Card>
      ) : null}

      <div className="flex justify-between gap-3">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
        <div className="flex gap-2">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : null}
          {step < STEPS - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
