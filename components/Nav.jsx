import useScrollToSection from "@/hooks/useScrollToSection";
import useActiveSection from "@/hooks/useActiveSection";

export default function Nav () {
  const scrollTo = useScrollToSection();
  const activeId = useActiveSection();

  const items = [
    { id: "intro", label: "Intro" },
    { id: "values", label: "Values" },
    { id: "background", label: "Background" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <nav className="app-nav">
      <div className="content">
        {items.map(({ id, label }) => (
          <div
            key={id}
            className={`item ${id} ${activeId === id ? "is--active" : ""}`}
            onClick={() => scrollTo(id)}
          >
            {label}
          </div>
        ))}
      </div>
    </nav>
  );
};