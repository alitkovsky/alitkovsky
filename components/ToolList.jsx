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
      "google ads, GA4 and GTM",
      "performance conversion tracking",
      "hyper-targeted campaigns"
    ],
  },
  {
    title: "seo & geo",
    href: "",
    iconId: "seo",
    svg: "/assets/svg/seo.svg",
    bullets: [
      "on-page, tech, and content SEO",
      "comprehensive ongoing analysis",
      "long-term organic visibility"
    ],
  },
  {
    title: "paid social",
    href: "",
    iconId: "paid-social",
    svg: "/assets/svg/paid-social.svg",
    bullets: [
      "meta ads manager",
      "linkedIn campaign manager",
      "funnel stage and creative testing"
    ],
  },
  {
    title: "crm & email marketing",
    href: "",
    iconId: "crm-email-marketing",
    svg: "/assets/svg/crm-email-marketing.svg",
    bullets: [
      "hubspot, mailchimp, klaviyo",
      "nurture flows",
      "onboarding journeys"
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
    let rafId = null;
    let debounceId = null;

    const readColor = () => {
      if (typeof window === "undefined") return;
      const target = containerRef.current || document.body || document.documentElement;
      const color = getComputedStyle(target)
        .getPropertyValue("--color--foreground--100")
        .trim();
      if (color) {
        setIconColor(color);
      }
    };

    const updateColorNow = () => {
      if (debounceId) {
        clearTimeout(debounceId);
        debounceId = null;
      }
      readColor();
    };

    const scheduleUpdate = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateColorNow);
    };

    const scheduleDebounced = () => {
      if (debounceId) {
        clearTimeout(debounceId);
      }
      debounceId = setTimeout(updateColorNow, 50);
    };

    scheduleUpdate();

    // Listen for theme changes on both html and body
    const observer = new MutationObserver(() => {
      scheduleDebounced();
    });
    const targets = [document.documentElement, document.body].filter(Boolean);
    targets.forEach((el) =>
      observer.observe(el, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "style"],
      })
    );

    // Also respond to system theme changes
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    media?.addEventListener?.("change", scheduleUpdate);

    // Re-check on focus/hover events similar to TextEffect
    const colorEvents = ["focus", "blur", "pointerdown", "pointerup", "mouseenter", "mouseleave"];
    colorEvents.forEach((eventName) => {
      document.addEventListener(eventName, scheduleUpdate, { capture: true, passive: true });
    });

    return () => {
      observer.disconnect();
      media?.removeEventListener?.("change", scheduleUpdate);
      if (rafId) cancelAnimationFrame(rafId);
      if (debounceId) clearTimeout(debounceId);
      colorEvents.forEach((eventName) => {
        document.removeEventListener(eventName, scheduleUpdate, { capture: true });
      });
    };
  }, [containerRef]);

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
                  visibilityRootMargin="0px 0px -20%"
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
