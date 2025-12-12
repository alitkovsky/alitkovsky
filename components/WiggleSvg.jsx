'use client'

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const DEFAULT_SELECTOR = "svg"

function resolveTime(value, fallback) {
  if (typeof value === "number") return `${value}s`
  return value || fallback
}

function resolveTarget(wrapper, selector = DEFAULT_SELECTOR) {
  if (!wrapper) return null
  if (selector === "self") return wrapper
  const node = wrapper.querySelector(selector) || wrapper.querySelector(DEFAULT_SELECTOR)
  return node || wrapper
}

function applyVariables(target, { duration, steps, distance, delay }) {
  if (!target?.style) return
  target.style.setProperty("--wiggle-duration", resolveTime(duration, "0.8s"))
  target.style.setProperty("--wiggle-steps", `${steps ?? 7}`)
  target.style.setProperty("--wiggle-distance", typeof distance === "number" ? `${distance}px` : distance || "1px")
  target.style.setProperty("--animation-delay", resolveTime(delay, "0s"))
}

/**
 * Adds a Webflow-style wiggle transform animation to any inline SVG (or any element).
 * Works even when the SVG has a single path because it animates transforms instead of swapping frames.
 *
 * Triggers:
 * - always: animation runs immediately
 * - hover: animation runs on hover/focus
 * - visible: animation runs when intersecting the viewport
 * - manual: controlled via the `active` prop
 */
export default function WiggleSvg({
  as: Component = "span",
  children,
  className,
  style,
  selector = DEFAULT_SELECTOR,
  trigger = "always",
  active,
  rootMargin = "0px 0px 0% 0px",
  threshold = 0,
  delay = 0,
  duration = 0.8,
  steps = 7,
  distance = 1,
  ...rest
}) {
  const wrapperRef = useRef(null)
  const targetRef = useRef(null)
  const isControlled = active !== undefined
  const [internalActive, setInternalActive] = useState(trigger === "always")
  const resolvedActive = isControlled ? Boolean(active) : internalActive

  // Keep the target element reference up to date (important if children change or load async)
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    const applyTarget = (target) => {
      if (!target) return
      if (targetRef.current === target) return

      if (targetRef.current) {
        targetRef.current.classList.remove("wiggle")
        delete targetRef.current.dataset.wiggleActive
      }

      targetRef.current = target
      target.classList.add("wiggle")
      applyVariables(target, { duration, steps, distance, delay })
      target.dataset.wiggleActive = resolvedActive ? "true" : "false"
    }

    const updateTarget = () => {
      const nextTarget = resolveTarget(wrapper, selector)
      applyTarget(nextTarget || wrapper)
    }

    updateTarget()

    const observer = new MutationObserver(() => updateTarget())
    observer.observe(wrapper, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      if (targetRef.current) {
        targetRef.current.classList.remove("wiggle")
        delete targetRef.current.dataset.wiggleActive
        targetRef.current = null
      }
    }
  }, [selector, children])

  // Update CSS variables when timing/intensity props change
  useEffect(() => {
    const target = targetRef.current
    if (!target) return
    applyVariables(target, { duration, steps, distance, delay })
  }, [duration, steps, distance, delay])

  // Update animation play-state flag
  useEffect(() => {
    const target = targetRef.current
    if (!target) return
    target.dataset.wiggleActive = resolvedActive ? "true" : "false"
  }, [resolvedActive])

  // Trigger: always
  useEffect(() => {
    if (isControlled || trigger !== "always") return undefined
    setInternalActive(true)
    return undefined
  }, [isControlled, trigger])

  // Trigger: hover/focus
  useEffect(() => {
    if (isControlled || trigger !== "hover") return undefined
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    setInternalActive(false)

    const activate = () => setInternalActive(true)
    const deactivate = () => setInternalActive(false)

    wrapper.addEventListener("pointerenter", activate)
    wrapper.addEventListener("pointerleave", deactivate)
    wrapper.addEventListener("focusin", activate)
    wrapper.addEventListener("focusout", deactivate)

    return () => {
      wrapper.removeEventListener("pointerenter", activate)
      wrapper.removeEventListener("pointerleave", deactivate)
      wrapper.removeEventListener("focusin", activate)
      wrapper.removeEventListener("focusout", deactivate)
    }
  }, [isControlled, trigger])

  // Trigger: visible
  useEffect(() => {
    if (isControlled || trigger !== "visible") return undefined
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    setInternalActive(false)

    if (typeof IntersectionObserver === "undefined") {
      setInternalActive(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.target === wrapper)
        if (!entry) return
        const visible = entry.isIntersecting && entry.intersectionRatio > (Array.isArray(threshold) ? threshold[0] : threshold)
        setInternalActive(visible)
      },
      { root: null, rootMargin, threshold },
    )

    observer.observe(wrapper)

    return () => {
      observer.disconnect()
    }
  }, [isControlled, trigger, rootMargin, threshold])

  // Trigger: manual – do nothing; consumer drives `active`
  useEffect(() => {
    if (isControlled || trigger !== "manual") return undefined
    setInternalActive(false)
    return undefined
  }, [isControlled, trigger])

  const componentClassName = useMemo(
    () => cn("inline-flex", className),
    [className],
  )

  return (
    <Component ref={wrapperRef} className={componentClassName} style={style} {...rest}>
      {children}
    </Component>
  )
}
