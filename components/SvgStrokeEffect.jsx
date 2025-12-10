'use client';

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTextEffect } from "@/hooks/useTextEffect";

export default function SvgStrokeEffect({
  file,
  basePath = "/assets/svg",
  trigger = "visible",
  animationDuration = 700,
  svgStyle,
  width,
  height,
  frameStrategy = "sequential",
  loopFrames = false,
  groupSequence = true,
  className,
  style,
  initiallyVisible = false,
  visibilityRootMargin,
  visibilityThreshold,
}) {
  const effectConfig = useMemo(() => {
    if (!file) return null;
    return {
      file,
      animationDuration,
      style: {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        ...(svgStyle || {}),
      },
      frameStrategy,
      loopFrames,
      groupSequence,
    };
  }, [file, animationDuration, svgStyle, frameStrategy, loopFrames, groupSequence]);

  const sizeStyle = useMemo(
    () => ({
      ...(width ? { width: typeof width === "number" ? `${width}px` : width } : {}),
      ...(height ? { height: typeof height === "number" ? `${height}px` : height } : {}),
      ...style,
    }),
    [width, height, style],
  );

  const effect = useTextEffect({
    customEffect: effectConfig,
    trigger,
    basePath,
    initiallyVisible,
    visibilityRootMargin,
    visibilityThreshold,
  });

  return (
    <div
      ref={effect.ref}
      className={cn("relative", className)}
      style={sizeStyle}
      aria-hidden="true"
    />
  );
}
