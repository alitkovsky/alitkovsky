"use client";

import { memo, useCallback, useMemo, useState } from "react";
import SkillIcon3DCanvas from "@/components/ToolIcon3DCanvas";
import WiggleSvg from "@/components/WiggleSvg";
import SvgStrokeEffect from "@/components/SvgStrokeEffect";

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

  // Extract filename from svgSrc for SvgStrokeEffect
  // svgSrc is like "/assets/svg/paid-social.svg" -> "paid-social.svg"
  const svgFile = useMemo(() => {
    if (!svgSrc) return null;
    const parts = svgSrc.split('/');
    return parts[parts.length - 1];
  }, [svgSrc]);

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
      {!hideFallback && svgFile && (
        <WiggleSvg
          as="span"
          selector="path"
          distance={1.2}
          steps={7}
          duration={0.8}
          trigger="visible"
          className="tool-icon-3d-fallback tool-icon-3d-fallback--animated"
        >
          <SvgStrokeEffect
            file={svgFile}
            width="100%"
            height="100%"
            trigger="visible"
            visibilityRootMargin={visibilityRootMargin}
            className="tool-icon-3d-fallback__effect"
          />
        </WiggleSvg>
      )}
      <SkillIcon3DCanvas
        svgSrc={svgSrc}
        title={title}
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
