"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useScrollToSection from "@/hooks/useScrollToSection";
import useActiveSection from "@/hooks/useActiveSection";

import TextEffect from "@/components/TextEffect";

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
  const activeId = useActiveSection();
  const [theme, setTheme] = useState(initialTheme);
  const transitionTimeoutRef = useRef(null);

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

  const handleModeKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  };

  const items = [
    { id: "intro", label: "intro" },
    { id: "values", label: "values" },
    { id: "background", label: "background" },
    { id: "about", label: "about" },
    { id: "contact", label: "contact" }
  ];

  function NavItem({ id, label, isActive, onActivate }) {
    const lineEffect = useRef(null)
    const activationTimeout = useRef(null)

    useEffect(() => {
      const effect = lineEffect.current
      if (!effect) return

      if (activationTimeout.current) {
        clearTimeout(activationTimeout.current)
        activationTimeout.current = null
      }

      let raf

      const runWhenReady = (callback) => {
        if (!effect.ready) {
          raf = requestAnimationFrame(() => runWhenReady(callback))
          return
        }
        callback()
      }

      if (isActive) {
        activationTimeout.current = window.setTimeout(() => {
          runWhenReady(() => effect.animateIn?.())
        }, LINE_EFFECT_DELAY)
      } else {
        runWhenReady(() => effect.animateOut?.())
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
          className="inline-block pt-2"
        >
          <span className={cn("nav-link", { "is--active": isActive })}>{label}</span>
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
              onActivate={() => scrollTo(id)}
            />
          ))}

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
          <div className="language">
            <div className="active">en</div>
            <div>de</div>
          </div>
        </div>
      </div>
    </nav>
  );
};
