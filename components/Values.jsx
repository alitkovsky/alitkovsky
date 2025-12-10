"use client";

import TextEffect from "@/components/TextEffect";
import LogoLoop from "@/components/LogoLoop";
import BookCTA from "@/components/BookCTA";
import ToolList from "@/components/ToolList";
import WiggleSvg from "@/components/WiggleSvg";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { SiCanva, SiAdobe, SiAdobecreativecloud, SiGoogleadsense, SiGoogleanalytics, SiGoogletagmanager, SiLooker, SiHubspot, SiLinkedin, SiMeta, SiMailchimp, SiSemrush } from "react-icons/si";

import Link from "next/link";

const techLogos = [
  { node: <SiAdobe />, title: "Adobe", href: "/" },
  { node: <SiAdobecreativecloud />, title: "Adobe Creative Cloude", href: "/" },
  { node: <SiCanva />, title: "Canva", href: "/" },
  { node: <SiGoogleanalytics />, title: "Google Analytics", href: "/" },
  { node: <SiGoogleadsense />, title: "Google Adsense", href: "/" },
  { node: <SiGoogletagmanager />, title: "Google Tagmanager", href: "/" },
  { node: <SiLooker />, title: "Google Looker Studio", href: "/" },
  { node: <SiHubspot />, title: "Hubspot", href: "/" },
  { node: <SiLinkedin />, title: "Linkedin Campaign Manager", href: "/" },
  { node: <SiMeta />, title: "Meta Ads Manager", href: "/" },
  { node: <SiMailchimp />, title: "Mailchimp", href: "/" },
  { node: <SiSemrush />, title: "Semrush", href: "/" }
];

export default function Values() {
  return (
    <section className="section values" id="values">
      <div className="content">
        <div className="title">
          <h1>strategic</h1>
          <h1>performance</h1>
          <TextEffect
            as="h1"
            variant="ellipseBold"
            trigger="visible"
            visibilityRootMargin="0px 0px -33%"
            className="inline-block"
          >
            humanity
          </TextEffect>
          <h1>curious</h1>
        </div>
        <div className="main">
          <p className="description">
            I started my marketing journey in the hospitality industry — first creating campaigns for hotels, then evolving into a digital strategist for full-funnel performance. That hands-on foundation taught me to blend brand, business, and behavior into growth engines.<br />I've always been making things and inventing ways to improve my surroundings. Solving a tangible need with a beautiful solution is a practice I love and resides in my core. Collaborating with a team to create a far better outcome than otherwise possible alone gives me energy.
          </p>
        </div>
        <div className="tools">
          <h3 className="title">
            core tools
          </h3>
          <ToolList />
        </div>
        {/* <h3 className="subtitle">
          working with
        </h3> */}
        <div className="logos clients-cards-groups">
          <div className="gradient-mask left is--visible"></div>
          <div className="gradient-mask right is--visible"></div>
          <LogoLoop
            logos={techLogos}
            speed={30}
            direction="left"
            logoHeight={40}
            gap={0}
            hoverSpeed={0}
            className="clients-cards-group"
            scaleOnHover
            fadeOut
            fadeOutColor="var(--color--background--100"
            ariaLabel="Marketing tools"
            renderItem={(item, itemIndex) => {
              const rotationClass = itemIndex % 2 === 0 ? "r1" : "r2";
              return (
                <div
                  className={`client-card ${rotationClass}`}
                  key={itemIndex}
                  aria-label={item.title}
                  data-cursor="link">
                    <WiggleSvg
                      as="div"
                      trigger="visible"
                      rootMargin="0px 0px -33% 0px"
                      selector="self"
                      distance={0.75}
                      duration={0.9}
                    >
                      <span className="client-logo" title={item.title}>
                        {item.node}
                      </span>
                    </WiggleSvg>
                </div>
              );
            }}
          />
        </div>

        <div className="cta">
          <BookCTA label="book a free call to find out more" ctaLocation="values" />
        </div>
      </div>
    </section>
  );
};
