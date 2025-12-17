"use client";

import useLanguage from "@/hooks/useLanguage";
import useMobileNav from "@/hooks/useMobileNav";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";

const HEADER_COPY = {
  de: {
    bookingLabel: "termin buchen",
  },
  en: {
    bookingLabel: "book a call",
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
          <Link href="/" className="flex">
              <h3><span>a</span><span>n</span><span>d</span><span>r</span><span>ı</span><span>ı</span><span>&nbsp;</span><span>l</span><span>ı</span><span>t</span><span>k</span><span>o</span><span>v</span><span>s</span><span>k</span><span>y</span><span>ı</span></h3>
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
          <div className="option navigation">
            <div className="content">
            <div className="icon">
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