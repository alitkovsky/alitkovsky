"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useScrollToSection, { MOBILE_NAV_TRANSITION_DURATION } from "@/hooks/useScrollToSection";
import useActiveSection from "@/hooks/useActiveSection";
import Link from "next/link";

import TextEffect from "@/components/TextEffect";
import BookCTA from "@/components/BookCTA";
import useLanguage from "@/hooks/useLanguage";

const THEME_STORAGE_KEY = "nav-theme";
const THEME_COOKIE_KEY = "nav-theme";
const THEME_TRANSITION_DURATION = 450;
const LINE_EFFECT_DELAY = 300;

const readStoredTheme = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    // localStorage unavailable, ignore and fall back
  }

  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") {
    return attr;
  }

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (error) {
    return "dark";
  }
};

export default function Nav({ initialTheme = "dark" }) {
  const scrollTo = useScrollToSection();
  const router = useRouter();
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";
  const activeId = useActiveSection({ enabled: isHomeRoute });
  const [theme, setTheme] = useState(initialTheme);
  const transitionTimeoutRef = useRef(null);
  const { language, setLanguage, supportedLanguages } = useLanguage();

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const { body, documentElement } = document;
    body.classList.toggle("theme-dark", theme === "dark");
    body.classList.toggle("theme-light", theme === "light");

    documentElement.dataset.theme = theme;
    documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Ignore write errors (e.g. private mode)
    }

    const maxAge = 60 * 60 * 24 * 365; // one year
    document.cookie = `${THEME_COOKIE_KEY}=${theme};path=/;max-age=${maxAge};SameSite=Lax`;
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const stored = readStoredTheme();
    if (stored) {
      setTheme((current) => (current === stored ? current : stored));
    }

    const handleStorage = (event) => {
      if (event.key === THEME_STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      if (typeof document !== "undefined") {
        document.body.classList.remove("theme-transition");
      }
    };
  }, []);

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      const { body } = document;
      body.classList.add("theme-transition");
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = window.setTimeout(() => {
        body.classList.remove("theme-transition");
      }, THEME_TRANSITION_DURATION);
    }

    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const closeMobileNavIfNeeded = (callback) => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      callback?.();
      return;
    }

    const { body } = document;

    if (!body.classList.contains("mobile-nav--is--visible")) {
      callback?.();
      return;
    }

    body.classList.remove("mobile-nav--is--visible");
    body.classList.add("mobile-nav--is--transitioning");

    window.setTimeout(() => {
      callback?.();
      body.classList.remove("mobile-nav--is--transitioning");
    }, MOBILE_NAV_TRANSITION_DURATION);
  };

  const handleSectionRequest = (id) => {
    if (isHomeRoute) {
      scrollTo(id);
      return;
    }

    closeMobileNavIfNeeded(() => {
      router.push(`/#${id}`);
    });
  };

  const handleModeKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  };

  const items = [
    { id: "intro", label: "intro" },
    { id: "values", label: "values" },
    // { id: "process", label: "process" },
    // { id: "services", label: "services" },
    // { id: "cases", label: "cases" },
    { id: "background", label: "background" },
    { id: "expertise", label: "expertise" },
    { id: "contact", label: "contact" }
  ];

  const subItems = [
    { id: "cases", label: "cases", route: "/cases" },
    { id: "about", label: "about", route: "/about" }
  ];

  const languages = supportedLanguages ?? ["en", "de"];

  function NavItem({ id, label, isActive, onActivate }) {
    const lineEffect = useRef(null)
    const activationTimeout = useRef(null)

    useEffect(() => {
      const getEffect = () => lineEffect.current
      if (!getEffect()) return

      if (activationTimeout.current) {
        clearTimeout(activationTimeout.current)
        activationTimeout.current = null
      }

      let raf

      const runWhenReady = (callback) => {
        const instance = getEffect()
        if (!instance) {
          return
        }
        if (!instance.ready) {
          raf = requestAnimationFrame(() => runWhenReady(callback))
          return
        }
        callback(instance)
      }

      if (isActive) {
        // Wait for previous item to animate out (300ms) plus delay (300ms) = 600ms total
        activationTimeout.current = window.setTimeout(() => {
          runWhenReady((instance) => instance.animateIn?.())
        }, LINE_EFFECT_DELAY * 2)
      } else {
        // Add delay before animating out
        activationTimeout.current = window.setTimeout(() => {
          runWhenReady((instance) => instance.animateOut?.())
        }, LINE_EFFECT_DELAY)
      }

      return () => {
        if (raf) cancelAnimationFrame(raf)
        if (activationTimeout.current) {
          clearTimeout(activationTimeout.current)
          activationTimeout.current = null
        }
      }
    }, [isActive])

    const handleActivate = (event) => {
      event?.preventDefault()
      onActivate?.()
    }

    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onActivate?.()
      }
    }

    return (
      <div
        className={cn("item", id, { "is--active": isActive })}
        role="button"
        tabIndex={0}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
      >
        <TextEffect
          as="span"
          variant="ellipseAuto"
          trigger="hover"
          active={isActive}
          activeVariant="linethrough"
          activeTrigger="manual"
          activeDelay={LINE_EFFECT_DELAY}
          effectRef={lineEffect}
          className="inline-block"
        >
          <span className={cn("nav-link", { "is--active": isActive })}>{label}</span>
        </TextEffect>
      </div>
    )
  }

  function SubNavItem({ id, label, route, isActive, onActivate }) {
    const lineEffect = useRef(null)
    const activationTimeout = useRef(null)

    useEffect(() => {
      const getEffect = () => lineEffect.current
      if (!getEffect()) return

      if (activationTimeout.current) {
        clearTimeout(activationTimeout.current)
        activationTimeout.current = null
      }

      let raf

      const runWhenReady = (callback) => {
        const instance = getEffect()
        if (!instance) {
          return
        }
        if (!instance.ready) {
          raf = requestAnimationFrame(() => runWhenReady(callback))
          return
        }
        callback(instance)
      }

      if (isActive) {
        // Wait for previous item to animate out (300ms) plus delay (300ms) = 600ms total
        activationTimeout.current = window.setTimeout(() => {
          runWhenReady((instance) => instance.animateIn?.())
        }, LINE_EFFECT_DELAY * 2)
      } else {
        // Add delay before animating out
        activationTimeout.current = window.setTimeout(() => {
          runWhenReady((instance) => instance.animateOut?.())
        }, LINE_EFFECT_DELAY)
      }

      return () => {
        if (raf) cancelAnimationFrame(raf)
        if (activationTimeout.current) {
          clearTimeout(activationTimeout.current)
          activationTimeout.current = null
        }
      }
    }, [isActive])

    const handleActivate = (event) => {
      event?.preventDefault()
      onActivate?.()
    }

    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onActivate?.()
      }
    }

    return (
      <div
        className={cn("item", id, { "is--active": isActive })}
        role="button"
        tabIndex={0}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
      >
        <TextEffect
          as="span"
          variant="ellipseAuto"
          trigger="hover"
          active={isActive}
          activeVariant="linethrough"
          activeTrigger="manual"
          activeDelay={LINE_EFFECT_DELAY}
          effectRef={lineEffect}
          className="inline-block"
        >
          <Link href={route} className={cn("nav-link", { "is--active": isActive })}>{label}</Link>
        </TextEffect>
      </div>
    )
  }

  return (
    <nav className="app-nav">
      <div className="content">
        <div className="flex flex-col">
          {items.map(({ id, label }) => (
            <NavItem
              key={id}
              id={id}
              label={label}
              isActive={activeId === id}
              onActivate={() => handleSectionRequest(id)}
            />
          ))}

          {/* <TextEffect
          as="div"
          variant="linethrough"
          trigger="visible"
          className="inline-block w-[40%] my-6"
        ></TextEffect>

          {subItems.map(({ id, label, route }) => (
            <SubNavItem
              key={id}
              id={id}
              label={label}
              route={route}
              isActive={activeId === id}
              onActivate={() => handleSectionRequest(id)}
            />
          ))} */}
        </div>
        <div className="toggles">
          <div
            className="mode"
            role="button"
            tabIndex={0}
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
            onKeyDown={handleModeKeyDown}
            data-mode={theme}
            aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
          >
            <span className="mode-label mode-label--light">
              day mode
            </span>
            <span className="mode-label mode-label--dark">
              night mode
            </span>
          </div>
          <div className="language" role="group" aria-label="Language">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                className={cn({ active: language === lang })}
                aria-pressed={language === lang}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        {/* <div className="nav-cta">
          <BookCTA
            label="Termin vereinbaren"
            subline="30 Min · Google Meet"
            size="sm"
            variant="secondary"
            fullWidth
            align="center"
          />
        </div> */}
      </div>
    </nav>
  );
};
