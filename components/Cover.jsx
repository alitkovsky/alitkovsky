"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import TextType from "@/components/TextType";

const FIRST_CURSOR_BLINK_DURATION = 0.5; // seconds
const EXTRA_CURSOR_BLINKS = 1;

export default function Cover() {
  const pathname = usePathname();
  const [isFirstComplete, setIsFirstComplete] = useState(false);
  const [isSecondComplete, setIsSecondComplete] = useState(false);
  const [showFirstCursor, setShowFirstCursor] = useState(true);
  const [shouldStart, setShouldStart] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const hasAnnouncedCompletion = useRef(false);
  const completionTimeoutRef = useRef(null);

  const resetSequence = useCallback(() => {
    hasAnnouncedCompletion.current = false;
    setIsFirstComplete(false);
    setIsSecondComplete(false);
    setShowFirstCursor(true);
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  }, []);

  const handleOverlayTransition = useCallback((event) => {
    const transitionMode = event?.detail?.mode;
    if (!transitionMode) {
      return;
    }

    if (transitionMode === "initial" || (transitionMode === "route" && pathname === "/")) {
      setShouldStart(true);
      resetSequence();
      setAnimationKey((value) => value + 1);
    }
  }, [pathname, resetSequence]);

  useEffect(() => {
    if (!isSecondComplete || hasAnnouncedCompletion.current) {
      return;
    }

    hasAnnouncedCompletion.current = true;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cover:complete"));
    }
  }, [isSecondComplete]);

  useEffect(() => {
    const handleTransitionStart = (event) => {
      if (!event?.detail || event.detail.mode !== "initial") {
        return;
      }

      setShouldStart(false);
      resetSequence();
    };

    const handleTransitionEnd = (event) => {
      handleOverlayTransition(event);
    };

    let fallbackFrame = null;

    if (typeof window !== "undefined") {
      window.addEventListener("page-transition:start", handleTransitionStart);
      window.addEventListener("page-transition:end", handleTransitionEnd);

      fallbackFrame = window.requestAnimationFrame(() => {
        if (!document.body.classList.contains("page-transition--active")) {
          handleOverlayTransition({ detail: { mode: "initial" } });
        }
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("page-transition:start", handleTransitionStart);
        window.removeEventListener("page-transition:end", handleTransitionEnd);
        if (fallbackFrame) {
          window.cancelAnimationFrame(fallbackFrame);
        }
      }
    };
  }, [handleOverlayTransition, resetSequence]);

  useEffect(() => () => {
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }
  }, []);

  const handleFirstTypingComplete = () => {
    const holdDurationMs = FIRST_CURSOR_BLINK_DURATION * 2 * EXTRA_CURSOR_BLINKS * 1000;

    completionTimeoutRef.current = setTimeout(() => {
      setShowFirstCursor(false);
      setIsFirstComplete(true);
    }, holdDurationMs);
  };

  return (
    <section className="section cover">
      <div className="content">
        <h1 className="cover__headline">
          {shouldStart && (
            <TextType
              key={`cover-first-${animationKey}`}
              as="span"
              text={["andrii litkovskyi"]}
              typingSpeed={75}
              loop={false}
              showCursor={showFirstCursor}
              cursorCharacter="|"
              cursorBlinkDuration={FIRST_CURSOR_BLINK_DURATION}
              onTypingComplete={handleFirstTypingComplete}
            />
          )}
        </h1>
        {shouldStart && isFirstComplete && (
          <h1 className="cover__headline">
            <TextType
              key={`cover-second-${animationKey}`}
              as="span"
              text={["– your marketing expert"]}
              typingSpeed={75}
              loop={false}
              showCursor
              cursorCharacter="|"
              initialDelay={150}
              cursorBlinkDuration={FIRST_CURSOR_BLINK_DURATION}
              onTypingComplete={() => setIsSecondComplete(true)}
            />
          </h1>
        )}
      </div>
    </section>
  );
}
