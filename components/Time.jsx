"use client";

import { useState, useEffect } from "react";

function Time() {
  const [digits, setDigits] = useState(["0", "0", ":", "0", "0", ":", "0", "0"]);
  const [isoTime, setIsoTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format for display
      const displayTime = now.toLocaleTimeString("de-DE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // ISO format for datetime attribute
      const berlinTime = now.toLocaleString("sv-SE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const newDigits = displayTime.split("").map((char) => char);
      setDigits(newDigits);
      setIsoTime(berlinTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const displayString = digits.join("");

  return (
    <time
      className="time"
      dateTime={isoTime}
      aria-label={`Current time in Berlin: ${displayString}`}
    >
      {digits.map((char, index) =>
        char === ":" ? (
          <span key={index} className="colon" aria-hidden="true">
            {char}
          </span>
        ) : (
          <span key={index} className="digit" aria-hidden="true">
            <span>{char}</span>
          </span>
        )
      )}
      <span aria-hidden="true">&nbsp;—&nbsp;berlin</span>
    </time>
  );
}

export default Time;
