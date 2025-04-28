import { useEffect } from "react";

export default function useTouchDetection() {
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    const html = document.documentElement;

    if (isTouch) {
      html.classList.add("touchevents");
      html.classList.remove("no-touchevents");
    } else {
      html.classList.add("no-touchevents");
      html.classList.remove("touchevents");
    }
  }, []);
};