"use client";

const OVERLAY_LAYERS = [
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)",
    blur: 0.078125,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)",
    blur: 0.15625,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)",
    blur: 0.3125,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)",
    blur: 0.625,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)",
    blur: 1.25,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
    blur: 2.5,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
    blur: 5,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)",
    blur: 10,
  },
];

export default function BottomOverlayLayers({ className = "" }) {
  const wrapperClassName = className
    ? `bottom-overlay__layers ${className}`
    : "bottom-overlay__layers";

  return (
    <div className={wrapperClassName} aria-hidden="true">
      {OVERLAY_LAYERS.map((layer, index) => {
        const blur = `${layer.blur}px`;
        return (
          <div
            key={`${layer.blur}-${index}`}
            className="bottom-overlay__layer"
            style={{
              zIndex: index + 1,
              WebkitMaskImage: layer.mask,
              maskImage: layer.mask,
              WebkitBackdropFilter: `blur(${blur})`,
              backdropFilter: `blur(${blur})`,
            }}
          />
        );
      })}
    </div>
  );
}
