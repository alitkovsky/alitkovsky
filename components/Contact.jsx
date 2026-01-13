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
      prefix: "lass uns quatschen —",
      underlineThin: "unverbindlich",
      underlineZigzag: "kostenlos",
      joiner: "und",
      subtitle: "in 20 minuten klären wir, ob und wie ich dir helfen kann. kein verkaufsgespräch, kein druck — versprochen.",
    },
    card: {
      caption: "meld dich einfach",
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
      label: "... oder buch dir direkt einen slot",
    },
  },
  en: {
    hook: {
      prefix: "let's chat —",
      underlineThin: "no strings",
      underlineZigzag: "free",
      joiner: "and",
      subtitle: "in 20 minutes we'll figure out if and how i can help. no sales pitch, no pressure — promised.",
    },
    card: {
      caption: "just reach out",
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
      label: "... or just grab a slot",
    },
  },
};

export default function Contact() {
  const { language } = useLanguage();
  const copy = CONTACT_COPY[language] ?? CONTACT_COPY.en;
  const fallbackCopy = CONTACT_COPY.en;

  const hook = copy.hook ?? fallbackCopy.hook;
  const cardCaption = copy.card?.caption ?? fallbackCopy.card?.caption ?? "";
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
            {hook.prefix}<br />
            <TextEffect
              as="span"
              variant="underlineThin"
              trigger="visible"
              visibilityRootMargin="0px 0px -25%"
              className="inline-block"
            >
              {hook.underlineThin}
            </TextEffect>
            &nbsp;{hook.joiner}&nbsp;
            <TextEffect
              as="span"
              variant="underlineZigzag"
              trigger="visible"
              visibilityRootMargin="0px 0px -25%"
              className="inline-block"
            >
              {hook.underlineZigzag}
            </TextEffect>
          </h2>
          <p className="hook__subtitle">
            {hook.subtitle}
          </p>
        </div>

        <div className="image">
          <figure>
            <TiltedCard
              imageSrc="og-image.webp"
              altText="Andrii Litkovskyi - Marketing Expert"
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
          <div>
            <p>{labels.workingHours}</p>
            <p>{values.workingHoursWeek}</p>
            <p>{values.workingHoursSat}</p>
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