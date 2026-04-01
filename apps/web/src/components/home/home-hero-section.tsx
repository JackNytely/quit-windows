import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { LinuxSwitchCard } from "@/components/linux-switch-card";
import { StatsLiveNoSsr } from "@/components/stats-live-no-ssr";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

/**
 * Top-of-page hero: positioning statement, CTA, and sidebar cards (stats + switch).
 */
export function HomeHeroSection() {
  return (
    // Constrained width section with comfortable horizontal padding.
    <section className="mx-auto max-w-5xl px-4 pt-20 pb-16 sm:px-6">
      {/* Two-column layout on large screens: copy left, widgets right. */}
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        {/* Primary marketing copy stack. */}
        <div className="space-y-8">
          {/* Small trust / positioning badge above the headline. */}
          <Badge variant="secondary" className="font-normal">
            {/* One-line value prop for the project ethos. */}
            Independent, open source, and privacy-respecting by design
          </Badge>
          {/* Main H1 with emphasized clause in brand color. */}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {/* First clause sets up the promise. */}
            Leave Windows behind—
            {/* Accent span draws the eye to user agency. */}
            <span className="text-primary"> on your terms</span>.
          </h1>
          {/* Supporting paragraph: sets tone (honest, current-era Linux). */}
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            {/* Concrete reasons Linux is viable today (not abstract ideology). */}
            Desktop Linux is not a compromise product anymore: polished
            {/* Line break in source only—renders as a space in HTML. */}
            desktops, credible gaming via Proton, stronger hardware support,
            {/* Mission sentence for this site specifically. */}
            and a community that moves fast. QuitWindows.org exists to help
            {/* Contrasts with hype-driven migration content. */}
            you switch with eyes open—not hype, not shame, just reality-tested
            {/* What the reader should expect from articles + tooling. */}
            guidance.
          </p>
          {/* Primary CTA row stacks on small screens, aligns horizontally on `sm+`. */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Main funnel: questionnaire flow for distro guidance. */}
            <Link
              // Route to multi-step questionnaire.
              href="/switch"
              // Large filled button using shared variant tokens.
              className={cn(buttonVariants({ size: "lg" }), "text-base")}
            >
              {/* Button label is explicit about the destination. */}
              Switch now (questionnaire)
              {/* Icon reinforces forward motion / continuation. */}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* Secondary hint for people already on Linux (stats card). */}
            <p className="text-muted-foreground text-sm sm:max-w-xs">
              {/* Points users to the green “I switched” card in the column. */}
              On Linux? Look for the green card below—record your switch for
              {/* Clarifies anonymity posture. */}
              anonymous stats.
            </p>
          </div>
        </div>
        {/* Right column: live stats and optional switch recording. */}
        <div className="space-y-4">
          {/* Dynamic import boundary: Spacetime hooks run client-only (see `StatsLiveNoSsr`). */}
          <StatsLiveNoSsr />
          {/* Card that talks to `/api/switch` when user opts in. */}
          <LinuxSwitchCard />
        </div>
      </div>
    </section>
  );
}
