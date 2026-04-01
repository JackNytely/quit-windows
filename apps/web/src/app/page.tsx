import HomePage from "@/components/home/home-page";

/**
 * Next.js App Router entry for `/`: delegates to the composed homepage component module.
 */
export default function Page() {
  // Keep the route file tiny so layout concerns stay in `components/home/*`.
  return <HomePage />;
}
