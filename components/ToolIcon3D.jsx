"use client";

import { memo, useCallback, useMemo, useState } from "react";
import SkillIcon3DCanvas from "@/components/ToolIcon3DCanvas";

function ToolIcon3D({
  icon,
  svgSrc,
  title,
  color = "#131313",
  thickness = 1.5,
  mode = "contain",
  lookAtMouse = false,
  disableBelow = 768,
  pullApart = 0.4,
  className = "",
  trigger = "hover",
  visibilityRootMargin = "0px 0px -33%",
  visibilityThreshold = 0,
  isActive = false,
}) {
  const [renderState, setRenderState] = useState({
    ready: false,
    failed: false,
    isMobile: false,
    prefersReducedMotion: false,
  });

  const hideFallback = useMemo(() => {
    return (
      renderState.ready &&
      !renderState.failed &&
      !renderState.isMobile &&
      !renderState.prefersReducedMotion
    );
  }, [renderState]);

  const fallbackStyle = useMemo(
    () => ({
      maskImage: `url(${svgSrc})`,
      WebkitMaskImage: `url(${svgSrc})`,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskPosition: "center",
      WebkitMaskPosition: "center",
      backgroundColor: "var(--color--foreground--100)",
    }),
    [svgSrc]
  );

  const handleReady = useCallback(
    () => setRenderState((prev) => ({ ...prev, ready: true, failed: false })),
    []
  );

  const handleError = useCallback(
    () => setRenderState((prev) => ({ ...prev, ready: false, failed: true })),
    []
  );

  const handleStateChange = useCallback(
    (state) => setRenderState((prev) => ({ ...prev, ...state })),
    []
  );

  return (
    <span className={`tool-icon-3d-wrapper ${hideFallback ? "is-ready" : ""} ${className}`}>
      <span
        role="presentation"
        aria-hidden="true"
        className="tool-icon-3d-fallback"
        style={fallbackStyle}
      />
      <SkillIcon3DCanvas
        svgSrc={svgSrc}
        color={color}
        thickness={thickness}
        mode={mode}
        lookAtMouse={lookAtMouse}
        disableBelow={disableBelow}
        pullApart={pullApart}
        inlineFallback={false}
        trigger={trigger}
        visibilityRootMargin={visibilityRootMargin}
        visibilityThreshold={visibilityThreshold}
        isActive={isActive}
        onReady={handleReady}
        onError={handleError}
        onStateChange={handleStateChange}
      />
    </span>
  );
}

export default memo(ToolIcon3D);
