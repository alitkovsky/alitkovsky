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
        title: "paid social",
        href: "",
        iconId: "paid-social",
        svg: "/assets/svg/paid-social.svg",
        description: "ich schalte und optimiere anzeigen auf meta und linkedin — damit du die richtigen leute erreichst und nicht dein budget verbrennst.",
        microResult: "als Ergebnis: 2-3x mehr anfragen bei gleichem budget",
      },
      {
        title: "seo & local seo",
        href: "",
        iconId: "seo",
        svg: "/assets/svg/seo.svg",
        description: "ich sorge dafür, dass deine website bei google gefunden wird — technisch sauber, inhaltlich relevant, lokal sichtbar.",
        microResult: "als Ergebnis: +50% organische sichtbarkeit in 6 monaten",
      },
      {
        title: "web analytics",
        href: "",
        iconId: "analytics",
        svg: "/assets/svg/analytics.svg",
        description: "ga4, tag manager, dashboards — ich zeige dir, was funktioniert und was nicht. keine bauchgefühle, sondern zahlen.",
        microResult: "als Ergebnis: klare datenbasis für bessere entscheidungen",
      },
      {
        title: "crm & automatisierung",
        href: "",
        iconId: "crm-email-marketing",
        svg: "/assets/svg/crm-email-marketing.svg",
        description: "hubspot, mailchimp, automatisierte workflows — damit aus leads kunden werden, ohne dass du jeden manuell nachfassen musst.",
        microResult: "als Ergebnis: 30% weniger manuelle arbeit, mehr abschlüsse",
      },
      // {
      //   title: "landing pages & cro",
      //   href: "",
      //   iconId: "landing-pages",
      //   svg: "/assets/svg/landing-pages.svg",
      //   description: "ich baue landing pages, die konvertieren — klare struktur, überzeugende texte, optimiert für mehr anfragen und weniger absprünge.",
      //   microResult: "als Ergebnis: +40% conversion rate",
      // }
    ]
  },
  en: {
    tools: [
      {
        title: "paid social",
        href: "",
        iconId: "paid-social",
        svg: "/assets/svg/paid-social.svg",
        description: "i run and optimize ads on meta and linkedin — so you reach the right people without burning your budget.",
        microResult: "as a result: 2-3x more inquiries at the same budget",
      },
      {
        title: "seo & local seo",
        href: "",
        iconId: "seo",
        svg: "/assets/svg/seo.svg",
        description: "i make sure your website gets found on google — technically sound, content-relevant, locally visible.",
        microResult: "as a result: +50% organic visibility in 6 months",
      },
      {
        title: "web analytics",
        href: "",
        iconId: "analytics",
        svg: "/assets/svg/analytics.svg",
        description: "ga4, tag manager, dashboards — i show you what works and what doesn't. no gut feelings, just data.",
        microResult: "as a result: clear data foundation for better decisions",
      },
      {
        title: "crm & automatisierung",
        href: "",
        iconId: "crm-email-marketing",
        svg: "/assets/svg/crm-email-marketing.svg",
        description: "hubspot, mailchimp, automated workflows — turning leads into customers without manual follow-ups.",
        microResult: "as a result: 30% less manual work, more closes",
      },
      // {
      //   title: "landing pages & cro",
      //   href: "",
      //   iconId: "landing-pages",
      //   svg: "/assets/svg/landing-pages.svg",
      //   description: "i build landing pages that convert — clear structure, compelling copy, optimized for more leads and fewer bounces.",
      //   microResult: "as a result: +40% conversion rate",
      // }
    ]
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