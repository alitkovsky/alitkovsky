

import Link from "next/link";

const services = [
  {
    title: "Enterprise Software Development",
    href: "",
  },
  {
    title: "Mobile Applications",
    href: "",
  },
  {
    title: "SaaS Solutions",
    href: "",
  },
  {
    title: "Application Modernization",
    href: "",
  },
  {
    title: "API Integration",
    href: "",
  },
];

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="content">
        <div className="">
          <p>
            Technology that adapts to you, not the other way around. Because we believe every business is unique, just like its technological challenges. From strategy to optimization, I craft effective SEO solutions that boost your website's visibility.
          </p>
        </div>

        <ul className="service-grid">
          {services.map((service, index) => (
            <li key={service.title} className="service-item">
              <Link
                href={service.href}
                target="_blank"
                rel="noreferrer noopener"
                className="service-card"
              >
                <span className="index">{String(index + 1).padStart(2, "0")}</span>
                <p className="service-title">{service.title}</p>
                <span className="plus-button" aria-hidden="true">
                  <svg viewBox="0 0 14 14" className="plus-icon" role="presentation">
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}