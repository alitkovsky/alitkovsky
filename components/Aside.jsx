"use client";

import useThemeSlider from "@/hooks/useThemeSlider";
import useGridToggle from "@/hooks/useGridToggle";
import useScrollProgress from "@/hooks/useScrollProgress";

export default function Aside() {
  useThemeSlider();
  useGridToggle();

  const { scrollPercent, isVisible } = useScrollProgress();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside className="app-aside">
      <div className="options">
        {/* <div className="links">
          <a href="" target="_blank">behance</a>
          <a href="" target="_blank">linkedin</a>
          <a href="mailto:alitkovsky@me.com">alitkovsky@me.com</a>
        </div> */}

        {/* Theme slider */}
        <div className="option theme">
          <div className="icon-container">
            <svg className="icon theme" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="10"/>
            </svg>
          </div>

          <div className="slider-container">
          <div className="dots">
            {Array.from({ length: 17 }).map((_, i) => (
              <button
                key={i}
                className="dot"
                onClick={() => window?.appThemeDirect?.(i)}
                aria-label={`Set theme ${i}`}
              />
            ))}
          </div>
            <input
              className="slider"
              type="range"
              min="0"
              max="16"
              step="1"
              defaultValue="16"
            />
          </div>
        </div>

        {/* Grid toggle */}
        {/* <div className="option grid">
          <div className="content">
          <svg className="icon grid" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path d="M5 28h2V4H5v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5-24v24h2V4h-2z"/>
          </svg>
          </div>
        </div> */}

        {/* ScrollToTop toggle */}
        <div
          className={`option scroll ${isVisible ? "active-progress" : ""}`}
          onClick={scrollToTop}
        >
          <div className="content">
            <div className="ring-container">
            <span></span>
              <svg className="scroll-ring" width="48" height="48" viewBox="-1 -1 102 102">
                <path
                  d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                  stroke="var(--color--foreground--100)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="307"
                  strokeDashoffset={307 - (307 * scrollPercent) / 100}
                  style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.33, 1, 0.68, 1)" }}
                />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};