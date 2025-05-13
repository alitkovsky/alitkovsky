"use client";

import Time from "@/components/Time";
import useMobileNav from "@/hooks/useMobileNav";

export default function Header() {
  useMobileNav();

  return (
    <header className="app-header">
      <div className="content">
        <div className="brand">
          <div className="brand-inner">
            <h3 className="first-name">
              <span>A</span><span>n</span><span>d</span><span>r</span><span>i</span><span>ı</span>
            </h3>
            <h3 className="last-name">
              <span className="first">L</span><span>ı</span><span>t</span><span>k</span><span>o</span><span>v</span><span>s</span><span>k</span><span>y</span><span>i</span>
            </h3>
          </div>
        </div>
        <Time />
        <div className="actions">
          {/* <div className="language">
            <a href="/">De</a>&nbsp;|&nbsp;<a href="/">En</a>
          </div> */}
          <div className="status content">
            <span className="arrow">→</span>
            <a href="" className="text">Let's meet!</a>
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