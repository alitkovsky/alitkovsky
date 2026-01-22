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
        description: "Dein CRM als Herzstück. Ich automatisiere Follow-ups, Lead-Verteilung und Sales-Prozesse, damit kein potenzieller Kunde durchs Raster fällt.",
        microResult: "0% lead-verlust",
        iconId: "crm-email-marketing",
        svg: "/assets/svg/crm-email-marketing.svg",
      },
      {
        id: "intelligence-hub",
        title: "the intelligence hub",
        description: "Tracking statt Raten. Mit Server-Side Tracking und Profit-Attribution mache ich sichtbar, welcher Euro wirklich Umsatz bringt.",
        microResult: "glasklare daten",
        iconId: "analytics",
        svg: "/assets/svg/analytics.svg",
      },
      {
        id: "growth-engine",
        title: "the growth engine",
        description: "Marketing auf Autopilot. Von profitablen Kampagnen bis zu automatisierten Kundenbindungs-Flows — das System skaliert dein Wachstum.",
        microResult: "skalierbarer umsatz",
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
        description: "Your CRM is the core. I automate follow-ups, lead routing, and sales loops so no potential client ever slips through the cracks.",
        microResult: "zero lead leakage",
        iconId: "crm-email-marketing",
        svg: "/assets/svg/crm-email-marketing.svg",
      },
      {
        id: "intelligence-hub",
        title: "the intelligence hub",
        description: "Tracking over guessing. With server-side tracking and profit-attribution, I reveal exactly which dollar drives actual revenue.",
        microResult: "crystal clear roi",
        iconId: "analytics",
        svg: "/assets/svg/analytics.svg",
      },
      {
        id: "growth-engine",
        title: "the growth engine",
        description: "Marketing on autopilot. From profitable campaigns to automated retention flows — the system scales your growth machine.",
        microResult: "scalable revenue",
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
                layout
                transition={{ duration: 0.3 }}
              >
                {tool.description}
              </motion.p>
              {tool.microResult && (
                <motion.p
                  className="micro-result"
                  layout
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