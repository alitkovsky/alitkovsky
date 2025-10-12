import { useEffect } from "react";

export default function useThemeSlider() {
  useEffect(() => {
    // Add meta tags if not present
    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeMeta);
    };

    let appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!appleMeta) {
      appleMeta = document.createElement("meta");
      appleMeta.setAttribute("name", "apple-mobile-web-app-status-bar-style");
      document.head.appendChild(appleMeta);
    };

    let appleCapable = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (!appleCapable) {
      appleCapable = document.createElement("meta");
      appleCapable.setAttribute("name", "apple-mobile-web-app-capable");
      appleCapable.setAttribute("content", "yes");
      document.head.appendChild(appleCapable);
    };

    requestAnimationFrame(() => {
      const slider = document.querySelector(".slider");
      const icon = document.querySelector(".option.theme .icon-container");
      const dots = document.querySelectorAll(".dot");
      const html = document.documentElement;
      const themeOption = document.querySelector(".option.theme");

      if (!slider || !icon || !themeOption) return;

      const removeThemeClasses = () => {
        document.body.className = document.body.className
          .split(" ")
          .filter((cls) => !cls.startsWith("theme--"))
          .join(" ");
      };

      const updateDotActiveState = (value) => {
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === Number(value));
        });
      };

      const applyTheme = (value) => {
        const padded = String(value).padStart(2, "0");
        removeThemeClasses();
        document.body.classList.add(`theme--${padded}`);
        slider.value = Number(value);

        // Animate icon to selected dot
        icon.style.transition = "bottom 0.25s ease";
        icon.style.bottom = `${value * 20}px`;

        // Animate icon back to resting position
        setTimeout(() => {
          icon.style.transition = "bottom 0.35s ease";
          icon.style.bottom = `${0 * 20}px`; // resting position for default theme slot
        }, 700);

        updateDotActiveState(Number(value));
        localStorage.setItem("preferred-theme", padded);
        const maxAge = 60 * 60 * 24 * 365; // one year
        document.cookie = `preferred-theme=${padded};path=/;max-age=${maxAge}`;

        // Auto-hide theme slider on touch devices
        if (document.documentElement.classList.contains("touchevents")) {
          setTimeout(() => {
            document.body.classList.remove("theme-slider--is--visible");
          }, 1200); // wait for icon to reset before hiding
        };

        // Extract color from CSS variable
        const tempDiv = document.createElement("div");
        tempDiv.className = `theme--${padded}`;
        document.body.appendChild(tempDiv);
        const computedColor = getComputedStyle(tempDiv).getPropertyValue("--color--background--100").trim();
        document.body.removeChild(tempDiv);

        // Update meta tag
        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta && computedColor) {
          themeMeta.setAttribute("content", computedColor);
        }
      };

      const handleSliderInput = (e) => {
        applyTheme(e.target.value);
      };

      slider.addEventListener("input", handleSliderInput);

      // Load saved theme or fall back to project default (theme 04)
      const stored = localStorage.getItem("preferred-theme");
      if (stored !== null) {
        applyTheme(stored);
      } else {
        applyTheme(4);
      }

      // Hover behavior (desktop)
      if (html.classList.contains("no-touchevents")) {
        themeOption.addEventListener("mouseenter", () => {
          document.body.classList.add("theme-slider--is--visible");
        });
        themeOption.addEventListener("mouseleave", () => {
          document.body.classList.remove("theme-slider--is--visible");
        });
      }

      // Tap to show/hide (touch devices)
      if (html.classList.contains("touchevents")) {
        themeOption.addEventListener("click", () => {
          document.body.classList.add("theme-slider--is--visible");
        });

        document.addEventListener("click", (event) => {
          if (!event.target.closest(".option.theme")) {
            document.body.classList.remove("theme-slider--is--visible");
          }
        });
      }

      // Keyboard shortcuts
      const handleKeydown = (e) => {
        switch (e.key) {
          case "g":
          case ";":
            document.querySelector(".option.grid")?.click();
            break;
          case "w":
          case "b":
            window.appThemeToggle();
            break;
          case "s":
          case "ArrowLeft":
            window.appThemeSpectrum();
            break;
          case "ArrowRight": {
            const current = [...document.body.classList].find((cls) =>
              cls.startsWith("theme--")
            );
            const currentVal = current ? parseInt(current.split("--")[1]) : 16;
            const next = currentVal === 16 ? 0 : currentVal + 1;
            applyTheme(next);
            break;
          }
          case "t":
            document.body.classList.toggle("theme-slider--is--visible");
            break;
        }
      };

      document.addEventListener("keydown", handleKeydown);

      // Expose globally
      window.appThemeToggle = () => {
        const current = [...document.body.classList].find((cls) =>
          cls.startsWith("theme--")
        );
        const currentVal = current ? parseInt(current.split("--")[1]) : 16;
        const next = currentVal === 0 ? 16 : 0;
        applyTheme(next);
      };

      window.appThemeSpectrum = () => {
        const current = [...document.body.classList].find((cls) =>
          cls.startsWith("theme--")
        );
        const currentVal = current ? parseInt(current.split("--")[1]) : 16;
        const next = currentVal === 0 ? 16 : currentVal - 1;
        applyTheme(next);
      };

      window.appThemeDirect = (index) => {
        applyTheme(index);
      };

      return () => {
        slider.removeEventListener("input", handleSliderInput);
        document.removeEventListener("keydown", handleKeydown);
      };
    });
  }, []);
};
