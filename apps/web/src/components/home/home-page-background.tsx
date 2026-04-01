/**
 * Decorative blurred gradients behind the homepage content (no pointer interaction).
 */
export function HomePageBackground() {
  return (
    // Full-bleed layer sits under content; clicks pass through to real UI below.
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Large soft primary glow centered above the fold. */}
      <div className="bg-primary/15 absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
      {/* Secondary emerald accent to break up monochrome darkness on the right. */}
      <div className="absolute top-60 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
    </div>
  );
}
