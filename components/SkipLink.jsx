"use client";

import useLanguage from "@/hooks/useLanguage";

const SKIP_LINK_COPY = {
  de: "Zum Hauptinhalt springen",
  en: "Skip to main content",
};

export default function SkipLink() {
  const { language } = useLanguage();
  const label = SKIP_LINK_COPY[language] ?? SKIP_LINK_COPY.en;

  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
