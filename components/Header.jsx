"use client";

import useLanguage from "@/hooks/useLanguage";
import useMobileNav from "@/hooks/useMobileNav";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";

const HEADER_COPY = {
  de: {
    bookingLabel: "termin buchen",
    brandLabel: "Andrii Litkovskyi - Startseite",
    menuLabel: "Menü öffnen",
  },
  en: {
    bookingLabel: "book a call",
    brandLabel: "Andrii Litkovskyi - Home",
    menuLabel: "Open menu",
  },
};

export default function Header() {
  const { language } = useLanguage();
  const copy = HEADER_COPY[language] ?? HEADER_COPY.en;

  useMobileNav();

  return (
    <header className="app-header">
      <div className="content">
        <div className="brand">
          <Link href="/" className="flex" aria-label={copy.brandLabel}>
              <span className="brand__name" aria-hidden="true"><span>a</span><span>n</span><span>d</span><span>r</span><span>ı</span><span>ı</span><span>&nbsp;</span><span>l</span><span>ı</span><span>t</span><span>k</span><span>o</span><span>v</span><span>s</span><span>k</span><span>y</span><span>ı</span></span>
          </Link>
      </div>
        <div className="actions">
          <div className="option booking">
            <BookCTA
              label={copy.bookingLabel}
              className="inline-flex"
              ctaLocation="header"
            />
          </div>
          <div
            className="option navigation"
            role="button"
            tabIndex={0}
            aria-label={copy.menuLabel}
            aria-expanded="false"
            aria-controls="mobile-nav"
          >
            <div className="content">
            <div className="icon" aria-hidden="true">
              <div className="line"><div className="content"></div></div>
              <div className="line"><div className="content"></div></div>
            </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
