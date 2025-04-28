import { useEffect } from "react";

export default function useInitialPageLoad() {

  // Prevent browser from auto-scrolling after reload.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Hide splash cover after a short delay.
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.classList.remove("cover--is--visible");
    }, 1750);
    return () => clearTimeout(timeout);
  }, []);

  // Remove loading class after full load and delay.
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.classList.remove("is--loading");
    }, 3250);
    return () => clearTimeout(timeout);
  }, []);
};