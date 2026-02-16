"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ToolIcon3D from "@/components/ToolIcon3D";
import useToolList from "@/hooks/useToolList";

import useLanguage from "@/hooks/useLanguage";

const TOOLS_COPY = {
  de: {
    tools: [
      {
        id: "control-center",
        title: "the control center",
        description: "CRM als zentrale Arbeitsoberflaeche: Ich strukturiere Lead-Routing, Follow-ups und Dokumentation, damit Anfragen verbindlich bearbeitet werden.",
        microResult: "saubere uebergaben",
        iconId: "crm-email-marketing",
        svg: "/assets/svg/crm-email-marketing.svg",
      },
      {
        id: "intelligence-hub",
        title: "the intelligence hub",
        description: "Tracking und Reporting ohne Blindflug: Ich mache sichtbar, welcher Kanal, welcher Schritt und welcher Prozessbeitrag wirklich wirkt.",
        microResult: "belastbare daten",
        iconId: "analytics",
        svg: "/assets/svg/analytics.svg",
      },
      {
        id: "growth-engine",
        title: "the growth engine",
        description: "Wiederkehrende Routine automatisieren: von Status-Updates bis Kundenkommunikation, damit Teams mehr Zeit fuer Prioritaeten haben.",
        microResult: "weniger manuelle routine",
        iconId: "paid-social",
        svg: "/assets/svg/paid-social.svg",
      },
    ],
  },
  en: {
    tools: [
      {
        id: "control-center",
        title: "the control center",
        description: "CRM as the operational core: I structure lead routing, follow-ups, and documentation so requests are handled consistently.",
        microResult: "clean handoffs",
        iconId: "crm-email-marketing",
        svg: "/assets/svg/crm-email-marketing.svg",
      },
      {
        id: "intelligence-hub",
        title: "the intelligence hub",
        description: "Tracking and reporting without guesswork: I make clear which channel, step, and process contribution actually perform.",
        microResult: "decision-ready data",
        iconId: "analytics",
        svg: "/assets/svg/analytics.svg",
      },
      {
        id: "growth-engine",
        title: "the growth engine",
        description: "Automate recurring routine work: from status updates to customer communication, so teams can focus on priorities.",
        microResult: "less manual routine",
        iconId: "paid-social",
        svg: "/assets/svg/paid-social.svg",
      },
    ],
  },
};

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
  const { language } = useLanguage();
  const copy = TOOLS_COPY[language] ?? TOOLS_COPY.en;
  const fallbackCopy = TOOLS_COPY.en;
  const tools = copy.tools ?? fallbackCopy.tools ?? {};

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

    return () => {
      observer.disconnect();
      media?.removeEventListener?.("change", scheduleUpdate);
      if (rafId) cancelAnimationFrame(rafId);
      if (debounceId) clearTimeout(debounceId);
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
            className={`item ${active === idx ? "is-active" : ""} ${active !== idx ? "mobile-inactive" : ""
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
              <motion.p
                transition={{ duration: 0.3 }}
              >
                {tool.description}
              </motion.p>
              {tool.microResult && (
                <motion.p
                  className="micro-result"
                  transition={{ duration: 0.3 }}
                >
                  {tool.microResult}
                </motion.p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
