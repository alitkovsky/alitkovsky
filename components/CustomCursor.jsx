"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useDeviceCapabilities from "@/hooks/useDeviceCapabilities";

const DEFAULT_DIAMETER = 12;
const LINK_SCALE = 1.35;
const MIN_CARET_WIDTH = 3;

const SPRING_CONFIG = {
  damping: 26,
  stiffness: 320,
  mass: 0.4,
};

const TEXT_SELECTOR = [
  "[data-cursor=\"text\"]",
  "p",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "li",
  "label",
  "blockquote",
  "cite",
  "small",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "code",
  "figcaption",
  "dd",
  "dt",
  "legend",
].join(", ");

const LINK_SELECTOR = [
  "a",
  "button",
  "[role=\"button\"]",
  "[data-cursor=\"link\"]",
].join(", ");

function getTextMetrics(element) {
  const style = window.getComputedStyle(element);
  const fontSize = parseFloat(style.fontSize) || DEFAULT_DIAMETER;
  const lineHeight =
    style.lineHeight === "normal"
      ? fontSize * 1.25
      : parseFloat(style.lineHeight) || fontSize * 1.25;

  const caretWidth = Math.max(MIN_CARET_WIDTH, fontSize * 0.12);

  return {
    width: caretWidth,
    height: lineHeight,
  };
}

function isInteractive(target) {
  if (!(target instanceof Element)) {
    return false;
  }
  return Boolean(target.closest(LINK_SELECTOR));
}

function resolveTextElement(target) {
  if (!(target instanceof Element)) {
    return null;
  }
  if (isInteractive(target)) {
    return null;
  }
  const explicit = target.closest("[data-cursor=\"text\"]");
  if (explicit) {
    return explicit;
  }
  return target.closest(TEXT_SELECTOR);
}

/**
 * CustomCursor - Custom cursor that follows mouse movement.
 *
 * PERFORMANCE OPTIMIZED:
 * - Uses useDeviceCapabilities to detect trackpad presence
 * - Returns null early on touch-only devices (no springs running)
 * - Enables cursor effects on iPad with Magic Keyboard/trackpad
 */
export default function CustomCursor() {
  // OPTIMIZATION: Use centralized device detection
  const { showCursorEffects, prefersReducedMotion } = useDeviceCapabilities();

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorStyles, setCursorStyles] = useState({
    variant: "default",
    width: DEFAULT_DIAMETER,
    height: DEFAULT_DIAMETER,
  });

  const pointerDataRef = useRef(null);
  const rafRef = useRef(null);
  const textMetricsCacheRef = useRef(new WeakMap());

  const xValue = useMotionValue(-100);
  const yValue = useMotionValue(-100);

  const cursorX = useSpring(xValue, SPRING_CONFIG);
  const cursorY = useSpring(yValue, SPRING_CONFIG);

  const transition = useMemo(
    () => ({
      duration: 0.16,
      ease: [0.33, 1, 0.68, 1],
    }),
    []
  );

  const transformTemplate = useCallback((_, generated) => {
    const remainder = generated && generated !== "none" ? generated : "";
    return remainder ? `translate(-50%, -50%) ${remainder}` : "translate(-50%, -50%)";
  }, []);

  // Determine if cursor should be enabled
  const isEnabled = showCursorEffects && !prefersReducedMotion;

  useEffect(() => {
    textMetricsCacheRef.current = new WeakMap();
    if (!isEnabled) {
      return;
    }

    const handleResize = () => {
      textMetricsCacheRef.current = new WeakMap();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      return;
    }

    setMounted(true);
    document.body.classList.add("custom-cursor-active");

    const scheduleFrame = () => {
      if (rafRef.current) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const data = pointerDataRef.current;
        if (!data) {
          return;
        }

        const { target } = data;

        let nextVariant = "default";
        let nextWidth = DEFAULT_DIAMETER;
        let nextHeight = DEFAULT_DIAMETER;

        if (isInteractive(target)) {
          nextVariant = "link";
        } else {
          const textElement = resolveTextElement(target);
          if (textElement) {
            let metrics = textMetricsCacheRef.current.get(textElement);
            if (!metrics) {
              metrics = getTextMetrics(textElement);
              textMetricsCacheRef.current.set(textElement, metrics);
            }
            nextVariant = "text";
            nextWidth = metrics.width;
            nextHeight = metrics.height;
          }
        }

        xValue.set(data.x);
        yValue.set(data.y);

        setCursorStyles((prev) => {
          if (
            prev.variant === nextVariant &&
            Math.abs(prev.width - nextWidth) < 0.5 &&
            Math.abs(prev.height - nextHeight) < 0.5
          ) {
            return prev;
          }
          return {
            variant: nextVariant,
            width: nextWidth,
            height: nextHeight,
          };
        });
      });
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }
      pointerDataRef.current = {
        x: event.clientX,
        y: event.clientY,
        target: event.target,
      };
      setIsVisible(true);
      scheduleFrame();
    };

    const handlePointerLeave = (event) => {
      if (event.relatedTarget === null) {
        setIsVisible(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsVisible(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isEnabled, xValue, yValue]);

  // OPTIMIZATION: Return null early if cursor effects disabled
  // This prevents spring animations from running at all
  if (!mounted || !isEnabled) {
    return null;
  }

  const animate = {
    opacity: isVisible ? 1 : 0,
    width: cursorStyles.width,
    height: cursorStyles.height,
    borderRadius:
      cursorStyles.variant === "text"
        ? cursorStyles.width / 2
        : 999,
    backgroundColor:
      cursorStyles.variant === "text"
        ? "var(--custom-cursor-text-color)"
        : "var(--custom-cursor-base-color)",
    scale: cursorStyles.variant === "link" ? LINK_SCALE : 1,
  };

  return createPortal(
    <motion.div
      className="custom-cursor"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial={false}
      animate={animate}
      transition={transition}
      transformTemplate={transformTemplate}
    />,
    document.body
  );
}
