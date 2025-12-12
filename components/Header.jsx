"use client";

import useMobileNav from "@/hooks/useMobileNav";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";

export default function Header() {
  useMobileNav();

  return (
    <header className="app-header">
      <div className="content">
        <div className="brand">
          <Link href="/" className="flex">
              <h3 className="first-name"><span>a</span><span>n</span><span>d</span><span>r</span><span>ı</span><span>ı</span><span>&nbsp;</span><span>l</span><span>ı</span><span>t</span><span>k</span><span>o</span><span>v</span><span>s</span><span>k</span><span>y</span><span>ı</span></h3>
              {/* <h3 className="last-name"><span>l</span><span>ı</span><span>t</span><span>k</span><span>o</span><span>v</span><span>s</span><span>k</span><span>y</span><span>ı</span></h3> */}
          </Link>
      </div>
        <div className="actions">
          <div className="option booking">
            <BookCTA
              label="termin buchen"
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
