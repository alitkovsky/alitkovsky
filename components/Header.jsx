"use client";

import useMobileNav from "@/hooks/useMobileNav";
import TextEffect from "@/components/TextEffect";

export default function Header() {
  useMobileNav();

  return (
    <header className="app-header">
      <div className="content">
        <div className="brand">
          <a href="/" className="flex">
              <h3 className="first-name"><span>a</span><span>n</span><span>d</span><span>r</span><span>ı</span><span>ı</span></h3>
              <h3 className="last-name"><span>l</span><span>ı</span><span>t</span><span>k</span><span>o</span><span>v</span><span>s</span><span>k</span><span>y</span><span>ı</span></h3>
          </a>
      </div>
        <div className="actions">
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
