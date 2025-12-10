'use client';

import SvgStrokeEffect from "@/components/SvgStrokeEffect";
import { cn } from "@/lib/utils";

/**
 * Draws the long process path SVG with the same stroke animation behaviour
 * used elsewhere in the site. Drop this component into any layout – it will
 * expand to the full width of its container while keeping the original aspect
 * ratio and animate when it enters the viewport.
 */
export default function ProcessPath({
  trigger = "visible",
  animationDuration = 900,
  initiallyVisible = false,
  className,
  style
}) {
  // Stretch the path wider than the viewport so it enters from the right
  // and exits on the left while the container clips the overflow.
  const overflowWidth = "180vw";
  const offsetLeft = "-40vw";

  return (
    <div
      className={cn("process-path", className)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3600 / 1193",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          left: offsetLeft,
          width: overflowWidth,
          height: "100%",
        }}
      >
        <SvgStrokeEffect
          file="process-path.svg"
          basePath="/assets/svg"
          trigger={trigger}
          animationDuration={animationDuration}
          initiallyVisible={initiallyVisible}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
