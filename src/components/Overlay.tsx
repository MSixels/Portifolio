/**
 * Fixed overlay above the 3D canvas (z-1): a dark scrim gradient that is
 * stronger on the left and fades out around 66%, plus a radial vignette and
 * two subtle cyan/blue glows. Exact gradients from the prototype.
 */
export function Overlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: [
          "linear-gradient(95deg, rgba(8,10,14,0.82) 0%, rgba(8,10,14,0.52) 30%, rgba(8,10,14,0.12) 52%, rgba(8,10,14,0) 66%)",
          "radial-gradient(125% 95% at 50% 45%, transparent 38%, rgba(6,8,11,0.6) 100%)",
          "radial-gradient(120% 80% at 72% 8%, rgba(43,217,255,0.07), transparent 55%)",
          "radial-gradient(100% 90% at 8% 100%, rgba(90,140,255,0.05), transparent 50%)",
        ].join(","),
      }}
    />
  );
}

/**
 * Per-section frosted-glass layer. inset clamp(28px,5vh,64px) -3vw so the
 * blur reaches slightly past the container edges; the radial mask in the
 * `.frosted` class fades the borders so it never reads as a box.
 */
export function SectionFrost() {
  return (
    <div
      aria-hidden
      className="frosted"
      style={{ inset: "clamp(28px,5vh,64px) -3vw" }}
    />
  );
}
