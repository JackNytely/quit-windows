import { HomePageBackground } from "@/components/home/home-page-background";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeTrendsSection } from "@/components/home/home-trends-section";
import { HomeMigrationSection } from "@/components/home/home-migration-section";
import { HomeDataDisclosureSection } from "@/components/home/home-data-disclosure-section";
import { HomeSiteFooter } from "@/components/home/home-site-footer";

/**
 * Composes the marketing homepage sections in order (hero → trends → migration → data → footer).
 */
export default function HomePage() {
  return (
    // Relative positioning anchors absolutely positioned background gradients.
    <div className="relative">
      {/* Non-interactive atmosphere layer behind all sections. */}
      <HomePageBackground />
      {/* Primary hero + sidebar widgets. */}
      <HomeHeroSection />
      {/* “Why now” narrative grid. */}
      <HomeTrendsSection />
      {/* Three-step migration overview. */}
      <HomeMigrationSection />
      {/* Data collection disclosure + secondary CTA. */}
      <HomeDataDisclosureSection />
      {/* Footer legal + copyright. */}
      <HomeSiteFooter />
    </div>
  );
}
