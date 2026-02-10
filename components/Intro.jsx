"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import useLanguage from "@/hooks/useLanguage";
import TextEffect from "@/components/TextEffect";
import BookCTA from "@/components/BookCTA";

const SMALL_TEXT_EFFECT_QUERY = "(max-width: 63.75rem)"; // 1020px

const INTRO_EFFECT_STYLE_PRESETS = Object.freeze({
  greetingDashed: Object.freeze({
    top: "-0.68em",
    right: "-1em",
    width: "auto",
    height: "2em",
    left: "-0.85ch",
  }),
  adsDashed: Object.freeze({
    top: "-0.52em",
    right: "-0.5em",
    width: "auto",
    height: "2em",
    left: "auto",
  }),
  accountArrowDesktop: Object.freeze({
    top: "-0.55em",
    right: "-11.5ch",
    width: "12.25ch",
    height: "1.5ch",
    left: "auto",
  }),
  accountArrowCompact: Object.freeze({
    top: "auto",
    bottom: "-0.2em",
    right: "auto",
    width: "auto",
    height: "auto",
    left: "0",
  }),
  distributeArrow: Object.freeze({
    top: "0.4em",
    width: "4ch",
    height: "auto",
    transform: "translateY(-50%)",
  }),
});

function subscribeToMediaQuery(query, onStoreChange) {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia(query);
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onStoreChange);

    return () => {
      mediaQuery.removeEventListener("change", onStoreChange);
    };
  }

  mediaQuery.addListener(onStoreChange);
  return () => {
    mediaQuery.removeListener(onStoreChange);
  };
}

function getMediaQuerySnapshot(query, fallback) {
  if (typeof window === "undefined") return fallback;
  return window.matchMedia(query).matches;
}

function useMediaQuery(query, fallback = false) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeToMediaQuery(query, onStoreChange),
    () => getMediaQuerySnapshot(query, fallback),
    () => fallback,
  );
}

const INTRO_COPY = {
  de: {
    sectionTitle: "diagnose & lösungen",
    options: {
      general: "start hier",
      "control-center": "leads gehen verloren?",
      "intelligence-hub": "daten-blindflug?",
      "growth-engine": "marketing-hamsterrad?",
    },
    cta: {
      label: "lass uns quatschen",
    },
    scroll: ["muss ich dich wirklich", "ans scrollen erinnern?"],
    textEffectWiggle: true,
    texts: {
      general: [
        [
          {
            text: "tach!",
            // effect: "dashedSideLeft",
            // counterEffectOverrides: {
            //   style: {
            //     ...INTRO_EFFECT_STYLE_PRESETS.greetingDashed,
            //   },
            // }
          },
          { text: " ich bin andrii. ich baue " },
          {
            text: "nicht",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "nur",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "kampagnen",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ", ich installiere " },
          {
            text: "systeme",
            effect: "highlight",
          },
          { text: ". marketing-systeme, die dir den rücken freihalten und messbar mehr" },
          { text: " " },
          { text: "gewinn",
            effect: "highlight",
           },
          { text: " " },
          { text: "bringen. kein" },
          { text: " " },
          {
            text: "'hoffen",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " ", },
          {
            text: " und ",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " ", },
          {
            text: "bangen'",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ", sondern " },
          {
            text: "infrastruktur",
            effect: "underlineThin",
            counterEffectOverrides: {}
          },
          { text: "." }
        ],
        [
          { text: "bereit für das nächste level?", },
          { text: "hier entlang", }
        ]
      ],
      "control-center": [
        [
          { text: "anfragen kommen rein, aber " },
          {
            text: "keiner",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "fast",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "nach",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: "? oder erst nach stunden? im 'control center' automatisiere ich deinen vertrieb. " },
          {
            text: "jede anfrage",
            effect: "highlight",
            counterEffectOverrides: {}
          },
          { text: " wird in sekunden qualifiziert und an dein team gemeldet. als ergebnis, schließt du mehr kunden ab, " },
          {
            text: "ohne",
            effect: "highlight",
            counterEffectOverrides: {}
          },
          { text: " mehr budget." }
        ],
        [
          { text: "schluss mit chaos." },
          { text: "die lösung", effect: "arrowUp", counterEffectOverrides: {} }
        ]
      ],
      "intelligence-hub": [
        [
          { text: "du gibst geld für " },
          {
            text: "werbung",
            // effect: "dashedSide",
            // counterEffectOverrides: {
            //   style: {
            //     ...INTRO_EFFECT_STYLE_PRESETS.adsDashed,
            //   },
            // }
          },
          { text: " aus, weißt aber nicht, was " },
          {
            text: "umsatz",
            effect: "highlight"
          },
          { text: " " },
          {
            text: "bringt",
            effect: "highlight"
          },
          { text: "? der 'intelligence hub' verbindet deine " },
          {
            text: "werbekonten",
            effect: "underlineThin",
            counterEffectOverrides: {
              style: {
                ...INTRO_EFFECT_STYLE_PRESETS.accountArrowCompact,
              },
            },
            // counterEffectOverrides: {
            //   style: {
            //     ...INTRO_EFFECT_STYLE_PRESETS.accountArrowDesktop,
            //   },
            // },
            // responsiveEffect: {
            //   max1020: {
            //     effect: "underlineThin",
            //     counterEffectOverrides: {
            //       style: {
            //         ...INTRO_EFFECT_STYLE_PRESETS.accountArrowCompact,
            //       },
            //     },
            //     wiggle: true,
            //   },
            // }
          },
          {
            text: " mit deinem bankkonto. ich tracke "
          },
          {
            text: "echten gewinn",
            effect: "highlight",
            counterEffectOverrides: {}
          },
          { text: ", nicht nur " },
          {
            text: "bunte",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "klicks",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ". datenschutzkonform und präzise." }
        ],
        [
          { text: "wahrheit sehen?" },
          { text: "hier lang", effect: "arrowUp", counterEffectOverrides: {} }
        ]
      ],
      "growth-engine": [
        [
          { text: "du postest " },
          {
            text: "manuell",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ", kopierst daten in excel und verschickst newsletter " },
          {
            text: "per hand",
            effect: "highlight"
          },
          { text: "? die 'growth engine' automatisiert diese " },
          {
            text: "routine",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ". bewertungen sammeln, kunden binden, inhalte " },
          {
            text: "verteilen",
            effect: "arrowRight",
            className: "intro-effect-arrow-right-gap",
            counterEffectOverrides: {
              style: {
                ...INTRO_EFFECT_STYLE_PRESETS.distributeArrow,
              },
            }
          },
          { text: " das system macht die arbeit, du machst die " },
          {
            text: "strategie",
            effect: "ellipse",
          },
          { text: "." },
        ],
        [
          { text: "zeit zurückholen?" },
          { text: "los geht's", effect: "arrowUp", counterEffectOverrides: {} }
        ]
      ],
    },
  },
  en: {
    sectionTitle: "diagnosis & solutions",
    options: {
      general: "start here",
      "control-center": "losing leads?",
      "intelligence-hub": "flying blind?",
      "growth-engine": "manual grunt work?",
    },
    cta: {
      label: "let's chat",
    },
    scroll: ["do i really need to", "remind you to scroll?"],
    textEffectWiggle: true,
    texts: {
      general: [
        [
          {
            text: "hey!",
            // effect: "dashedSideLeft",
            // counterEffectOverrides: {
            //   style: {
            //     ...INTRO_EFFECT_STYLE_PRESETS.greetingDashed,
            //   },
            // }
          },
          { text: " i'm andrii. i build " },
          {
            text: "not",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "just",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "campaigns",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ", i install " },
          {
            text: "systems",
            effect: "highlight",
          },
          { text: ". marketing systems that keep your back free and bring measurably more" },
          { text: " " },
          {
            text: "profit",
            effect: "highlight",
          },
          { text: " " },
          { text: "in. no" },
          { text: " " },
          {
            text: "'hoping",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " ", },
          {
            text: " and ",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " ", },
          {
            text: "praying'",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ", but " },
          {
            text: "infrastructure",
            effect: "underlineThin",
            counterEffectOverrides: {}
          },
          { text: "." }
        ],
        [
          { text: "ready for the next level?" },
          { text: "this way" }
        ]
      ],
      "control-center": [
        [
          { text: "inquiries are coming in, but " },
          {
            text: "no one",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "follows",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "up",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: "? or only hours later? in the 'control center', i automate your sales process. " },
          {
            text: "every inquiry",
            effect: "highlight",
            counterEffectOverrides: {}
          },
          { text: " is qualified in seconds and sent to your team. as a result, you close more customers, " },
          {
            text: "without",
            effect: "highlight",
            counterEffectOverrides: {}
          },
          { text: " more budget." }
        ],
        [
          { text: "end the chaos." },
          { text: "the fix", effect: "arrowUp", counterEffectOverrides: {} }
        ]
      ],
      "intelligence-hub": [
        [
          { text: "you spend money on " },
          {
            text: "ads",
            // effect: "dashedSide",
            // counterEffectOverrides: {
            //   style: {
            //     ...INTRO_EFFECT_STYLE_PRESETS.adsDashed,
            //   },
            // }
          },
          { text: ", but don't know what drives " },
          {
            text: "revenue",
            effect: "highlight"
          },
          { text: "? the 'intelligence hub' connects your " },
          {
            text: "ad accounts",
            effect: "underlineThin",
                counterEffectOverrides: {
                  style: {
                    ...INTRO_EFFECT_STYLE_PRESETS.accountArrowCompact,
                  },
                },
            // counterEffectOverrides: {
            //   style: {
            //     ...INTRO_EFFECT_STYLE_PRESETS.accountArrowDesktop,
            //   },
            // },
            // responsiveEffect: {
            //   max1020: {
            //     effect: "underlineThin",
            //     counterEffectOverrides: {
            //       style: {
            //         ...INTRO_EFFECT_STYLE_PRESETS.accountArrowCompact,
            //       },
            //     },
            //     wiggle: true,
            //   },
            // }
          },
          {
            text: " with your bank account. i track "
          },
          {
            text: "real profit",
            effect: "highlight",
            counterEffectOverrides: {}
          },
          { text: ", not just " },
          {
            text: "vanity",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: " " },
          {
            text: "clicks",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ". privacy-compliant and precise." }
        ],
        [
          { text: "see the truth?" },
          { text: "this way", effect: "arrowUp", counterEffectOverrides: {} }
        ]
      ],
      "growth-engine": [
        [
          { text: "you post " },
          {
            text: "manually",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ", copy data into excel, and send newsletters " },
          {
            text: "by hand",
            effect: "highlight",
          },
          { text: "? the 'growth engine' automates this " },
          {
            text: "routine",
            effect: "strikethrough",
            counterEffectOverrides: {}
          },
          { text: ". collect reviews, retain customers, " },
          {
            text: "distribute",
            effect: "arrowRight",
            className: "intro-effect-arrow-right-gap",
            counterEffectOverrides: {
              style: {
                ...INTRO_EFFECT_STYLE_PRESETS.distributeArrow,
              },
            }
          },
          { text: " content. the system does the work, you make the " },
          {
            text: "strategy",
            effect: "ellipse",
          },
          { text: "." },
        ],
        [
          { text: "get your time back?" },
          { text: "let's go", effect: "arrowUp", counterEffectOverrides: {} }
        ]
      ],
    },
  },
};

const OPTION_KEYS = [
  "general",
  "control-center",
  "intelligence-hub",
  "growth-engine",
];
const OPTION_ACTIVATION_DELAY = 300;

const normalizeInlineText = (value) => (
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : ""
);

const getSegmentText = (segment) => {
  if (typeof segment === "string") return segment;
  if (segment && typeof segment === "object") return segment.text ?? "";
  return "";
};

const hasInlineText = (segments) => (
  Array.isArray(segments)
  && segments.some((segment) => normalizeInlineText(getSegmentText(segment)).length > 0)
);

const splitTextAndCtaLine = (lines) => {
  if (!Array.isArray(lines) || lines.length === 0) {
    return { textLines: [], ctaLabel: "" };
  }

  const bodyLines = lines.slice(0, -1);
  const ctaLine = lines[lines.length - 1];
  if (!Array.isArray(ctaLine) || ctaLine.length === 0) {
    return { textLines: lines, ctaLabel: "" };
  }

  let ctaSegmentIndex = -1;
  for (let index = ctaLine.length - 1; index >= 0; index -= 1) {
    if (normalizeInlineText(getSegmentText(ctaLine[index])).length > 0) {
      ctaSegmentIndex = index;
      break;
    }
  }

  if (ctaSegmentIndex === -1) {
    return { textLines: lines, ctaLabel: "" };
  }

  const ctaLabel = normalizeInlineText(getSegmentText(ctaLine[ctaSegmentIndex]));
  const ctaHookSegments = ctaLine.slice(0, ctaSegmentIndex);
  const textLines = hasInlineText(ctaHookSegments)
    ? [...bodyLines, ctaHookSegments]
    : bodyLines;

  return { textLines, ctaLabel };
};

export default function Intro() {
  const { language } = useLanguage();

  const copy = INTRO_COPY[language] ?? INTRO_COPY.en;
  const fallbackCopy = INTRO_COPY.en;
  const sectionTitle = copy.sectionTitle ?? fallbackCopy.sectionTitle ?? "introduction";
  const scrollLines = copy.scroll ?? fallbackCopy.scroll ?? [];
  const textEffectWiggle = copy.textEffectWiggle ?? fallbackCopy.textEffectWiggle ?? true;
  const isSmallTextEffectViewport = useMediaQuery(SMALL_TEXT_EFFECT_QUERY);
  const introCtaTrigger = isSmallTextEffectViewport ? "always" : "hover";
  const fallbackCtaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "";

  const availableKeys = useMemo(() => (
    OPTION_KEYS.filter((key) => {
      const lines = copy.texts[key] ?? fallbackCopy.texts[key];
      return Array.isArray(lines) && lines.length > 0;
    })
  ), [copy, fallbackCopy]);

  const [activeKey, setActiveKey] = useState(() => availableKeys[0] ?? OPTION_KEYS[0]);
  const [visibleKey, setVisibleKey] = useState(() => availableKeys[0] ?? OPTION_KEYS[0]);
  const activationTimeoutRef = useRef(null);

  // If the active key is not available in the current language, fall back to the first available
  useEffect(() => {
    if (!availableKeys.length) return;
    const nextKey = availableKeys[0];
    setActiveKey((prev) => (availableKeys.includes(prev) ? prev : nextKey));
    setVisibleKey((prev) => (availableKeys.includes(prev) ? prev : nextKey));
  }, [availableKeys]);

  useEffect(() => () => {
    if (activationTimeoutRef.current) {
      clearTimeout(activationTimeoutRef.current);
      activationTimeoutRef.current = null;
    }
  }, []);

  const optionsRef = useRef(null);
  const optionRefs = useRef({});
  const [maskVisibility, setMaskVisibility] = useState({ left: false, right: false });

  const updateMaskVisibility = useCallback((node) => {
    const element = node ?? optionsRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const isAtStart = scrollLeft <= 1;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

    setMaskVisibility((prev) => {
      const next = { left: !isAtStart, right: !isAtEnd };
      if (prev.left === next.left && prev.right === next.right) return prev;
      return next;
    });
  }, []);

  const handleOptionsScroll = useCallback((event) => {
    updateMaskVisibility(event.currentTarget);
  }, [updateMaskVisibility]);

  useEffect(() => {
    const element = optionsRef.current;
    if (!element) return undefined;

    updateMaskVisibility(element);

    const handleResize = () => updateMaskVisibility(element);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateMaskVisibility]);

  // Re-evaluate mask visibility when language (and option widths) change
  useEffect(() => {
    updateMaskVisibility(optionsRef.current);
  }, [language, updateMaskVisibility]);

  const handleOptionSelect = useCallback((key) => {
    if (!availableKeys.includes(key)) return;
    if (activeKey === key && visibleKey === key) return;

    setActiveKey(key);

    if (activationTimeoutRef.current) {
      clearTimeout(activationTimeoutRef.current);
    }

    activationTimeoutRef.current = window.setTimeout(() => {
      setVisibleKey(key);
      activationTimeoutRef.current = null;
    }, OPTION_ACTIVATION_DELAY);
  }, [activeKey, availableKeys, visibleKey]);

  // Arrow key navigation for radiogroup
  const handleOptionKeyDown = useCallback((event, key, index) => {
    const keys = availableKeys;
    let newIndex = index;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        newIndex = (index + 1) % keys.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        newIndex = (index - 1 + keys.length) % keys.length;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = keys.length - 1;
        break;
      case "Enter":
        event.preventDefault();
        handleOptionSelect(key);
        return;
      default:
        return;
    }

    const newKey = keys[newIndex];
    handleOptionSelect(newKey);
    // Focus the new option
    optionRefs.current[newKey]?.focus();
  }, [availableKeys, handleOptionSelect]);

  const getOptionContent = useCallback((key) => {
    const lines = copy.texts[key] ?? fallbackCopy.texts[key];
    const { textLines, ctaLabel } = splitTextAndCtaLine(lines);

    return {
      lines: textLines.length ? textLines : lines,
      ctaLabel: ctaLabel || fallbackCtaLabel,
    };
  }, [copy.texts, fallbackCopy.texts, fallbackCtaLabel]);

  const renderedKey = availableKeys.includes(visibleKey)
    ? visibleKey
    : (availableKeys[0] ?? OPTION_KEYS[0]);
  const { lines: renderedLines, ctaLabel: renderedCtaLabel } = getOptionContent(renderedKey);

  return (
    <section className="section intro" id="intro">
      <h2 className="sr-only">{sectionTitle}</h2>
      <div className="content">
        <div className={`gradient-mask left ${maskVisibility.left ? "is--visible" : ""}`}></div>
        <div className={`gradient-mask right ${maskVisibility.right ? "is--visible" : ""}`}></div>

        <div
          className="options"
          ref={optionsRef}
          onScroll={handleOptionsScroll}
          role="radiogroup"
          aria-label={language === "de" ? "Problem auswählen" : "Select problem"}
        >
          {availableKeys.map((key, index) => {
            const label = copy.options[key] ?? fallbackCopy.options[key];
            const isSelected = activeKey === key || (!activeKey && index === 0);
            const isEffectActive = visibleKey === key || (!visibleKey && index === 0);

            return (
              <TextEffect
                as="div"
                variant="ellipseAuto"
                trigger="hover"
                active={isEffectActive}
                activeVariant="linethrough"
                activeTrigger="always"
                key={key}
                ref={(el) => { optionRefs.current[key] = el; }}
                className={`option ${key} ${isSelected ? "is--active" : ""}`}
                data-key={key}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleOptionSelect(key)}
                onKeyDown={(event) => handleOptionKeyDown(event, key, index)}
                effectOverrides={{
                  style: {
                    width: "100%",
                    left: "0",
                }}}
              >
                {label}
              </TextEffect>
            );
          })}
        </div>

        <div className="texts">
          <div
            key={renderedKey}
            className={`text ${renderedKey} is--visible`}
            data-key={renderedKey}
            aria-hidden={false}
          >
            {renderedLines.map((line, lineIndex) => {
              const isCtaLine = lineIndex === renderedLines.length - 1;
              const LineTag = isCtaLine ? "span" : "span";

              return (
                <LineTag
                  key={`${renderedKey}-${lineIndex}`}
                  className={`${isCtaLine ? "cta-hook" : ""} m-0`}
                >
                  {" "}
                  {line.map((segment, segIndex) => {
                    if (typeof segment === "string") {
                      return <span key={`${lineIndex}-${segIndex}`}>{segment}</span>;
                    }
                    if (!segment?.effect) {
                      return <span key={`${lineIndex}-${segIndex}`}>{segment?.text ?? ""}</span>;
                    }

                    const segmentWiggle = segment.wiggle ?? textEffectWiggle;
                    const segmentEffectOverrides = segment.counterEffectOverrides;
                    const segmentClassName = segment.className ? ` ${segment.className}` : "";
                    const responsiveConfig = isSmallTextEffectViewport
                      ? segment.responsiveEffect?.max1020
                      : segment.responsiveEffect?.min1280;
                    const hasResponsiveEffect = Object.prototype.hasOwnProperty.call(
                      responsiveConfig ?? {},
                      "effect",
                    );
                    const hasResponsiveOverrides = Object.prototype.hasOwnProperty.call(
                      responsiveConfig ?? {},
                      "counterEffectOverrides",
                    );
                    const hasResponsiveWiggle = Object.prototype.hasOwnProperty.call(
                      responsiveConfig ?? {},
                      "wiggle",
                    );
                    const resolvedSegmentEffect = hasResponsiveEffect
                      ? responsiveConfig.effect
                      : segment.effect;
                    const resolvedSegmentEffectOverrides = hasResponsiveOverrides
                      ? responsiveConfig.counterEffectOverrides
                      : segmentEffectOverrides;
                    const resolvedSegmentWiggle = hasResponsiveWiggle
                      ? responsiveConfig.wiggle
                      : segmentWiggle;

                    if (!resolvedSegmentEffect) {
                      return <span key={`${lineIndex}-${segIndex}`}>{segment.text}</span>;
                    }

                    return (
                      <TextEffect
                        key={`${lineIndex}-${segIndex}`}
                        variant={resolvedSegmentEffect}
                        trigger="visible"
                        className={`intro-effect-${resolvedSegmentEffect}${segmentClassName}`}
                        effectOverrides={resolvedSegmentEffectOverrides}
                        wiggle={resolvedSegmentWiggle}
                      >
                        {segment.text}
                      </TextEffect>
                    );
                  })}
                </LineTag>
              );
            })}

            <div className="intro-cta">
              <BookCTA
                label={renderedCtaLabel}
                className="intro-cta-book"
                ctaLocation="intro"
                variant="ellipseThin"
                trigger={introCtaTrigger}
              />
            </div>
          </div>
        </div>

        {/* <div className="scroll">
          <TextEffect
            variant="arrowDownLeft"
            trigger="always"
            className="inline-block color-50"
            effectOverrides={{
              style: {
                rotate: "-15deg",
            }}}
          >
            <p>
            {scrollLines.map((line, index) => (
              <span key={`scroll-${index}`}>
                {line}
                {index < scrollLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          </TextEffect>
        </div> */}
      </div>
    </section>
  );
}
