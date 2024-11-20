import Link from "next/link";
import React, { useState, useEffect } from "react";

const LogoAnimation = ({
  initialText,
  hoverText,
  duration = 500,
  interval = 50,
  revertDelay = 1000, // Delay before reverting to initial text on timer
  leaveDelay = 5000, // Delay before reverting on mouse leave
}) => {
  const [displayedText, setDisplayedText] = useState(Array(initialText.length).fill(""));
  const [currentText, setCurrentText] = useState(initialText);
  const [isAnimating, setIsAnimating] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  const animateText = (targetText) => {
    setIsAnimating(true);
    const finalText = targetText.split("");
    let completed = 0;

    const randomizeChar = () => characters[Math.floor(Math.random() * characters.length)];

    const updateText = (index) => {
      const timer = setInterval(() => {
        setDisplayedText((prev) => {
          const updated = [...prev];
          updated[index] = randomizeChar();
          return updated;
        });
      }, interval);

      setTimeout(() => {
        clearInterval(timer);
        setDisplayedText((prev) => {
          const updated = [...prev];
          updated[index] = finalText[index];
          return updated;
        });

        completed += 1;
        if (completed === finalText.length) {
          setIsAnimating(false);
        }
      }, duration);
    };

    finalText.forEach((_, index) => {
      setTimeout(() => updateText(index), index * (duration / finalText.length));
    });
  };

  useEffect(() => {
    // Run the initial animation only once
    animateText(initialText);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleMouseEnter = () => {
    if (!isAnimating && currentText === initialText) {
      setCurrentText(hoverText);
      animateText(hoverText);

      setTimeout(() => {
        setCurrentText(initialText);
        animateText(initialText);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    if (!isAnimating && currentText === hoverText) {
      setTimeout(() => {
        setCurrentText(initialText);
        animateText(initialText);
      }, leaveDelay); // Add the delay before reverting to the initial text
    }
  };

  return (
    <Link
      href=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayedText.map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </Link>
  );
};

export default LogoAnimation;