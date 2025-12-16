"use client";

import { useEffect, useRef, useState } from "react";
import Time from "@/components/Time";
import TiltedCard from "@/components/TiltedCard";
import Footer from "@/components/Footer";
import TextEffect from "@/components/TextEffect";
import BookCTA from "@/components/BookCTA";
import CalendlyInline from "@/components/CalendlyInline";
import WiggleSvg from "@/components/WiggleSvg";

export default function Contact() {
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
            Lassen Sie uns sprechen —<br />unverbindlich und&nbsp;
            <TextEffect
              as="span"
              variant="underlineZigzag"
              trigger="visible"
              visibilityRootMargin="0px 0px -33%"
              className="inline-block"
            >
              kostenlos
            </TextEffect>
          </h2>
          <p className="hook__subtitle">
            In 20 Minuten klären wir, ob und wie ich Ihnen helfen kann. Keine Verkaufsgespräche, kein Druck — versprochen.
          </p>
          {/* <p className="hook__subtitle">
            30-Minuten-Video-Call via Google Meet · Vorbereitung inklusive Audit-Checkliste.
          </p>
          <BookCTA
            label="Jetzt Termin buchen"
            subline="Antwort binnen 24h – Slots Mo–Fr"
            size="lg"
          /> */}
        </div>

        <div className="image">
          <figure>
            <TiltedCard
              imageSrc="og-image.png"
              altText=""
              captionText="Feel free to get in touch"
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
          {/* <div className="text__cta">
            <p className="eyebrow">ready to grow your leads?</p>
            <h3>Termin vereinbaren & Klarheit gewinnen</h3>
            <p>
              Wir schauen gemeinsam auf Pipeline, Paid Media & Analytics und definieren konkrete
              Schritte für die nächsten 90 Tage.
            </p>
            <BookCTA
              label="Termin vereinbaren"
              subline="30 Min · Google Meet"
              size="lg"
              variant="secondary"
            />
          </div> */}

          <div>
            <p>phone</p>
            <p>+49 176 58238236</p>
          </div>
          <div>
            <p>email</p>
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
            <p>location</p>
            <p>mindener straße 87, 32479 hille germany</p>
          </div>
          <div>
            <p>working hours</p>
            <p>mon - fri: 9:00 — 18:00</p>
            <p>saturday: 9:00 — 15:00</p>
          </div>
          <div />
          <div>
            <p>local time</p>
            <Time />
          </div>
          <div className="actions">
            <p>rechtliches</p>
            <div>
              <TextEffect
                as="a"
                variant="ellipseAuto"
                href="/impressum"
                trigger="hover"
                className="inline-block"
                autoActive
              >
                impressum
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
                datenschutz
              </TextEffect>
            </div>
          </div>
          <div className="cta">
            <BookCTA label="... or just book a call" ctaLocation="contact" />
          </div>
        </div>

        {/* <div className="contact__calendly" ref={calendlyRef}>
          {shouldRenderCalendly ? (
            <CalendlyInline className="contact__calendly-widget" height={720} />
          ) : (
            <div className="calendly-inline-shell is-placeholder">
              <div className="calendly-inline-placeholder">
                <p>Kalender wird geladen …</p>
                <p>Slots und Zeitzonen werden vorbereitet.</p>
              </div>
            </div>
          )}
        </div> */}
      </div>
      <Footer />
    </section>
  );
}
