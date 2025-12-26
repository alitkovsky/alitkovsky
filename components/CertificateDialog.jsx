"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
          className={`certificate-dialog${isClosing ? " certificate-dialog--closing" : ""}`}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          style={{ aspectRatio }}
        >
          <h3 id={headingId} className="sr-only">
            {title}
          </h3>
          <div className="certificate-dialog__image-container">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 90vw, 70vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          {/* <button
            className={`certificate-dialog__close${isClosing ? " certificate-dialog__close--closing" : ""}`}
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <i aria-hidden className="plus-icon">+</i>
          </button> */}
        </div>
      </div>
    </>
  );
}
