import React, { useState, useEffect } from "react";

function Time() {
  const [digits, setDigits] = useState(["0", "0", ":", "0", "0", ":", "0", "0"]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("de-DE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const newDigits = now.split("").map((char) => char);
      setDigits(newDigits);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="time">
      {digits.map((char, index) =>
        char === ":" ? (
          <span key={index} className="colon">
            {char}
          </span>
        ) : (
          <span key={index} className="digit">
            <span>{char}</span>
          </span>
        )
      )}
      &nbsp;Berlin
    </div>
  );
}

export default Time;
