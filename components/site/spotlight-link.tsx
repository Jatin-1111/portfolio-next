"use client";

import Link from "next/link";
import type { ComponentProps, PointerEvent } from "react";

/**
 * Link whose surface is lit by the cursor. Position is written to CSS custom
 * properties directly on the element, so pointer movement never re-renders React.
 */
export function SpotlightLink({
  className = "",
  onPointerMove,
  ...props
}: ComponentProps<typeof Link>) {
  const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  };

  return (
    <Link
      {...props}
      onPointerMove={handleMove}
      className={`spotlight ${className}`}
    />
  );
}
