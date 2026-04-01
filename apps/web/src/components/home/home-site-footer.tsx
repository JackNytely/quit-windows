/**
 * Site-wide footer: copyright + trademark disclaimer.
 */
export function HomeSiteFooter() {
  // Compute year once per render (fine for static marketing pages).
  const year = new Date().getFullYear();
  return (
    // Muted text and border to de-emphasize vs main content.
    <footer className="text-muted-foreground border-border/60 border-t py-10 text-sm">
      {/* Flex column on mobile; row layout with space-between on wider screens. */}
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-4 sm:flex-row sm:px-6">
        {/* Left: project name + license (MIT matches repo). */}
        <p>© {year} QuitWindows.org — MIT licensed.</p>
        {/* Right: legal-ish disclaimer about trademarks / affiliation. */}
        <p className="max-w-md">
          {/* Clarifies independence from Microsoft (common confusion). */}
          Not affiliated with Microsoft. “Windows” is a trademark of Microsoft
          {/* Completes the trademark attribution sentence. */}
          Corporation.
        </p>
      </div>
    </footer>
  );
}
