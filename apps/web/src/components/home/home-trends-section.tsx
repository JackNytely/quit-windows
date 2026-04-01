import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Cpu, Gamepad2, Shield } from "lucide-react";

/**
 * Four-card grid explaining why desktop Linux is different in the 2020s.
 */
export function HomeTrendsSection() {
  return (
    // Section uses a subtle band separation via border + tinted background.
    <section className="border-border/60 border-y bg-black/20 py-20">
      {/* Inner container matches hero width for visual rhythm. */}
      <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6">
        {/* Intro block: section title + thesis sentence. */}
        <div className="max-w-2xl space-y-3">
          {/* H2 names the narrative frame (“now vs then”). */}
          <h2 className="text-3xl font-semibold tracking-tight">
            {/* Curly quotes in copy—fine for English typography. */}
            Why “now” is different
          </h2>
          {/* Sets expectation: evidence-led bullets follow. */}
          <p className="text-muted-foreground text-lg">
            {/* Contrasts historical reputation with current reality. */}
            The desktop Linux story in the 2020s is not the same as a decade
            {/* Explicitly rejects empty marketing claims. */}
            ago. These are concrete trends—not marketing slogans.
          </p>
        </div>
        {/* Responsive grid: two columns on medium+, one on narrow viewports. */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: gaming / Proton story. */}
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              {/* Icon cues the topic without extra headings. */}
              <Gamepad2 className="text-primary mb-2 h-8 w-8" />
              <CardTitle className="text-lg">Credible PC gaming</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {/* Proton is the concrete mechanism readers may have heard of. */}
                Steam&apos;s Proton compatibility layer means thousands of
                {/* Contrasts with old Wine-heavy workflows. */}
                Windows titles run on Linux without manual Wine tuning. Native
                {/* Notes market reality for smaller studios too. */}
                Linux releases are also far more common for indie and AA
                {/* Completes the sentence from previous line. */}
                games.
              </CardDescription>
            </CardHeader>
          </Card>
          {/* Card 2: desktop environment quality. */}
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <Cpu className="text-primary mb-2 h-8 w-8" />
              <CardTitle className="text-lg">Modern desktops</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {/* Names major DEs readers can research quickly. */}
                GNOME and KDE ship polished, accessible experiences with
                {/* Predictability is a recurring user complaint on other OSes. */}
                predictable updates. Wayland adoption continues to improve
                {/* Concrete quality-of-life areas. */}
                scaling, security, and multi-monitor workflows.
              </CardDescription>
            </CardHeader>
          </Card>
          {/* Card 3: control / governance of the system. */}
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <Shield className="text-primary mb-2 h-8 w-8" />
              <CardTitle className="text-lg">Agency over your OS</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {/* “Inspectable” signals open-source advantage without jargon. */}
                Linux distributions are built from inspectable components. You
                {/* Lists knobs people care about in practice. */}
                choose update cadence, telemetry policy, and which vendors you
                {/* Broadens appeal beyond privacy-focused readers. */}
                trust—useful whether you care about privacy or simply dislike
                {/* Relatable pain point. */}
                surprise UI changes.
              </CardDescription>
            </CardHeader>
          </Card>
          {/* Card 4: support surface / learning resources. */}
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <BookOpen className="text-primary mb-2 h-8 w-8" />
              <CardTitle className="text-lg">Documentation & community</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {/* Named resources reduce “where do I even look?” anxiety. */}
                Arch Wiki, distro forums, and StackOverflow answers for Linux
                {/* Honest about friction while rejecting fatalism. */}
                are deep. The learning curve is real—but it is no longer “you
                {/* Closing emphasis: community exists now. */}
                are on your own.”
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
