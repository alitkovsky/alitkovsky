import { useEffect } from "react";

export default function useIntroSwitcher() {
  useEffect(() => {
    const options = document.querySelectorAll(".section.intro .option");
    const texts = document.querySelectorAll(".section.intro .text");

    if (!options.length || !texts.length) return;

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const key = option.classList[1];

        options.forEach((opt) => opt.classList.remove("is--active"));
        option.classList.add("is--active");

        texts.forEach((text) => {
          text.classList.toggle("is--visible", text.classList.contains(key));
        });
      });
    });

    return () => {
      options.forEach((option) => {
        option.removeEventListener("click", () => {});
      });
    };
  }, []);
};