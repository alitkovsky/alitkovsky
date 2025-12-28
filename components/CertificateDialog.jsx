"use client";

import { useEffect, useRef, useState } from "react";

export default function CertificateDialog({ certificate, onClose }) {
  const modalRef = useRef(null);
  const headingId = "certificate-dialog-title";
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

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
        handleClose();
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
  }, [isClosing]);

  const { title, imageSrc, aspectRatio = "4 / 3" } = certificate;

  // Determine if portrait orientation (height > width)
  const isPortrait = (() => {
    const parts = aspectRatio.split("/").map((p) => parseFloat(p.trim()));
    return parts.length === 2 && parts[0] < parts[1];
  })();

  const dialogClasses = [
    "certificate-dialog",
    isClosing && "certificate-dialog--closing",
    isPortrait && "certificate-dialog--portrait",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Backdrop */}
      <div
        className={`certificate-dialog__backdrop${isClosing ? " certificate-dialog__backdrop--closing" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`certificate-dialog__wrapper${isClosing ? " certificate-dialog__wrapper--closing" : ""}`}
        onClick={handleClose}
      >
        <div
          className={dialogClasses}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 id={headingId} className="sr-only">
            {title}
          </h3>
          {/* Using native img for natural sizing - dialog wraps to fit */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="certificate-dialog__image"
            src={imageSrc}
            alt={title}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
