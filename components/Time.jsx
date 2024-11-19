import React, { useState, useEffect } from "react";

function Time() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const berlinTime = new Date().toLocaleTimeString("de-DE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(berlinTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {time}
    </>
  );
}

export default Time;
