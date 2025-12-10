'use client'

import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { cn } from "@/lib/utils"

const isBrowser = typeof window !== "undefined"
const DEFAULT_FONT_URL = "/fonts/Satisfy/SatisfySL.json"
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const waitForFonts = async () => {
  if (typeof document === "undefined" || !document.fonts) return
  try {
    await document.fonts.ready
  } catch {
    // Ignore font readiness failures; fallback widths will be used.
  }
}

function extractTextContent(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return child
      }
      return ""
    })
    .join("")
    .trim()
}

const HandwritingEffect = forwardRef(function HandwritingEffect(
  {
    as: Component = "span",
    text: textProp,
    children,
    className,
    effectRef,
    fontUrl = DEFAULT_FONT_URL,
    fontSize = 42,
    strokeWidth = 0.65,
    letterSpacing = 0,
    color = "currentColor",
    duration = 2200,
    trigger = "hover",
    initiallyVisible = false,
    visibilityRootMargin = "0px 0px -33%",
    visibilityThreshold = 0,
    ...rest
  },
  forwardedRef,
) {
  const reactId = useId()
  const sanitizedId = useMemo(() => reactId.replace(/[:]/g, ""), [reactId])
  const containerId = useMemo(() => `handwriting-${sanitizedId}`, [sanitizedId])
  const blockId = useMemo(() => `block-${sanitizedId}`, [sanitizedId])

  const rootRef = useRef(null)
  const containerRef = useRef(null)
  const containerWidthRef = useRef(null)
  const placeholderRef = useRef(null)
  const varaInstanceRef = useRef(null)
  const animationRef = useRef(null)
  const currentDirectionRef = useRef("out")

  const [ready, setReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const resolvedText = useMemo(() => {
    if (typeof textProp === "string") return textProp
    const extracted = extractTextContent(children)
    return extracted || ""
  }, [textProp, children])

  useEffect(() => {
    if (!isBrowser) return undefined
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => {
      setPrefersReducedMotion(media.matches)
    }
    handleChange()
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleChange)
      return () => media.removeEventListener("change", handleChange)
    }
    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  const stopAnimation = useCallback(() => {
    if (animationRef.current?.rafId) {
      cancelAnimationFrame(animationRef.current.rafId)
    }
    animationRef.current = null
  }, [])

  const collectPaths = useCallback(() => {
    const instance = varaInstanceRef.current
    if (!instance) return []
    const block = instance.get(blockId)
    if (!block?.characters?.length) return []
    const paths = []
    block.characters.forEach((group) => {
      group.querySelectorAll("path").forEach((path) => {
        const length = path.getTotalLength()
        paths.push({ path, length })
      })
    })
    return paths
  }, [blockId])

  const fallbackCanvasWidth = useMemo(() => {
    const characters = typeof resolvedText === "string" ? Math.max(1, resolvedText.length) : 1
    const numericSpacing = typeof letterSpacing === "number" ? letterSpacing : 0
    const estimated =
      characters * fontSize * 0.9 + Math.max(0, characters - 1) * numericSpacing
    return Math.max(fontSize * 2, estimated)
  }, [fontSize, letterSpacing, resolvedText])

  const syncCanvasWidth = useCallback(() => {
    if (!containerRef.current) return
    const measured =
      placeholderRef.current?.scrollWidth ||
      placeholderRef.current?.getBoundingClientRect?.().width ||
      0
    const width =
      measured && Number.isFinite(measured) && measured > 0 ? measured : fallbackCanvasWidth
    containerRef.current.style.minWidth = `${width}px`
    containerRef.current.style.width = `${width}px`
    containerWidthRef.current = width
  }, [fallbackCanvasWidth])

  useEffect(() => {
    if (!isBrowser) return undefined
    syncCanvasWidth()

    const handleResize = () => syncCanvasWidth()

    if (typeof ResizeObserver === "undefined" || !placeholderRef.current) {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }

    const observer = new ResizeObserver(() => syncCanvasWidth())
    observer.observe(placeholderRef.current)

    return () => observer.disconnect()
  }, [syncCanvasWidth])

  const runAnimation = useCallback(
    (direction, { immediate = false } = {}) => {
      const paths = collectPaths()
      if (!paths.length) return

      stopAnimation()

      const instant = immediate || prefersReducedMotion
      const totalLength = paths.reduce((sum, item) => sum + item.length, 0)
      if (!totalLength) return

      if (instant) {
        paths.forEach(({ path, length }) => {
          path.style.opacity = 1
          const target = direction === "in" ? 0 : length + 1
          path.style.strokeDasharray = `${length} ${length + 2}`
          path.style.strokeDashoffset = target
        })
        animationRef.current = null
        return
      }

      let accumulated = 0
      const segments = paths.map(({ path, length }) => {
        path.style.opacity = 1
        path.style.strokeDasharray = `${length} ${length + 2}`
        const share = length / totalLength
        const segmentDuration = Math.max(60, duration * share)
        const segment = {
          path,
          from: direction === "in" ? length + 1 : 0,
          to: direction === "in" ? 0 : length + 1,
          start: accumulated,
          duration: segmentDuration,
        }
        accumulated += segmentDuration
        return segment
      })

      const totalDuration = accumulated

      const animate = (timestamp) => {
        if (!animationRef.current) return
        if (!animationRef.current.startTime) {
          animationRef.current.startTime = timestamp
        }
        const elapsed = timestamp - animationRef.current.startTime
        let finished = elapsed >= totalDuration

        segments.forEach((segment) => {
          const local = clamp(
            (elapsed - segment.start) / segment.duration,
            0,
            1,
          )
          const value = segment.from + (segment.to - segment.from) * local
          segment.path.style.strokeDashoffset = value
          if (local < 1) {
            finished = false
          }
        })

        if (finished) {
          animationRef.current = null
          return
        }
        animationRef.current.rafId = requestAnimationFrame(animate)
      }

      animationRef.current = {
        direction,
        startTime: 0,
        rafId: requestAnimationFrame(animate),
      }
    },
    [collectPaths, duration, prefersReducedMotion, stopAnimation],
  )

  const animateIn = useCallback(
    (immediate = false) => {
      currentDirectionRef.current = "in"
      runAnimation("in", { immediate })
    },
    [runAnimation],
  )

  const animateOut = useCallback(
    (immediate = false) => {
      currentDirectionRef.current = "out"
      runAnimation("out", { immediate })
    },
    [runAnimation],
  )

  useEffect(() => {
    if (!isBrowser) return undefined
    if (!containerRef.current || !resolvedText) return undefined

    let mounted = true
    let instance = null
    setReady(false)
    containerRef.current.innerHTML = ""

    const initialise = async () => {
      try {
        await waitForFonts()
        const mod = await import("vara")
        if (!mounted) return
        const VaraCtor = mod?.default ?? mod
        if (!VaraCtor) return
        syncCanvasWidth()

        instance = new VaraCtor(
          `#${containerId}`,
          fontUrl,
          [
            {
              id: blockId,
              text: resolvedText,
              fontSize,
              strokeWidth,
              color,
              delay: 0,
              queued: false,
              autoAnimation: false,
              letterSpacing,
              width: containerWidthRef.current ?? fallbackCanvasWidth,
            },
          ],
          {
            fontSize,
            strokeWidth,
            color,
            autoAnimation: false,
            queued: false,
            letterSpacing,
            width: containerWidthRef.current ?? fallbackCanvasWidth,
          },
        )

        instance.ready(() => {
          if (!mounted) return
          varaInstanceRef.current = instance
          setReady(true)
          if (initiallyVisible || trigger === "always") {
            animateIn(true)
          } else {
            animateOut(true)
          }
        })
      } catch (error) {
        console.error("Failed to initialise Vara", error)
      }
    }

    initialise()

    return () => {
      mounted = false
      stopAnimation()
      if (instance?.svg?.parentNode) {
        instance.svg.remove()
      }
      if (containerRef.current) {
        containerRef.current.replaceChildren()
      }
      if (varaInstanceRef.current === instance) {
        varaInstanceRef.current = null
      }
      setReady(false)
    }
  }, [
    animateIn,
    animateOut,
    blockId,
    containerId,
    fontSize,
    fontUrl,
    initiallyVisible,
    letterSpacing,
    resolvedText,
    strokeWidth,
    trigger,
    color,
    stopAnimation,
    syncCanvasWidth,
    fallbackCanvasWidth,
  ])

  useEffect(() => {
    if (!ready) return undefined
    if (prefersReducedMotion) {
      if (currentDirectionRef.current === "in") {
        animateIn(true)
      } else {
        animateOut(true)
      }
    }
    return undefined
  }, [animateIn, animateOut, prefersReducedMotion, ready])

  useEffect(() => {
    if (!ready || !rootRef.current) return undefined
    const node = rootRef.current

    if (trigger === "hover") {
      const handleEnter = () => animateIn()
      const handleLeave = () => animateOut()
      node.addEventListener("mouseenter", handleEnter)
      node.addEventListener("mouseleave", handleLeave)
      return () => {
        node.removeEventListener("mouseenter", handleEnter)
        node.removeEventListener("mouseleave", handleLeave)
      }
    }

    if (trigger === "visible") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target !== node) return
            if (entry.isIntersecting && entry.intersectionRatio > visibilityThreshold) {
              animateIn()
            } else if (!entry.isIntersecting) {
              animateOut()
            }
          })
        },
        {
          root: null,
          rootMargin: visibilityRootMargin,
          threshold: visibilityThreshold,
        },
      )
      observer.observe(node)
      return () => observer.disconnect()
    }

    if (trigger === "always") {
      animateIn()
    }

    return undefined
  }, [
    animateIn,
    animateOut,
    ready,
    trigger,
    visibilityRootMargin,
    visibilityThreshold,
  ])

  const setRootNode = useCallback(
    (node) => {
      rootRef.current = node
      if (typeof forwardedRef === "function") {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [forwardedRef],
  )

  useImperativeHandle(
    effectRef,
    () => ({
      animateIn,
      animateOut,
      ready,
      element: rootRef.current,
      instance: varaInstanceRef.current,
    }),
    [animateIn, animateOut, ready],
  )

  return (
    <Component
      ref={setRootNode}
      className={cn(
        "handwriting-effect",
        ready && "handwriting-effect--ready",
        className,
      )}
      data-handwriting-trigger={trigger}
      {...rest}
    >
      <span
        ref={placeholderRef}
        className="handwriting-effect__placeholder"
        aria-hidden="true"
      >
        {children ?? textProp}
      </span>
      <span
        id={containerId}
        ref={containerRef}
        aria-hidden="true"
        className="handwriting-effect__canvas"
        role="presentation"
        style={{
          color,
          minHeight: `${fontSize}px`,
        }}
      />
    </Component>
  )
})

export default HandwritingEffect
