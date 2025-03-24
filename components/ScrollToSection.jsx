"use client";

const ScrollToSection = (id, event) => {
   event?.preventDefault(); // prevent default behavior and rely only on the scrollTo function

   const element = document.getElementById(id);
   if (element) {
      const isLastSection = element === document.querySelector("section:last-of-type");
      const offsetAdjustment = isLastSection ? 0 : 10;
      const top = element.offsetTop - offsetAdjustment;
      setTimeout(() => {
         window.scrollTo({ top, behavior: "smooth" });
      }, 100); // delay to wait for layout stabilization
   }
};

export default ScrollToSection;