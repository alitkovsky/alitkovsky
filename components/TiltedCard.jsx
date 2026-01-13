import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import WiggleSvg from "@/components/WiggleSvg";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = "",
  captionText = "",
  containerHeight = "var(--image--height, 560px)",
  containerWidth = "100%",
  imageHeight = "var(--image--height, 560px)",
  imageWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);

  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);
  const overlayBadgeContent =
    overlayContent ??
    (
      <div className="tilted-card-overlay-default" aria-hidden="true" />
    );

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}
      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}>
        <motion.img
          src={imageSrc}
          alt={altText}
          width={560}
          height={560}
          className="tilted-card-img image-overlay-01"
          style={{
            width: imageWidth,
            height: imageHeight
          }} />

        {displayOverlayContent && (
          <motion.div className="tilted-card-overlay">
            <WiggleSvg
              as="div"
              trigger="visible"
              rootMargin="0px 0px -33% 0px"
              selector="self"
              distance={0.75}
              duration={0.9}
              steps={7}
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              {overlayBadgeContent}
            </WiggleSvg>
          </motion.div>
        )}
      </motion.div>
      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}>
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
