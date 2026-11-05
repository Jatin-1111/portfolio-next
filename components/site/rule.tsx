/**
 * A hairline that draws across when it scrolls into view (see PageMotion).
 * It is an element rather than a border so it can animate; with no JS or under
 * prefers-reduced-motion it is simply a static line.
 *
 * The parent must be `relative`.
 */
export function Rule({
  edge,
  inset = true,
}: {
  edge: "top" | "bottom";
  /** Match the .shell gutters (true) or span the parent's full width */
  inset?: boolean;
}) {
  return (
    <span
      data-rule
      aria-hidden="true"
      className={`absolute h-px bg-rule ${edge === "top" ? "top-0" : "bottom-0"} ${
        inset ? "inset-x-6 md:inset-x-10" : "inset-x-0"
      }`}
    />
  );
}
