export const MOBILE_NAV_TRANSITION_DURATION = 300;

const useScrollToSection = () => {
  return (id) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const body = document.body;
    if (body.classList.contains("mobile-nav--is--visible")) {
      body.classList.remove("mobile-nav--is--visible");
      body.classList.add("mobile-nav--is--transitioning");

      // Delay scroll until after nav transition ends (match CSS timing)
      setTimeout(() => {
        scroll();
        body.classList.remove("mobile-nav--is--transitioning");
      }, MOBILE_NAV_TRANSITION_DURATION); // Adjust delay to match nav animation duration
    } else {
      scroll();
    }
  };
};

export default useScrollToSection;
