"use client";

import { useEffect, useRef } from "react";

export default function ProcessDialog({ step, onClose }) {
  const modalRef = useRef(null);
  const headingId = "process-dialog-title";

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return undefined;

    const focusableSelectors = [
      'a[href]',
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const focusFirst = () => {
      const first = dialog.querySelector(focusableSelectors);
      if (first) first.focus();
    };

    focusFirst();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = Array.from(dialog.querySelectorAll(focusableSelectors)).filter(
        (el) => !el.hasAttribute("disabled")
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !dialog.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const { title, description } = step;

  return (
    <>
      {/* Backdrop */}
      <div
        className="process-dialog__backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="process-dialog__wrapper"
        onClick={onClose}
      >
        <div
          className="process-dialog"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Section 1: Summary */}
          <div className="process-dialog__section process-dialog__section--main">
            <h3 id={headingId}>
              {title}
            </h3>
            <p>{description.summary}</p>
          </div>

          {/* Section 2: Result */}
          <div className="process-dialog__section process-dialog__section--result">
            <p className="process-dialog__result-metrics">{description.metrics}</p>
            <p className="process-dialog__result-text">{description.result}</p>
          </div>

        </div>
        {/* <button
            className="process-dialog__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <i aria-hidden className="plus-icon">+</i>
          </button> */}
      </div>
    </>
  );
}