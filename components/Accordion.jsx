"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Universal Accordion Component
 * CSS-only animation with minimal JS for toggle-close
 * Radio inputs ensure only one item open at a time
 * GPU-accelerated with CSS Grid height animation
 *
 * @param {Object} props
 * @param {Array} props.items - Array of { question, answer } objects
 * @param {string} props.ariaLabel - Accessible label for the accordion region
 * @param {string} props.name - Unique name for radio group (defaults to auto-generated)
 * @param {string} props.className - Additional class name for the accordion wrapper
 */
export default function Accordion({
  items = [],
  ariaLabel = "Accordion",
  name,
  className = ""
}) {
  const baseId = useId();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const radioName = name || `accordion-${baseId}`;
  const accordionRef = useRef(null);

  // Toggle item - clicking same item closes it
  const handleToggle = useCallback((index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(index);
    }
  }, [handleToggle]);

  // Close accordion when clicking outside
  useEffect(() => {
    if (expandedIndex === null) return;

    const handleClickOutside = (e) => {
      if (accordionRef.current && !accordionRef.current.contains(e.target)) {
        setExpandedIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expandedIndex]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={accordionRef}
      className={`accordion ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const toggleId = `${baseId}-toggle-${index}`;
        const contentId = `${baseId}-content-${index}`;
        const isExpanded = expandedIndex === index;

        return (
          <div className="item" key={index}>
            <input
              type="radio"
              name={radioName}
              id={toggleId}
              className="item__toggle"
              checked={isExpanded}
              onChange={() => handleToggle(index)}
              aria-hidden="true"
              tabIndex={-1}
            />
            <button
              type="button"
              className="btn"
              data-cursor="link"
              onClick={() => handleToggle(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isExpanded}
              aria-controls={contentId}
            >
              <span className="caption">{item.question}</span>
              <span className="icon" aria-hidden="true">+</span>
            </button>
            <div
              id={contentId}
              className="item-content"
              role="region"
              aria-hidden={!isExpanded}
            >
              <div className="item-content__inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
