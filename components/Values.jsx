"use client";

import HandwritingEffect from "@/components/HandwritingEffect";
import TextEffect from "@/components/TextEffect";
import LogoLoop from "@/components/LogoLoop";
import BookCTA from "@/components/BookCTA";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { SiCanva, SiAdobe, SiAdobecreativecloud, SiGoogleadsense, SiGoogleanalytics, SiGoogletagmanager, SiLooker, SiHubspot, SiLinkedin, SiMeta, SiMailchimp, SiSemrush } from "react-icons/si";

import Image from "next/image";

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

const toolItems = [
  {
    icon: "/assets/svg/app.svg",
    title: "google ads & analytics",
    description: "Google Ads, GA4, GTM, Keyword Planner are strong with performance-max and conversion tracking, enabling hyper-targeted campaigns and advanced performance tracking."
  },
  {
    icon: "/assets/svg/print.svg",
    title: "seo & geo",
    description: "On-page, tech, and content SEO using tools like Screaming Frog, Ahrefs, and SEMrush are strong with content briefs, clusters, and SERP intent drives long-term organic visibility."
  },
  {
    icon: "/assets/svg/identity.svg",
    title: "paid social",
    description: "Meta Ads Manager, Instagram, LinkedIn Campaign Manager are strong with aligning paid social strategy with funnel stage and creative testing builds awareness."
  },
  {
    icon: "/assets/svg/motion.svg",
    title: "crm & email marketing",
    description: "HubSpot, Mailchimp, Klaviyo are strong with built nurture flows, onboarding journeys, and integrated lead scoring into paid media workflows, streamlines lifecycle marketing."
  }
];

function ToolIcon({ src, title }) {
  return (
      <Image
        src={src}
        alt={title}
        width={150}
        height={40}
        priority
        className="tool-icon"
        draggable={false}
      />
  );
}

export default function Values() {
  return (
    <section className="section values" id="values">
      <div className="content">
        <div className="title">
          <h1>strategic</h1>
          <h1>performance</h1>
          {/* <HandwritingEffect
            as="h1"
            trigger="visible"
            visibilityRootMargin="0px 0px -33%"
            duration={2000}
            className=""
            letterSpacing={0}
          >
            humanity
          </HandwritingEffect> */}
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
        {/* <div className="values-cta">
          <BookCTA
            label="Kostenloses Erstgespräch sichern"
            subline="Gemeinsam definieren wir deinen Performance-Fahrplan"
            variant="secondary"
            size="lg"
          />
        </div> */}
        <div className="tools">
          <h3 className="title">
            core tools
          </h3>
          <div className="items">
            {toolItems.map((tool) => (
              <div className="item" key={tool.title}>
                <ToolIcon src={tool.icon} title={tool.title} />
                <div className="description">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
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
            logoHeight={50}
            gap={0}
            hoverSpeed={0}
            className="clients-cards-group"
            scaleOnHover
            fadeOut
            fadeOutColor="var(--color--background--100"
            ariaLabel="Technology partners"
            renderItem={(item, itemIndex) => {
              const rotationClass = itemIndex % 2 === 0 ? "r1" : "r2";
              return (
                <div
                  className={`client-card ${rotationClass}`}
                  key={itemIndex}
                  aria-label={item.title}
                  data-cursor="link">
                  <span className="client-logo" title={item.title}>
                    {item.node}
                  </span>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};
