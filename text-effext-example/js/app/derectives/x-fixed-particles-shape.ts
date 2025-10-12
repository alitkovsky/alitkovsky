import Alpine from "alpinejs";
import { AxisScrollInfo, ScrollInfo, scroll } from "motion";
import { clamp, lerp } from "../animation";
import { needsFeature } from "../modules/features";
import followCursor from "../modules/followCursor";
import SharedParticlesShapeDirective from "./SharedParticlesShapeDirective";

/**
 * @directive "Particles Shape FIxed"
 * Makes the particles take the shape of the provided png when scrolled to
 */

@needsFeature('particlesShape')
export default class FixedParticlesShape extends SharedParticlesShapeDirective {
    shape: string;
    threshold: number;
    yPosition: number = 0;
    yVelocity = 0;
    targetYVelocity = 0;
    visible = false;

    scrollCleaner: (() => void)

    private transitionStarted = false

    private initial = true

    private currentScrollInfo: AxisScrollInfo | null = null
    private _rect: DOMRect
    mouseEffect: any;
    private get rect() {
        if (!this._rect) {
            this._rect = this.element.getBoundingClientRect()
        }
        return this._rect
    }
    private invalidateRect() {
        this._rect = null
    }

    async onMount() {
        super.onMount()
        if (!this.params.expression) {
            console.error('Missing filename for particles shape directive')
            return
        }

        this.shape = this.params.expression

        this.threshold = this.getModifierValue('threshold', 50) / 100


        this.scrollCleaner = scroll(this.onScrollUpdate.bind(this), {
            target: this.element,
            axis: 'y',
            offset: ['start end', 'end start']
        })
        await this.particles?.registerShape(this.shape)


        const mousePosition = followCursor.getMousePosition(0.06)
        let lastPosition = mousePosition.y
        this.mouseEffect = Alpine.effect(() => {
            this.yPosition = clamp(mousePosition.y, 0, window.innerHeight)
            this.targetYVelocity = this.yPosition - lastPosition
            lastPosition = this.yPosition
            this.updatePosition()
        })
    }

    onPageReady(): void {
        this.particles?.setShape(this.shape, false, 1.5)
        this.updatePosition()
        this.updateSize(false)
        this.updateShapeDisplay()
        this.invalidateRect()
    }

    onScrollUpdate(info: ScrollInfo): void {
        this.currentScrollInfo = info.y

        this.updateShapeDisplay()

        this.updatePosition()
        this.invalidateRect()
    }

    updateShapeDisplay() {
        if (!this.currentScrollInfo || !this.particles?.hasShape) return

        if (window.innerWidth < 1024) {
            this.visible = false
            this.particles?.hideShape()
            return
        }

        const { current, targetOffset, targetLength } = this.currentScrollInfo
        const startOffset = clamp((current + window.innerHeight - targetOffset) / window.innerHeight, 0, 1)
        const endOffset = 1 - clamp((current + window.innerHeight - (targetOffset + targetLength)) / window.innerHeight, 0, 1)
        if (startOffset > this.threshold && endOffset > this.threshold) {
            this.visible = true
            this.particles?.showShape()
        } else {
            this.visible = false
            this.particles?.hideShape()
        }
    }

    onTransitionLeave(): void {
        this.transitionStarted = true
        if (this.mouseEffect) {
            Alpine.release(this.mouseEffect)
        }
    }

    onResize(e: UIEvent): void {
        this.updateSize()
        this.updatePosition()
        this.invalidateRect()
    }

    onRaf(e: { delta: number; elapsed: number; }): void {
        if (!this.visible) return
        this.yVelocity = lerp(this.yVelocity, this.targetYVelocity, e.delta * 0.01)
        this.updatePosition()
    }

    updateSize(immediate = true) {
        const { width } = this.rect
        this.particles?.setShapeBounds(width, window.innerHeight, 'contain', immediate)
    }
    updatePosition() {
        if (!this.visible) return
        const { left, width } = this.rect
        this.particles?.setShapeCenter(left + width / 2, this.yPosition, !this.initial)
        this.particles?.setShapeBlur(this.yVelocity * 0.0005, this.yVelocity * 0.008)
        if (this.initial) {
            this.initial = false
        }
    }

    onUnmount(): void {
        super.onUnmount()
        this.scrollCleaner()
        if (this.mouseEffect) {
            Alpine.release(this.mouseEffect)
        }
    }
}