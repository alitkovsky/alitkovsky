import { useEffect } from "react";

export default function useGridToggle() {
  useEffect(() => {
    const toggle = document.querySelector(".option.grid");
    const overlay = document.querySelector(".app-grid-overlay");

    if (!toggle || !overlay) return;

    const handleClick = () => {
      overlay.classList.toggle("is--visible");
    };

    toggle.addEventListener("click", handleClick);
    return () => toggle.removeEventListener("click", handleClick);
  }, []);
};