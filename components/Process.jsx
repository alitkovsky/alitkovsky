const cards = [
  {
    title: "Anfrage & Kontakt",
    href: "",
    description: "",
  },
  {
    title: "Persönliches Gespräch",
    href: "",
    description: "",
  },
  {
    title: "Analyse",
    href: "",
    description: "",
  },
  {
    title: "Angebot Erstellung",
    href: "",
    description: "",
  },
  {
    title: "Umsetzung, Wartung und Reporting",
    href: "",
    description: "",
  },
];

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="content">
        <div className="title">
          <p>
            technology that adapts to you, not the other way around. Because we believe every business is unique, just like its technological challenges. From strategy to optimization, I craft effective SEO solutions that boost your website's visibility.
          </p>
        </div>

        <div className="cards">

          {cards.map((card, index) => (
            <div key={card.title} className="card">
              <div className="index">
                <p className="title">{String(index + 1).padStart(2, "0")}</p>
                <i aria-hidden className="plus-icon">+</i>
              </div>

              <p className="stage">{card.title}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};