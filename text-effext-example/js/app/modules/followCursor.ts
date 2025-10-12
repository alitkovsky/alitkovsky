// @unocss-include

import Alpine from "alpinejs";
import throttle from "lodash/throttle";
import { AnimationControls, MotionKeyframesDefinition, animate } from "motion";
import { lerp } from "../animation";
import { createBlob } from "../animation/createBlob";
import { animateObjectTo } from "../animation/motionExtends";
import { device } from "./alpine";
import { getLenis } from "./lenis";

const defaultColor = '#131313'

class MousePosition {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    get normalized() {
        return {
            x: (this.x / window.innerWidth) * 2 - 1,
            y: -(this.y / window.innerHeight) * 2 + 1
        }
    }
}

class FollowCursor {
    private follower: HTMLElement
    private blobPath: SVGPathElement;
    blobSVG: SVGSVGElement;

    private initial = true
    private bound = false // prevent multiple bindings

    running = false // Will not run on touch-only devices

    scale = 1
    private mousePosition = Alpine.reactive(new MousePosition(window.innerWidth / 2, window.innerHeight / 2))
    private lockedPosition?: MousePosition
    blobPosition: MousePosition;
    iconPosition: MousePosition;

    private componentData

    private lerpedPositions = new Map<number, ReturnType<typeof Alpine.reactive<MousePosition>>>()
    isFill: boolean;

    getMousePosition(lerpAmount?: number) {
        if (!lerpAmount) return this.mousePosition

        if (!this.lerpedPositions.has(lerpAmount)) {
            this.lerpedPositions.set(lerpAmount, Alpine.reactive(new MousePosition(
                this.mousePosition.x,
                this.mousePosition.y
            )))
        }
        return this.lerpedPositions.get(lerpAmount)
    }

    get color() {
        return this.componentData.color
    }

    set color(color: string) {
        this.componentData.color = color
    }

    constructor() {
        this.follower = document.querySelector('#cursor-follower')
        this.blobPosition = this.getMousePosition(0.1)
        this.iconPosition = this.getMousePosition(0.2)

        this.componentData = Alpine.reactive({
            icon: '',
            iconSize: 16,
            text: '',
            textScale: 1,
            color: defaultColor,
            blobPosition: this.blobPosition,
            iconPosition: this.iconPosition
        })
        this.initFollowerContent()
        Alpine.data('followCursor', () => this.componentData)


    }
    init() {
        Alpine.effect(() => {
            if (device.touchScreenOnly) {
                this.stop()
            } else {
                this.start()
            }
        })
    }
    private initFollowerContent() {
        this.blobSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.blobSVG.setAttribute('viewBox', '0 0 1000 1000')
        this.blobSVG.id = 'cursor-blob'
        this.blobSVG.style.flexShrink = '0'
        this.blobSVG.style.width = '1.5rem'
        this.blobSVG.style.height = '1.5rem'

        const { path } = createBlob({
            numPoints: 8,
            centerX: 500,
            centerY: 500,
            minRadius: 430,
            maxRadius: 490,
            minDuration: 1,
            maxDuration: 2
        })
        this.blobPath = path
        this.blobSVG.appendChild(path)
        this.blobPath.style.fill = 'transparent'

        this.follower.appendChild(this.blobSVG)

        this.setColor(defaultColor)
        this.setScale(1, true)
    }

    private bind() {
        window.addEventListener('mousemove', throttle(this.onMouseMove.bind(this), 16))
        getLenis().on('scroll', throttle(this.onScroll.bind(this), 500))
    }
    onScroll() {
        if (!this.running) return
        this.matchColorToBackground()
    }
    onMouseMove(e: MouseEvent) {
        if (!this.running) return
        this.mousePosition.x = e.clientX
        this.mousePosition.y = e.clientY

        this.matchColorToBackground()
        if (this.initial) {
            // Put all lerped directly to value
            for (const lerpAmount of this.lerpedPositions.keys()) {
                const lerpedPosition = this.lerpedPositions.get(lerpAmount)
                lerpedPosition.x = this.mousePosition.x
                lerpedPosition.y = this.mousePosition.y
            }
            this.follower.classList.remove('initial')
            this.initial = false
        }
    }

    matchColorToBackground() {
        const { x, y } = this.mousePosition
        const elements = document.elementsFromPoint(x, y)
        const isLight = elements.filter((el: HTMLElement) => el.dataset.navColor === 'light')
        if (isLight.length) {
            this.setColor('#ffffff')
        } else {
            this.setColor(defaultColor)
        }
    }

    async enableFill(invisible = false) {
        const to: MotionKeyframesDefinition = {
            fill: this.color,
        }
        if (!invisible) {
            this.isFill = true
            to.stroke = this.color === '#131313' ? 'white' : '#131313'
        }
        return animate(this.blobPath, to, { duration: 0.2 }).finished
    }
    async disableFill() {
        this.isFill = false
        return animate(this.blobPath, {
            fill: 'transparent',
            stroke: this.color
        }, { duration: 0.2 })
    }

    setColor(color: string) {
        this.color = color
        this.blobPath.style.stroke = color
        if (this.isFill) {
            this.enableFill()
        }
    }

    resetColor() {
        this.setColor(defaultColor)
    }

    setIcon(icon: string) {
        this.componentData.icon = icon
    }
    setText(text: string) {
        this.componentData.text = text
    }

    setTextScale(scale: number) {
        this.componentData.textScale = scale
    }
    getTextScale() {
        return this.componentData.textScale
    }

    setIconSize(size: number) {
        this.componentData.iconSize = size
    }

    hide() {
        this.blobSVG.style.display = 'none'
    }
    show() {
        this.blobSVG.style.display = 'block'
    }
    lockTo(x: number, y: number) {
        this.lockedPosition = new MousePosition(x, y)
    }
    unlock() {
        this.lockedPosition = null
    }

    private scaleAnimation: AnimationControls
    setScale(scale: number, immediate = false) {
        const baseStrokeWidth = 30
        if (this.scaleAnimation) {
            this.scaleAnimation.stop()
            this.scaleAnimation = null
        }
        if (immediate) {
            this.blobSVG.style.transform = `scale(${scale})`
            this.blobPath.setAttribute('stroke-width', `${baseStrokeWidth / scale}`)
            this.scale = scale
            return
        }
        this.scaleAnimation = animateObjectTo(this as FollowCursor, {
            scale: scale,
        }, {
            onUpdate: () => {
                this.blobSVG.style.transform = `scale(${this.scale})`
                this.blobPath.setAttribute('stroke-width', `${baseStrokeWidth / this.scale}`)
            },
            duration: 0.6,
            easing: power3.out
        })
    }

    private start() {
        if (this.running) return
        this.running = true
        if (!this.bound) {
            this.bind()
            this.bound = true
        }
        this.loop()

    }
    private stop() {
        if (!this.running) return
        this.running = false
        this.initial = true
        this.follower.classList.add('initial')
        this.resetColor()
        this.setScale(1)
    }

    private updateLerpedPositions() {
        const { x, y } = this.lockedPosition ?? this.mousePosition
        for (const lerpAmount of this.lerpedPositions.keys()) {
            const lerpedPosition = this.lerpedPositions.get(lerpAmount)
            // Lerp using amount
            lerpedPosition.x = lerp(lerpedPosition.x, x, lerpAmount)
            lerpedPosition.y = lerp(lerpedPosition.y, y, lerpAmount)
        }
    }

    private update() {
        this.updateLerpedPositions()
        this.follower.style.transform = `translate(${this.blobPosition.x}px, ${this.blobPosition.y}px)`
    }

    private loop() {
        if (!this.running) return
        this.update()
        requestAnimationFrame(this.loop.bind(this))
    }

}

export default new FollowCursor()