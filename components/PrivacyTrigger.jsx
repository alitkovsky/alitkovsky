"use client";

import useLanguage from "@/hooks/useLanguage";

const COPY = {
  de: {
    label: "Cookie-Einstellungen",
  },
  en: {
    label: "Cookie settings",
  },
};

export default function PrivacyTrigger() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;

  const handleClick = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("openCookieSettings"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="privacy-trigger"
      aria-label={copy.label}
      title={copy.label}
    >
      <span className="privacy-trigger__text">{copy.label}</span>
    </button>
  );
}
