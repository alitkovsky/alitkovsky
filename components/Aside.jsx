"use client";

import useScrollProgress from "@/hooks/useScrollProgress";

export default function Aside() {
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

        {/* Theme slider intentionally disabled for now */}

        {/* Grid toggle intentionally disabled for now */}

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
