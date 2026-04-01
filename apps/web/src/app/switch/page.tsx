import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { SwitchQuestionnaire } from "./switch-questionnaire";

export const metadata = {
  title: "Switch questionnaire | QuitWindows.org",
  description:
    "Honest compatibility check and Linux distro suggestions based on your software and priorities.",
};

export default function SwitchPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header className="mb-12 space-y-4">
        <p className="text-primary text-sm font-medium tracking-wide uppercase">
          Windows → Linux
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Switch when it makes sense
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          This questionnaire is intentionally conservative. If your must-have
          tools are not realistically replaceable on Linux today, we will tell
          you to wait, dual-boot, or keep a Windows partition—without shame.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to home
          </Link>
        </div>
      </header>
      <SwitchQuestionnaire />
    </div>
  );
}
