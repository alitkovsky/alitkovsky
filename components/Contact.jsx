"use client";

import { useEffect, useRef, useState } from "react";
import Time from "@/components/Time";
import TiltedCard from "@/components/TiltedCard";
import Footer from "@/components/Footer";
import TextEffect from "@/components/TextEffect";
import BookCTA from "@/components/BookCTA";

import useLanguage from "@/hooks/useLanguage";

const CONTACT_COPY = {
  de: {
    hook: {
      prefix: "bereit für ein update? nämlich, ",
      underlineThin: "system-audit",
      underlineZigzag: "kostenloses",
      joiner: "und",
      subtitle: "ich prüfe deinen aktuellen status quo. in 20 minuten finden wir heraus, wo dein system sand im getriebe hat. kein verkaufsgespräch.",
    },
    card: {
      caption: "einfach melden",
      alt: "Portrait Andrii Litkovskyi - Marketing Systems Architect",
    },
    labels: {
      phone: "handy",
      email: "email",
      location: "standort",
      workingHours: "arbeitszeiten",
      localTime: "lokalzeit",
      legal: "rechtliches",
    },
    values: {
      location: "mindener straße 87, 32479 hille",
      workingHoursWeek: "mo - fr: 9:00 — 18:00",
      workingHoursSat: "sa: 9:00 — 15:00",
    },
    links: {
      imprint: "impressum",
      privacy: "datenschutz",
    },
    cta: {
      label: "... oder buch dir deinen audit slot",
    },
  },
  en: {
    hook: {
      prefix: "ready for an upgrade? namely, ",
      underlineThin: "system audit",
      underlineZigzag: "free",
      joiner: "and",
      subtitle: "i audit your current status quo. in 20 minutes we find out where your system is losing efficiency. no sales pitch.",
    },
    card: {
      caption: "just reach out",
      alt: "Portrait Andrii Litkovskyi - Marketing Systems Architect",
    },
    labels: {
      phone: "phone",
      email: "email",
      location: "location",
      workingHours: "hours",
      localTime: "local time",
      legal: "legal",
    },
    values: {
      location: "mindener straße 87, 32479 hille, germany",
      workingHoursWeek: "mon - fri: 9:00 — 18:00",
      workingHoursSat: "sat: 9:00 — 15:00",
    },
    links: {
      imprint: "imprint",
      privacy: "privacy",
    },
    cta: {
      label: "... or book your audit slot",
    },
  },
};

export default function Contact() {
  const { language } = useLanguage();
  const copy = CONTACT_COPY[language] ?? CONTACT_COPY.en;
  const fallbackCopy = CONTACT_COPY.en;

  const hook = copy.hook ?? fallbackCopy.hook;
  const cardCaption = copy.card?.caption ?? fallbackCopy.card?.caption ?? "";
  const cardAlt = copy.card?.alt ?? fallbackCopy.card?.alt ?? "";
  const labels = copy.labels ?? fallbackCopy.labels;
  const values = copy.values ?? fallbackCopy.values;
  const links = copy.links ?? fallbackCopy.links;
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "... or just book a call";

  const [shouldRenderCalendly, setShouldRenderCalendly] = useState(false);
  const calendlyRef = useRef(null);

  useEffect(() => {
    if (shouldRenderCalendly || typeof window === "undefined") {
      return;
    }

    const node = calendlyRef.current;

    if (!node) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldRenderCalendly(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRenderCalendly(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [shouldRenderCalendly]);

  return (
    <section className="section contact" id="contact">
      <div className="content">
        <div className="hook">
          <h2>
            {hook.prefix}
            {/* <TextEffect
              as="span"
              variant="underlineThin"
              trigger="visible"
              visibilityRootMargin="0px 0px -25%"
              className="inline-block"
            >
              {hook.underlineThin}
            </TextEffect>
            &nbsp;{hook.joiner}&nbsp; */}
            <TextEffect
              as="span"
              variant="underlineZigzag"
              trigger="visible"
              visibilityRootMargin="0px 0px -25%"
              className="inline-block"
            >
              {hook.underlineZigzag}
            </TextEffect>
            {" "}
            {hook.underlineThin}
          </h2>
          <p className="hook__subtitle">
            {hook.subtitle}
          </p>
        </div>

        <div className="image">
          <figure>
            <TiltedCard
              imageSrc="og-image.webp"
              altText={cardAlt}
              captionText={cardCaption}
              containerWidth="100%"
              containerHeight="100%"
              imageWidth="100%"
              imageHeight="100%"
              rotateAmplitude={12}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent
            />
          </figure>
        </div>

        <div className="text">
          <div>
            <p>{labels.phone}</p>
            <p>+49 176 58238236</p>
          </div>
          <div>
            <p>{labels.email}</p>
            <p>
              <TextEffect
                as="a"
                variant="ellipseAuto"
                href="mailto:andrii@litkovskyi.de"
                trigger="hover"
                openInNewTab
                className="inline-block"
              >
                andrii@litkovskyi.de
              </TextEffect>
            </p>
          </div>
          <div>
            <p>{labels.location}</p>
            <p>{values.location}</p>
          </div>
          <div />
          <div>
            <p>{labels.localTime}</p>
            <Time />
          </div>
          <div className="actions">
            <p>{labels.legal}</p>
            <div>
              <TextEffect
                as="a"
                variant="ellipseAuto"
                href="/impressum"
                trigger="hover"
                className="inline-block"
                autoActive
              >
                {links.imprint}
              </TextEffect>
            </div>
            <div>
              <TextEffect
                as="a"
                variant="ellipseAuto"
                href="/datenschutz"
                trigger="hover"
                className="inline-block"
                autoActive
              >
                {links.privacy}
              </TextEffect>
            </div>
          </div>
          <div className="actions" role="group" aria-label="Social media links">
            <TextEffect
              as="a"
              variant="ellipseAuto"
              href="https://www.linkedin.com/in/andrii-litkovskyi/"
              trigger="hover"
              openInNewTab
              className="inline-block"
              aria-label="LinkedIn profile"
            >
              Li
            </TextEffect>
            {/* <TextEffect
              as="a"
              variant="ellipseAuto"
              href="https://www.instagram.com/litkovskyi/"
              trigger="hover"
              openInNewTab
              className="inline-block ml-4"
              aria-label="Instagram profile"
            >
              In
            </TextEffect> */}
            <TextEffect
              as="a"
              variant="ellipseAuto"
              href="https://www.upwork.com/freelancers/~01fc21565de40bab50"
              trigger="hover"
              openInNewTab
              className="inline-block ml-4"
              aria-label="Upwork profile"
            >
              Up
            </TextEffect>
            <TextEffect
              as="a"
              variant="ellipseAuto"
              href="https://github.com/alitkovsky"
              trigger="hover"
              openInNewTab
              className="inline-block ml-4"
              aria-label="GitHub profile"
            >
              Gh
            </TextEffect>
          </div>
          <div className="cta">
            <BookCTA label={ctaLabel} ctaLocation="contact" />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}