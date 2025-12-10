import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const isBrowser = typeof window !== "undefined";

const EFFECTS = {
  ellipse: {
    file: "Ellipse.svg",
    animationDuration: 500,
    style: {
      position: "absolute",
      top: "0%",
      left: "-10%",
      width: "120%",
      height: "100%",
    },
  },
  ellipseBold: {
    file: "EllipseBold.svg",
    animationDuration: 500,
    style: {
      position: "absolute",
      top: "-10%",
      left: "-10%",
      width: "120%",
      height: "110%",
    },
  },
  ellipseThin: {
    file: "EllipseThin.svg",
    animationDuration: 500,
    style: {
      position: "absolute",
      top: "0%",
      left: "-20%",
      width: "120%",
      height: "110%",
    },
  },
  underlineLong: {
    file: "UnderlineLong.svg",
    animationDuration: 400,
    style: {
      position: "absolute",
      bottom: "-0.1em",
      top: "auto",
      left: "0",
      width: "100%",
      height: "auto",
    },
  },
  underlineThin: {
    file: "UnderlineThin.svg",
    animationDuration: 400,
    style: {
      position: "absolute",
      bottom: "-0.3em",
      top: "auto",
      left: "0",
      width: "100%",
      height: "auto",
    },
  },
  underlineZigzag: {
    file: "UnderlineZigzag.svg",
    animationDuration: 400,
    style: {
      position: "absolute",
      bottom: "-0.25em",
      top: "auto",
      left: "0",
      width: "100%",
      height: "auto",
    },
  },
  underlineCurved: {
    file: "UnderlineCurved.svg",
    animationDuration: 400,
    style: {
      position: "absolute",
      bottom: "-0.3em",
      top: "auto",
      left: "0",
      width: "100%",
      height: "auto",
    },
  },
  linethrough: {
    file: "UnderlineLong.svg",
    animationDuration: 500,
    style: {
      position: "absolute",
      top: "50%",
      left: "-10%",
      width: "120%",
      height: "auto",
      transform: "translateY(-50%)",
    },
  },
  sidelineThin: {
    file: "SidelineThin.svg",
    animationDuration: 400,
    style: {
      position: "absolute",
      top: "1.3em",
      left: "-3.4em",
      height: "100%",
      width: "auto",
    },
  },
  sidelineBold: {
    file: "SidelineBold.svg",
    animationDuration: 400,
    style: {
      position: "absolute",
      top: "1.3em",
      left: "-3.4em",
      height: "100%",
      width: "auto",
    },
  },
  question: {
    file: "QuestionMark.svg",
    animationDuration: 500,
    style: {
      position: "absolute",
      top: "0%",
      left: "0%",
      width: "120%",
      height: "150%",
    },
  },
};

// Effect groups for random selection
const EFFECT_GROUPS = {
  underline: ['underlineLong', 'underlineThin', 'underlineZigzag', 'underlineCurved'],
  ellipse: ['ellipse', 'ellipseBold', 'ellipseThin'],
  sideline: ['sidelineThin', 'sidelineBold'],
};

/**
 * Resolves an auto variant to a specific effect name.
 * If the variant ends with 'Auto', randomly selects from the corresponding group.
 * Otherwise, returns the variant as-is.
 *
 * @param {string} variant - The variant name (e.g., 'underlineAuto', 'ellipseAuto', or a specific effect)
 * @returns {string} - The resolved effect name
 */
export function resolveAutoVariant(variant) {
  if (!variant || typeof variant !== 'string') {
    return 'underlineLong'; // Default fallback
  }

  // Check if this is an auto variant
  if (variant.endsWith('Auto')) {
    const groupName = variant.slice(0, -4); // Remove 'Auto' suffix
    const group = EFFECT_GROUPS[groupName];

    if (group && group.length > 0) {
      // Randomly select from the group
      const randomIndex = Math.floor(Math.random() * group.length);
      return group[randomIndex];
    }

    console.warn(`Unknown auto variant group: ${groupName}. Using default.`);
    return 'underlineLong';
  }

  // Return the variant as-is if it's not an auto variant
  return variant;
}

const svgTextCache = new Map();
let localStorageAvailable;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const supportsLocalStorage = () => {
  if (localStorageAvailable !== undefined) return localStorageAvailable
  if (!isBrowser) {
    localStorageAvailable = false
    return localStorageAvailable
  }
  try {
    const key = "__text_effect__"
    window.localStorage.setItem(key, key)
    window.localStorage.removeItem(key)
    localStorageAvailable = true
  } catch (error) {
    console.warn("localStorage is unavailable, skipping persistence for text effects")
    localStorageAvailable = false
  }
  return localStorageAvailable
};

async function loadSvg(fileName, basePath) {
  if (!isBrowser) return null
  const cacheKey = `${basePath}/${fileName}`

  if (svgTextCache.has(cacheKey)) {
    return svgTextCache.get(cacheKey)
  }

  let svgText = null

  if (supportsLocalStorage()) {
    svgText = window.localStorage.getItem(`text-effect-${fileName}`)
  }

  if (!svgText) {
    const response = await fetch(cacheKey)
    if (!response.ok) {
      console.error(`Failed to fetch SVG for text effect: ${cacheKey}`)
      return null
    }
    svgText = await response.text()
    if (supportsLocalStorage()) {
      window.localStorage.setItem(`text-effect-${fileName}`, svgText)
    }
  }

  svgTextCache.set(cacheKey, svgText)
  return svgText
};

class TextEffectController {
  constructor(element, config, { basePath }) {
    this.element = element
    this.config = config
    this.basePath = basePath

    this.currentFrame = 0
    this.currentLayerIndex = 0
    this.currentFrameIndex = 0
    this.framePlaybackActive = false
    this.totalFrames = 0
    this.layers = []
    this.frameCount = 0
    this.running = false
    this.svg = null
    this.rafId = null
    this.lastFrame = 0
    this.fpsInterval = 1000 / 10
    this.resizeObserver = null
    this.mutationObserver = null
    this.addedPosition = false
    this.lastAnimation = 0
    this.themeChangeTimeout = null
    this.onResize = this.handleResize.bind(this)
    this.onThemeChange = this.handleThemeChange.bind(this)
  }

  async setup() {
    const svgText = await loadSvg(this.config.file, this.basePath)
    if (!svgText) {
      throw new Error(`Unable to load SVG: ${this.config.file}`)
    }

    const parser = new DOMParser()
    const svgElement = parser.parseFromString(svgText, "image/svg+xml").documentElement

    // Remove all <style> elements that contain hardcoded colors
    svgElement.querySelectorAll("style").forEach((styleEl) => styleEl.remove())

    // Clean up all paths immediately to prevent black strokes from CSS classes
    svgElement.querySelectorAll("path").forEach((path) => {
      // Remove class attributes that reference deleted styles
      path.removeAttribute("class")
      // Remove any inline stroke/fill styles
      path.removeAttribute("style")
    })

    this.svg = svgElement
    this.svg.style.pointerEvents = "none"
    this.svg.setAttribute("preserveAspectRatio", "none")
    this.applyStyles(svgElement, this.config.style)

    const firstChild = this.element.firstChild
    this.element.insertBefore(svgElement, firstChild)

    this.ensurePositioning()
    this.updateColor()

    const allPaths = Array.from(svgElement.querySelectorAll("path"))
    const groupElements = Array.from(svgElement.querySelectorAll("g"))

    const configLayerCount = Number(this.config.layers)
    const shouldUseGroups =
      (Number.isFinite(configLayerCount) && configLayerCount > 1) ||
      (!Number.isFinite(configLayerCount) && groupElements.length > 1)

    const layerSources = []

    if (shouldUseGroups) {
      groupElements.forEach((group) => {
        const groupPaths = Array.from(group.querySelectorAll("path"))
        if (groupPaths.length) {
          layerSources.push(groupPaths)
        }
      })
    }

    if (!layerSources.length) {
      layerSources.push(allPaths)
    } else {
      const assigned = new Set(
        layerSources.reduce((acc, group) => acc.concat(group), []),
      )
      const remaining = allPaths.filter((path) => !assigned.has(path))
      if (remaining.length) {
        layerSources[0].push(...remaining)
      }
    }

    this.layers = layerSources
      .map((paths) => this.createLayer(paths))
      .filter(Boolean)

    if (!this.layers.length) {
      throw new Error(`Text effect SVG ${this.config.file} does not contain a path element`)
    }

    this.frameCount = this.layers.reduce(
      (max, layer) => Math.max(max, layer.frames.length),
      0
    )
    this.totalFrames = this.layers.reduce(
      (sum, layer) => sum + layer.frames.length,
      0
    )
    this.resetFrameState()

    this.startRaf()
    this.attachResize()
    this.attachThemeObserver()

    // Delay size calculation to ensure fonts and layout are fully loaded
    setTimeout(() => this.setSizes(), 2000)
  }

  createLayer(layerPaths = []) {
    const paths = Array.from(layerPaths).filter(Boolean)
    if (!paths.length) return null

    const frames = []
    paths.forEach((path, index) => {
      const d = path.getAttribute("d")
      if (d) frames.push(d)

      // Remove class that might reference deleted styles
      path.removeAttribute("class")

      // Explicitly set stroke and fill attributes
      path.setAttribute("stroke", "currentColor")
      path.setAttribute("fill", "none")
      path.setAttribute("vector-effect", "non-scaling-stroke")

      // Remove any inline styles that might override
      path.style.stroke = ""
      path.style.fill = ""

      if (index === 0) {
        path.style.opacity = "0"
      } else {
        path.remove()
      }
    })

    const firstPath = paths[0]
    if (!firstPath) return null

    if (frames.length) {
      firstPath.setAttribute("d", frames[0])
    }

    return {
      path: firstPath,
      frames,
      pathLength: 0,
    }
  }

  applyStyles(svgElement, style = {}) {
    svgElement.style.position = "absolute"
    svgElement.style.pointerEvents = "none"
    svgElement.style.display = "block"
    svgElement.style.inset = "auto"

    Object.entries(style).forEach(([key, value]) => {
      svgElement.style[key] = value
    })
  }

  ensurePositioning() {
    const computed = window.getComputedStyle(this.element)
    if (computed.position === "static") {
      this.element.style.position = "relative"
      this.addedPosition = true
    }
  }

  attachResize() {
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => {
        this.setSizes()
        this.updateColor()
      })
      this.resizeObserver.observe(this.element)
    } else {
      window.addEventListener("resize", this.onResize)
    }
  }

  attachThemeObserver() {
    if (typeof MutationObserver === "undefined") return

    // Watch for theme changes on both html and body elements
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          const target = mutation.target

          // Check for class changes (body.theme-dark, body.theme-light, body.theme--XX)
          if (mutation.attributeName === "class" && target === document.body) {
            const classList = target.classList
            if (Array.from(classList).some(cls => 
              cls.startsWith("theme-") || cls.startsWith("theme--")
            )) {
              this.handleThemeChange()
            }
          }

          // Check for data-theme changes (html[data-theme])
          if (mutation.attributeName === "data-theme" && target === document.documentElement) {
            this.handleThemeChange()
          }

          // Check for style attribute changes (for inline style theme changes)
          if (mutation.attributeName === "style") {
            this.handleThemeChange()
          }
        }
      }
    })

    // Observe body for class changes
    this.mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    // Observe html for data-theme changes
    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style"],
    })
  }

  handleThemeChange() {
    // Debounce theme change updates to avoid excessive repaints
    if (this.themeChangeTimeout) {
      clearTimeout(this.themeChangeTimeout)
    }
    this.themeChangeTimeout = setTimeout(() => {
      this.updateColor()
      this.themeChangeTimeout = null
    }, 50) // 50ms debounce for smooth transitions
  }

  startRaf() {
    const tick = (time) => {
      this.onRaf(time)
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  onRaf(now) {
    if (!this.layers.length || !this.running || !this.framePlaybackActive) return
    const elapsed = now - this.lastFrame
    if (elapsed < this.fpsInterval) return
    this.lastFrame = now - (elapsed % this.fpsInterval)

    this.advanceFrame()
  }

  shouldPlayFrames() {
    const strategy = this.config.frameStrategy || "random"
    if (strategy === "none") return false
    return this.totalFrames > 1
  }

  setLayerFrame(layer, frameIndex) {
    if (!layer?.path || !layer.frames.length) return
    const frame = layer.frames[frameIndex % layer.frames.length]
    if (frame) {
      layer.path.setAttribute("d", frame)
    }
  }

  updateLayerFrames(frameIndex) {
    this.layers.forEach((layer) => {
      this.setLayerFrame(layer, frameIndex)
    })
  }

  resetFrameState() {
    this.currentFrame = 0
    this.currentLayerIndex = 0
    this.currentFrameIndex = 0
    this.framePlaybackActive = this.shouldPlayFrames()
    const strategy = this.config.frameStrategy || "random"
    if (strategy === "sequential") {
      this.layers.forEach((layer) => this.setLayerFrame(layer, 0))
    } else {
      this.updateLayerFrames(this.currentFrame)
    }
  }

  moveToNextLayer() {
    const loopFrames = this.config.loopFrames !== false
    if (this.currentLayerIndex < this.layers.length - 1) {
      this.currentLayerIndex += 1
      this.currentFrameIndex = 0
      return true
    }
    if (loopFrames) {
      this.currentLayerIndex = 0
      this.currentFrameIndex = 0
      return true
    }
    this.framePlaybackActive = false
    return false
  }

  advanceFrameSequential() {
    if (!this.layers.length) {
      this.framePlaybackActive = false
      return
    }

    const layer = this.layers[this.currentLayerIndex]
    if (!layer || !layer.frames.length) {
      this.moveToNextLayer()
      return
    }

    const nextFrameIndex = this.currentFrameIndex + 1
    if (nextFrameIndex < layer.frames.length) {
      this.currentFrameIndex = nextFrameIndex
      this.setLayerFrame(layer, this.currentFrameIndex)
      return
    }

    const moved = this.moveToNextLayer()
    if (!moved) return
    const nextLayer = this.layers[this.currentLayerIndex]
    this.setLayerFrame(nextLayer, this.currentFrameIndex)
  }

  advanceFrameRandom() {
    if (!this.frameCount) return
    let targetFrame = Math.floor(Math.random() * this.frameCount)
    if (this.frameCount > 1 && targetFrame === this.currentFrame) {
      targetFrame = (targetFrame + 1) % this.frameCount
    }
    this.currentFrame = targetFrame
    this.updateLayerFrames(this.currentFrame)
  }

  advanceFrame() {
    const strategy = this.config.frameStrategy || "random"
    if (strategy === "sequential") {
      this.advanceFrameSequential()
    } else {
      this.advanceFrameRandom()
    }
  }

  async animatePaths(before, after, targetLayers = this.layers) {
    if (!this.layers.length || !targetLayers?.length) return

    // Track animation ID to prevent conflicts from rapid triggers
    this.lastAnimation++
    const animationId = this.lastAnimation

    const animationDuration = this.config.animationDuration
    const steps = Math.max(1, Math.round((20 * animationDuration) / 1000))
    targetLayers.forEach(({ path }) => {
      if (!path) return
      path.style.transition = `stroke-dashoffset ${animationDuration}ms steps(${steps}), stroke-dasharray ${animationDuration}ms steps(${steps})`
    })

    before?.(targetLayers)
    await new Promise((resolve) => setTimeout(resolve, animationDuration + 10))

    // Only proceed if this is still the latest animation
    if (animationId !== this.lastAnimation) return

    targetLayers.forEach(({ path }) => {
      if (path?.style) {
        path.style.transition = "none"
      }
    })

    after?.(targetLayers)
  }

  async animateIn() {
    if (!this.layers.length || this.running) return
    if (!this.layers.some((layer) => layer.pathLength)) {
      this.setSizes()
    }
    this.resetFrameState()
    this.running = true
    this.framePlaybackActive = this.shouldPlayFrames()

    if (this.config.groupSequence) {
      for (const layer of this.layers) {
        if (!layer) continue
        await this.animatePaths(
          (targetLayers) => {
            targetLayers.forEach((item) => {
              if (!item.path) return
              item.path.style.strokeDashoffset = "0"
              item.path.style.opacity = "1"
            })
          },
          null,
          [layer],
        )
      }
      return
    }

    await this.animatePaths((layers) => {
      layers.forEach((layer) => {
        if (!layer.path) return
        layer.path.style.strokeDashoffset = "0"
        layer.path.style.opacity = "1"
      })
    })
  }

  async animateOut() {
    if (!this.layers.length) return
    if (!this.layers.some((layer) => layer.pathLength)) {
      this.setSizes()
    }
    this.running = false
    this.framePlaybackActive = false
    this.currentLayerIndex = 0
    this.currentFrameIndex = 0

    const targetOrder = this.config.groupSequence
      ? [...this.layers].filter(Boolean).reverse()
      : this.layers

    const animateLayerOut = async (layer) => {
      if (!layer) return
      await this.animatePaths(
        (layers) => {
          layers.forEach((item) => {
            if (!item.path) return
            const length = item.pathLength || 0
            item.path.style.strokeDashoffset = `-${length}`
          })
        },
        (layers) => {
          layers.forEach((item) => {
            if (!item.path) return
            const length = item.pathLength || 0
            item.path.style.opacity = "0"
            item.path.style.strokeDashoffset = `${length}`
          })
        },
        [layer],
      )
    }

    if (this.config.groupSequence) {
      for (const layer of targetOrder) {
        await animateLayerOut(layer)
      }
    } else {
      await this.animatePaths(
        (layers) => {
          layers.forEach((layer) => {
            if (!layer.path) return
            const length = layer.pathLength || 0
            layer.path.style.strokeDashoffset = `-${length}`
          })
        },
        (layers) => {
          layers.forEach((layer) => {
            if (!layer.path) return
            const length = layer.pathLength || 0
            layer.path.style.opacity = "0"
            layer.path.style.strokeDashoffset = `${length}`
          })
        }
      )
    }

    this.updateLayerFrames(0)
  }

  handleResize() {
    this.setSizes()
    this.updateColor()
  }

  setSizes() {
    if (!this.layers.length) return
    const fontSize = parseFloat(window.getComputedStyle(this.element).fontSize) || 16
    const strokeWidth = clamp(fontSize / 16, 1, 2)
    this.layers.forEach((layer) => {
      if (!layer.path) return
      layer.path.setAttribute("stroke-width", `${strokeWidth}`)
      this.updatePathLength(layer)
      const length = layer.pathLength || 0
      layer.path.style.strokeDasharray = `${length}`
      layer.path.style.strokeDashoffset = this.running ? "0" : `${length}`
    })
    this.updateColor()
  }

  updatePathLength(layer) {
    if (!layer?.path) return
    const rect = layer.path.getBoundingClientRect()
    const box = layer.path.getBBox()
    const hasDimensions = box.width !== 0 && box.height !== 0
    const widthScale = hasDimensions ? rect.width / box.width : 1
    const heightScale = hasDimensions ? rect.height / box.height : 1
    const scale = (widthScale + heightScale) / 2
    layer.pathLength = layer.path.getTotalLength() * scale * 1.2
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    } else {
      window.removeEventListener("resize", this.onResize)
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
      this.mutationObserver = null
    }
    if (this.themeChangeTimeout) {
      clearTimeout(this.themeChangeTimeout)
      this.themeChangeTimeout = null
    }
    if (this.svg?.parentNode === this.element) {
      this.svg.remove()
    }
    if (this.addedPosition) {
      this.element.style.position = ""
    }
    this.running = false
    this.layers = []
    this.frameCount = 0
    this.currentFrame = 0
  }

  updateColor() {
    if (!this.svg || !this.element) return
    const computed = window.getComputedStyle(this.element)
    if (computed.color) {
      this.svg.style.color = computed.color
    }
  }
}

export function useTextEffect(options = {}) {
  const {
    variant = "underlineLong",
    trigger = "hover",
    basePath = "/text-effects",
    initiallyVisible = false,
    visibilityRootMargin = "0px 0px -33%",
    visibilityThreshold = 0,
    customEffect,
  } = options

  const effectRef = useRef(null)
  const [node, setNode] = useState(null)
  const [ready, setReady] = useState(false)

  const setRef = useCallback((value) => {
    setNode(value)
  }, [])

  useEffect(() => {
    if (!isBrowser || !node) return undefined

    const config = customEffect ?? EFFECTS[variant]
    if (!config) {
      const message = customEffect
        ? "Invalid text effect config provided to useTextEffect"
        : `Unknown text effect variant: ${variant}`
      console.warn(message)
      return undefined
    }

    if (!config.file) {
      console.warn("Text effect config must include a `file` property")
      return undefined
    }

    const controller = new TextEffectController(node, config, { basePath })
    effectRef.current = controller

    let cancelled = false
    let colorSyncId = null

    const scheduleColorUpdate = () => {
      if (colorSyncId) {
        cancelAnimationFrame(colorSyncId)
      }
      colorSyncId = requestAnimationFrame(() => {
        colorSyncId = null
        controller.updateColor()
      })
    }

    controller
      .setup()
      .then(() => {
        if (cancelled) return
        setReady(true)
        if (trigger === "always" || initiallyVisible) {
          controller.animateIn()
        }
      })
      .catch((error) => {
        console.error("Failed to initialise text effect", error)
      })

    let cleanupHover = null
    let cleanupColorEvents = null
    let observer = null

    if (trigger === "hover") {
      const handleEnter = () => {
        scheduleColorUpdate()
        controller.animateIn()
      }
      const handleLeave = () => {
        scheduleColorUpdate()
        controller.animateOut()
      }
      node.addEventListener("mouseenter", handleEnter)
      node.addEventListener("mouseleave", handleLeave)
      cleanupHover = () => {
        node.removeEventListener("mouseenter", handleEnter)
        node.removeEventListener("mouseleave", handleLeave)
      }
    } else if (trigger === "visible") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target !== node) return
            if (entry.isIntersecting && entry.intersectionRatio > visibilityThreshold) {
              controller.animateIn()
            } else if (!entry.isIntersecting) {
              controller.animateOut()
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
    } else if (trigger === "manual") {
      // No automatic listeners; consumer controls animations
    }

    const colorEvents = ["focus", "blur", "pointerdown", "pointerup", "mouseenter", "mouseleave"]
    colorEvents.forEach((eventName) => {
      node.addEventListener(eventName, scheduleColorUpdate)
    })
    cleanupColorEvents = () => {
      colorEvents.forEach((eventName) => {
        node.removeEventListener(eventName, scheduleColorUpdate)
      })
    }

    return () => {
      cancelled = true
      cleanupHover?.()
      cleanupColorEvents?.()
      observer?.disconnect()
      if (colorSyncId) {
        cancelAnimationFrame(colorSyncId)
      }
      controller.destroy()
      if (effectRef.current === controller) {
        effectRef.current = null
      }
      setReady(false)
    }
  }, [
    node,
    variant,
    trigger,
    basePath,
    initiallyVisible,
    visibilityRootMargin,
    visibilityThreshold,
    customEffect,
  ])

  const controls = useMemo(
    () => ({
      animateIn: () => effectRef.current?.animateIn(),
      animateOut: () => effectRef.current?.animateOut(),
      ready,
      ref: setRef,
    }),
    [ready, setRef]
  )

  return controls
}

// Export available effect variants (including auto variants)
export const textEffectVariants = Object.freeze([
  ...Object.keys(EFFECTS),
  ...Object.keys(EFFECT_GROUPS).map(group => `${group}Auto`),
]);

// Export effect groups for reference
export const textEffectGroups = Object.freeze(EFFECT_GROUPS);
