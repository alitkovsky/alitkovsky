"use client";

const HEADER_OVERLAY_LAYERS = [
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
    blur: 0.078125,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)",
    blur: 0.15625,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)",
    blur: 0.3125,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)",
    blur: 0.625,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)",
    blur: 1.25,
  },
  {
    mask: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)",
    blur: 2.5,
  },
  {
    mask: "linear-gradient(rgb(0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgba(0, 0, 0, 0) 25%)",
    blur: 5,
  },
  {
    mask: "linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 12.5%)",
    blur: 10,
  }
];

export default function HeaderOverlayLayers() {
  return (
    <div className="app-header__overlay-layers" aria-hidden="true">
      {HEADER_OVERLAY_LAYERS.map((layer, index) => {
        const blur = `${layer.blur}px`;

        return (
          <div
            key={`${layer.blur}-${index}`}
            className="app-header__overlay-layer"
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
