'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTextEffect, resolveAutoVariant } from "@/hooks/useTextEffect"
import WiggleSvg from "./WiggleSvg"

// Variants that use the internal frame-based animation (TextEffectController)
// All others will be treated as "static" SVGs and animated via CSS transform (WiggleSvg)
const DYNAMIC_VARIANTS = new Set([
  'ellipse',
  'ellipseBold',
  'ellipseThin',
  'sidelineBold',
  'sidelineThin',
  'underlineCurved',
  'underlineLong',
  'underlineThin',
  'underlineZigzag',
  'linethrough',
  'underlineBold'
])

const INLINE_TEXT_TAGS = new Set([
  "a",
  "b",
  "em",
  "i",
  "label",
  "mark",
  "small",
  "span",
  "strong",
]);

const TextEffect = forwardRef(function TextEffect(
  {
    as: Component = "span",
    variant = "underlineLong",
    active: activeProp,
    activeVariant,
    activeTrigger,
    activeDelay = 0,
    autoActive: autoActiveProp,
    openInNewTab = false,
    trigger = "hover",
    basePath = "/text-effects",
    initiallyVisible = false,
    visibilityRootMargin,
    visibilityThreshold,
    effectRef,
    className,
    children,
    wiggle = true,
    effectOverrides,
    ...rest
  },
  forwardedRef,
) {
  const pathname = usePathname()
  const href = typeof rest?.href === "string" ? rest.href : undefined
  const isStringComponent = typeof Component === "string"
  const isAnchorComponent =
    (isStringComponent && Component.toLowerCase() === "a") || Boolean(href)

  const autoActive = autoActiveProp ?? (isAnchorComponent && Boolean(href))

  const componentProps = { ...rest }

  if (openInNewTab) {
    if (!componentProps.target) {
      componentProps.target = "_blank"
    }
    if (!componentProps.rel) {
      componentProps.rel = "noopener noreferrer"
    } else {
      const relValues = new Set(componentProps.rel.split(/\s+/).filter(Boolean))
      relValues.add("noopener")
      relValues.add("noreferrer")
      componentProps.rel = Array.from(relValues).join(" ")
    }
  }

  const baseActiveVariant = activeVariant ?? (autoActive ? "linethrough" : undefined)

  // Resolve auto variants once per component instance
  // This ensures the random selection is stable during the component"s lifecycle
  const resolvedVariant = useMemo(() => resolveAutoVariant(variant), [variant])
  const resolvedActiveVariant = useMemo(
    () => (baseActiveVariant ? resolveAutoVariant(baseActiveVariant) : null),
    [baseActiveVariant],
  )
  const resolvedActiveTrigger = activeTrigger ?? (autoActive ? "manual" : undefined)

  const [autoActiveState, setAutoActiveState] = useState(false)

  useEffect(() => {
    if (!autoActive || !href || typeof window === "undefined") {
      setAutoActiveState(false)
      return undefined
    }

    let parsedUrl
    try {
      parsedUrl = new URL(href, window.location.origin)
    } catch (error) {
      setAutoActiveState(false)
      return undefined
    }

    const protocol = parsedUrl.protocol ?? ""
    const isExternal =
      parsedUrl.origin && parsedUrl.origin !== window.location.origin &&
      protocol !== "about:" && protocol !== "javascript:"

    if (isExternal || protocol === "mailto:" || protocol === "tel:") {
      setAutoActiveState(false)
      return undefined
    }

    const normalizePath = (value) => {
      if (!value) return "/"
      if (value !== "/" && value.endsWith("/")) {
        return value.replace(/\/+$/, "")
      }
      return value
    }

    const checkActive = () => {
      const currentPath = normalizePath(window.location.pathname)
      const targetPath = normalizePath(parsedUrl.pathname)
      if (currentPath !== targetPath) return false
      if (parsedUrl.hash) {
        const currentHash = window.location.hash || ""
        return currentHash === parsedUrl.hash
      }
      return true
    }

    const updateState = () => {
      setAutoActiveState(checkActive())
    }

    updateState()

    const handleHashChange = () => {
      updateState()
    }

    if (parsedUrl.hash) {
      window.addEventListener("hashchange", handleHashChange)
    }

    return () => {
      if (parsedUrl.hash) {
        window.removeEventListener("hashchange", handleHashChange)
      }
    }
  }, [autoActive, href, pathname])

  const isActive = activeProp ?? (autoActive ? autoActiveState : false)
  const isControlledActive = activeProp !== undefined || autoActive

  const targetVariant = useMemo(
    () => (isActive && resolvedActiveVariant ? resolvedActiveVariant : resolvedVariant),
    [isActive, resolvedActiveVariant, resolvedVariant],
  )

  const targetTrigger = useMemo(
    () => (isActive && resolvedActiveTrigger ? resolvedActiveTrigger : trigger),
    [isActive, resolvedActiveTrigger, trigger],
  )

  const [currentVariant, setCurrentVariant] = useState(targetVariant)
  const [currentTrigger, setCurrentTrigger] = useState(targetTrigger)

  useEffect(() => {
    if (currentVariant === targetVariant) return
    let timeoutId = null
    if (activeDelay > 0) {
      timeoutId = setTimeout(() => {
        setCurrentVariant(targetVariant)
      }, activeDelay)
    } else {
      setCurrentVariant(targetVariant)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentVariant, targetVariant, activeDelay])

  useEffect(() => {
    if (currentTrigger === targetTrigger) return
    let timeoutId = null
    if (activeDelay > 0) {
      timeoutId = setTimeout(() => {
        setCurrentTrigger(targetTrigger)
      }, activeDelay)
    } else {
      setCurrentTrigger(targetTrigger)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentTrigger, targetTrigger, activeDelay])

  const shouldWiggle = wiggle !== false && wiggle !== "static"

  const effectConfigOverrides = useMemo(() => {
    if (!shouldWiggle) {
      return {
        ...(effectOverrides ?? {}),
        frameStrategy: "none",
        loopFrames: false,
        animationDuration: 0,
      }
    }
    return effectOverrides ?? null
  }, [shouldWiggle, effectOverrides])

  const effect = useTextEffect({
    variant: currentVariant,
    trigger: currentTrigger,
    basePath,
    initiallyVisible,
    visibilityRootMargin,
    visibilityThreshold,
    configOverrides: effectConfigOverrides,
  })

  useEffect(() => {
    if (!autoActive || activeProp !== undefined) return undefined
    if (typeof window === "undefined") return undefined

    let timeoutId = null
    let rafId = null

    const runWhenReady = () => {
      if (!effect?.ready) {
        rafId = window.requestAnimationFrame(runWhenReady)
        return
      }
      if (isActive) {
        effect.animateIn?.()
      } else {
        effect.animateOut?.()
      }
    }

    if (activeDelay > 0) {
      timeoutId = window.setTimeout(runWhenReady, activeDelay)
    } else {
      runWhenReady()
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [autoActive, activeProp, isActive, effect, activeDelay])

  const nodeRef = useRef(null)

  const setNode = useCallback(
    (node) => {
      effect.ref(node)
      nodeRef.current = node
      if (typeof forwardedRef === "function") {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [effect, forwardedRef],
  )

  useImperativeHandle(
    effectRef,
    () => ({
      animateIn: effect.animateIn,
      animateOut: effect.animateOut,
      ready: effect.ready,
      element: nodeRef.current,
    }),
    [effect, nodeRef],
  )

  // Decide if we should wrap with WiggleSvg
  // We use WiggleSvg when the variant is NOT in the dynamic list (and not highlight/cssOnly)
  const isDynamic = DYNAMIC_VARIANTS.has(currentVariant)
  const isHighlight = currentVariant === 'highlight' // specialized CSS only variant
  const shouldUseWiggle = !isDynamic && !isHighlight

  // If wiggle is disabled, force active=false on WiggleSvg
  // If wiggle is enabled, but TextEffect is controlled (active/autoActive), align WiggleSvg active state
  // If wiggle is enabled, and TextEffect is uncontrolled (hover), leave WiggleSvg active undefined to key off trigger
  let wiggleActiveProp = undefined
  if (!shouldWiggle) {
    wiggleActiveProp = false
  } else if (isControlledActive) {
    wiggleActiveProp = isActive
  }

  const OutputComponent = shouldUseWiggle ? WiggleSvg : Component
  const outputProps = shouldUseWiggle
    ? {
      as: Component,
      trigger: currentTrigger,
      ...(wiggleActiveProp !== undefined ? { active: wiggleActiveProp } : {}),
      // Pass wiggle specific props if needed, or rely on defaults
      ...componentProps
    }
    : componentProps

  const dynamicLayoutClassName = useMemo(() => {
    if (shouldUseWiggle) return undefined
    if (typeof Component !== "string") return undefined
    const tagName = Component.toLowerCase()
    if (INLINE_TEXT_TAGS.has(tagName)) {
      return "inline-block"
    }
    return undefined
  }, [Component, shouldUseWiggle])

  return (
    <OutputComponent
      ref={setNode}
      className={cn("relative", dynamicLayoutClassName, className)}
      {...outputProps}
    >
      {children}
    </OutputComponent>
  )
})

export default TextEffect;
