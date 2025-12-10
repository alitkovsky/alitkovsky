'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTextEffect, resolveAutoVariant } from "@/hooks/useTextEffect"

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

  const effect = useTextEffect({
    variant: currentVariant,
    trigger: currentTrigger,
    basePath,
    initiallyVisible,
    visibilityRootMargin,
    visibilityThreshold,
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

  return (
    <Component ref={setNode} className={cn("relative", className)} {...componentProps}>
      {children}
    </Component>
  )
})

export default TextEffect;