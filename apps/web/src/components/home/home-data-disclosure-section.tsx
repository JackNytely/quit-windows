import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Explains what the optional “I switched” flow stores; links back to questionnaire.
 */
export function HomeDataDisclosureSection() {
  return (
    // Separated visually from migration content with a top border.
    <section className="border-border/60 border-t py-16">
      {/* Centered column width matches other sections. */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Single full-width card for policy-ish copy. */}
        <Card className="border-border/60 bg-muted/20">
          <CardHeader>
            {/* Direct title—no cleverness; this is compliance-adjacent copy. */}
            <CardTitle className="text-xl">Data we collect</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {/* Enumerates client-side ID, distro label, and server-side IP hash. */}
              The optional “I switched” button stores a random device ID in
              {/* Explains dedupe strategy without claiming perfect accuracy. */}
              your browser, sends your chosen distro label, and hashes your IP
              {/* Server-side processing boundary is explicit. */}
              on the server to reduce duplicate counts. We do not sell data;
              {/* Clarifies intent: aggregate signal for newcomers. */}
              the point is an aggregate signal for newcomers. Full source is on
              {/* External repo link could be added later; GitHub is named in text. */}
              GitHub.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Secondary CTA: same destination as hero but lower commitment copy. */}
            <Link
              href="/switch"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {/* Action label avoids repeating “questionnaire” verbatim. */}
              Open the questionnaire
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
