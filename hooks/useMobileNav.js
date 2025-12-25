import { useEffect } from "react";
import { MOBILE_NAV_TRANSITION_DURATION } from "./useScrollToSection";

export default function useMobileNav() {
  useEffect(() => {
    const navButton = document.querySelector(".option.navigation");
    const body = document.body;

    if (!navButton || !body) return;

    let closeTimeoutId = null;

    const openMobileNav = () => {
      // Cancel any pending close cleanup
      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
        closeTimeoutId = null;
      }

      // Update aria-expanded for accessibility
      navButton.setAttribute("aria-expanded", "true");

      // Step 1: Show nav with .mobile-nav--is--transitioning
      body.classList.add("mobile-nav--is--transitioning");

      // Step 2: Wait for next paint to trigger opacity transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          body.classList.add("mobile-nav--is--visible");
        });
      });
    };

    const closeMobileNav = () => {
      // Update aria-expanded for accessibility
      navButton.setAttribute("aria-expanded", "false");

      body.classList.remove("mobile-nav--is--visible");

      // Remove transitioning class after animation completes to restore scrolling
      closeTimeoutId = setTimeout(() => {
        body.classList.remove("mobile-nav--is--transitioning");
        closeTimeoutId = null;
      }, MOBILE_NAV_TRANSITION_DURATION);
    };

    const toggleNav = () => {
      if (body.classList.contains("mobile-nav--is--visible")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    };

    // Keyboard support for toggle button (Enter/Space)
    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleNav();
      }
    };

    // Close nav on Escape key
    const handleEscape = (event) => {
      if (event.key === "Escape" && body.classList.contains("mobile-nav--is--visible")) {
        closeMobileNav();
        navButton.focus(); // Return focus to toggle button
      }
    };

    navButton.addEventListener("click", toggleNav);
    navButton.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      navButton.removeEventListener("click", toggleNav);
      navButton.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleEscape);
      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
      }
      // Clean up classes on unmount to prevent stale state
      body.classList.remove("mobile-nav--is--transitioning");
      body.classList.remove("mobile-nav--is--visible");
    };
  }, []);
}