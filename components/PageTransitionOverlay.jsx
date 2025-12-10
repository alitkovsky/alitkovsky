"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const OVERLAY_EASE = [0.83, 0, 0.17, 1];
const LINE_EASE = [0.76, 0, 0.24, 1];
const LINE_ANIMATION_TIMES = [0, 0.55, 1];
const OVERLAY_ANIMATION_TIMES = [0, 0.82, 1];

const LINE_CLIP_INITIAL = "inset(50% 49.5% 50% 49.5%)";
const LINE_CLIP_HEIGHT = "inset(0% 49.5% 0% 49.5%)";
const LINE_CLIP_FULL = "inset(0% 0% 0% 0%)";

const dispatchPageTransitionEvent = (phase, detail) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(`page-transition:${phase}`, {
      detail,
    }),
  );
};

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const haveSeenInitialRef = useRef(false);
  const completionGuardRef = useRef(false);
  const modeRef = useRef("initial");

  const [mode, setMode] = useState("initial");
  const [transitionKey, setTransitionKey] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const runTransition = useCallback(
    (nextMode) => {
      completionGuardRef.current = false;
      dispatchPageTransitionEvent("start", { mode: nextMode });
      setMode(nextMode);
      modeRef.current = nextMode;
      setIsActive(true);
      setTransitionKey((current) => current + 1);
    },
    [],
  );

  useEffect(() => {
    if (!haveSeenInitialRef.current) {
      haveSeenInitialRef.current = true;
      return;
    }

    runTransition("route");
  }, [pathname, runTransition]);

  useEffect(() => {
    modeRef.current = "initial";
    dispatchPageTransitionEvent("start", { mode: "initial" });
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    if (isActive) {
      document.body.classList.add("page-transition--active");
    } else {
      document.body.classList.remove("page-transition--active");
    }

    return () => {
      document.body.classList.remove("page-transition--active");
    };
  }, [isActive]);

  const handleAnimationComplete = useCallback(() => {
    if (completionGuardRef.current) {
      return;
    }

    completionGuardRef.current = true;
    dispatchPageTransitionEvent("end", { mode: modeRef.current });
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (isActive || mode === "idle") {
      return;
    }

    // Reset to idle mode once a transition completes,
    // allowing future transitions to detect pathname changes.
    setMode("idle");
    modeRef.current = "idle";
  }, [isActive, mode]);

  if (!isActive) {
    return null;
  }

  return (
    <motion.div
      key={transitionKey}
      aria-hidden
      className="page-transition-overlay"
      initial="initial"
      animate="animate"
      onAnimationComplete={handleAnimationComplete}
      variants={{
        initial: { opacity: 1 },
        animate: {
          opacity: [1, 1, 0],
          transition: {
            duration: 1.4,
            times: OVERLAY_ANIMATION_TIMES,
            ease:
              mode === "initial"
                ? [OVERLAY_EASE, OVERLAY_EASE]
                : ["easeInOut", "easeInOut"],
          },
        },
      }}
    >
      <motion.div
        key={`${transitionKey}-line`}
        className="page-transition-overlay__line"
        initial={{ clipPath: LINE_CLIP_INITIAL }}
        animate={{
          clipPath: [LINE_CLIP_INITIAL, LINE_CLIP_HEIGHT, LINE_CLIP_FULL],
        }}
        transition={{
          duration: 1.1,
          times: LINE_ANIMATION_TIMES,
          ease: [LINE_EASE, LINE_EASE],
        }}
      />
    </motion.div>
  );
}
