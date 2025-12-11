"use client";

import { useState, memo } from "react";
import Image from "next/image";
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
  const [hideFallback, setHideFallback] = useState(false);

  return (
    <span className={`tool-icon-3d-wrapper ${className}`}>
      <Image
        src={svgSrc}
        alt={title || "Tool icon"}
        width={150}
        height={60}
        draggable={false}
        className={`tool-icon-3d-fallback ${hideFallback ? "is-hidden" : ""}`}
      />
      <SkillIcon3DCanvas
        svgSrc={svgSrc}
        color={color}
        thickness={thickness}
        mode={mode}
        lookAtMouse={lookAtMouse}
        disableBelow={disableBelow}
        pullApart={pullApart}
        inlineFallback
        trigger={trigger}
        visibilityRootMargin={visibilityRootMargin}
        visibilityThreshold={visibilityThreshold}
        isActive={isActive}
        onReady={() => setHideFallback(true)}
        onError={() => setHideFallback(false)}
      />
    </span>
  );
}

export default memo(ToolIcon3D);
