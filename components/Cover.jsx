"use client";

import { useEffect, useRef, useState } from "react";

import TextType from "@/components/TextType";

const FIRST_CURSOR_BLINK_DURATION = 0.5; // seconds
const EXTRA_CURSOR_BLINKS = 1;

export default function Cover() {
  const [isFirstComplete, setIsFirstComplete] = useState(false);
  const [isSecondComplete, setIsSecondComplete] = useState(false);
  const [showFirstCursor, setShowFirstCursor] = useState(true);
  const hasAnnouncedCompletion = useRef(false);
  const completionTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isSecondComplete || hasAnnouncedCompletion.current) {
      return;
    }

    hasAnnouncedCompletion.current = true;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cover:complete"));
    }
  }, [isSecondComplete]);

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
          <TextType
            as="span"
            text={["andrii litkovskyi"]}
            typingSpeed={75}
            loop={false}
            showCursor={showFirstCursor}
            cursorCharacter="|"
            cursorBlinkDuration={FIRST_CURSOR_BLINK_DURATION}
            onTypingComplete={handleFirstTypingComplete}
          />
        </h1>
        {isFirstComplete && (
          <h1 className="cover__headline">
            <TextType
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
