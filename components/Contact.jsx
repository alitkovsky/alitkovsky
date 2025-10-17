"use client";

import Time from "@/components/Time";
import TiltedCard from '@/components/TiltedCard';
import Footer from "@/components/Footer";

import TextEffect from "@/components/TextEffect";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="content">

        <div className="hook">
          <h2>I would love to hear from you,<br />let's work —&nbsp;
          <TextEffect
            as="span"
            variant="underlineZigzag"
            trigger="visible"
            visibilityRootMargin="0px 0px -33%"
            className="inline-block"
          >
            together
          </TextEffect></h2>
        </div>

        <div className="image">
          <figure>
            <TiltedCard
              imageSrc="og-image.png"
              altText=""
              captionText="Feel free to get in touch"
              containerWidth="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
            />
          </figure>
        </div>

        <div className="text">
          <div>
            <p>phone</p>
            <p>+49 176 58238236</p>
          </div>
          <div>
            <p>email</p>
            <p>alitkovsky@me.com</p>
          </div>
          <div>
            <p>location</p>
            <p>mindener straße 87, 32479 hille germany</p>
          </div>
          <div>
            <p>working hours</p>
            <p>mon - fri: 9:00 — 19:00</p>
            <p>saturday: 9:00 — 17:00</p>
          </div>
          <div></div>
          <div>
            <p>local time</p>
            <Time />
          </div>
          <div></div>
        </div>

        <div className="actions">
          <div className="item">
          <TextEffect
            as="a"
            variant="ellipseAuto"
            href="/"
            trigger="hover"
            className="inline-block"
          >
            LinkedIn
          </TextEffect>
          </div>
        </div>

      </div>
      <Footer />
    </section>
  );
};