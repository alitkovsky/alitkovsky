import { useEffect } from "react";

export default function useMobileNav() {
  useEffect(() => {
    const navButton = document.querySelector(".option.navigation");
    const body = document.body;

    if (!navButton || !body) return;

    const openMobileNav = () => {
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
      body.classList.remove("mobile-nav--is--visible");
      // Optionally keep .mobile-nav--is--transitioning during fade out
    };

    const toggleNav = () => {
      if (body.classList.contains("mobile-nav--is--visible")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    };

    navButton.addEventListener("click", toggleNav);
    return () => navButton.removeEventListener("click", toggleNav);
  }, []);
};