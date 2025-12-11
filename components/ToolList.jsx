"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ToolIcon3D from "@/components/ToolIcon3D";
import useToolList from "@/hooks/useToolList";

const tools = [
  {
    title: "google ads & analytics",
    href: "",
    iconId: "analytics",
    svg: "/assets/svg/analytics.svg",
    bullets: [
      "Google Ads, GA4 and GTM",
      "Performance conversion tracking",
      "Hyper-targeted campaigns"
    ],
  },
  {
    title: "seo & geo",
    href: "",
    iconId: "seo",
    svg: "/assets/svg/seo.svg",
    bullets: [
      "On-page, tech, and content SEO",
      "Comprehensive ongoing analysis",
      "Long-term organic visibility"
    ],
  },
  {
    title: "paid social",
    href: "",
    iconId: "paid-social",
    svg: "/assets/svg/paid-social.svg",
    bullets: [
      "Meta Ads Manager",
      "LinkedIn Campaign Manager",
      "Funnel stage and creative testing"
    ],
  },
  {
    title: "crm & email marketing",
    href: "",
    iconId: "crm-email-marketing",
    svg: "/assets/svg/crm-email-marketing.svg",
    bullets: [
      "HubSpot, Mailchimp, Klaviyo",
      "Nurture flows",
      "Onboarding journeys"
    ],
  }
];

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function ToolList() {
  const { active, setActive, containerRef, itemRefs } = useToolList(tools, { initialActive: 0 });
  const [iconColor, setIconColor] = useState("#131313");

  // Read CSS variable for icon color
  useEffect(() => {
    const updateColor = () => {
      if (typeof window !== "undefined") {
        const color = getComputedStyle(document.documentElement)
          .getPropertyValue("--color--foreground--100")
          .trim();
        if (color) {
          setIconColor(color);
        }
      }
    };

    updateColor();

    // Listen for theme changes
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="tool-list"
        ref={containerRef}
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.title}
            variants={itemVariants}
            className={`item ${active === idx ? "is-active" : ""} ${
              active !== idx ? "mobile-inactive" : ""
            }`}
            ref={(el) => (itemRefs.current[idx] = el)}
            onMouseEnter={() => setActive(idx)}
            onFocus={() => setActive(idx)}
            onMouseLeave={() => setActive(null)}
            onBlur={() => setActive(null)}
          >
              <div className="icon">
                <ToolIcon3D
                  icon={tool.iconId}
                  svgSrc={tool.svg}
                  title={tool.title}
                  color={iconColor}
                  thickness={1.5}
                  mode="contain"
                  lookAtMouse={false}
                  trigger="visible"
                  visibilityRootMargin="0px 0px -33%"
                  isActive={active === idx}
                />
              </div>
              <div className="description">
                <h3>{tool.title}</h3>
                <motion.ul
                  layout
                  transition={{ duration: 0.3 }}
                >
                  {tool.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </motion.ul>
              </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
