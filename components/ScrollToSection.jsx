const ScrollToSection = (id, event) => {
   event?.preventDefault();

   const element = document.getElementById(id);
   if (element) {
      const isLastSection = element === document.querySelector("section:last-of-type");
      const offsetAdjustment = isLastSection ? 0 : 120;
      const top = element.offsetTop - offsetAdjustment;
      window.scrollTo({ top, behavior: "smooth" });
   }
};

export default ScrollToSection;