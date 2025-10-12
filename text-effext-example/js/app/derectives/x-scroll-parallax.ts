import { animate, scroll, type AnimationControls } from 'motion';
import { getBreakpointValue } from "../utils/breakpoints";
import { AlpineDirective } from "./AlpineDirective";
import { needsFeature } from '../modules/features';
import { declareElementMovesOnScroll } from '../animation/scroll/elementMovesOnScroll';

@needsFeature('parallax')
export default class ScrollParallax extends AlpineDirective {
    anim?: AnimationControls;
    stopScrollListener?: () => void
    direction: 'center' | 'forward' | 'backward';
    media?: MediaQueryList;
    create(): void {
        declareElementMovesOnScroll(this.element)
    }
    async onMount() {
        this.direction = (this.params.value as typeof this.direction) || 'center'
        const breakpoint = getBreakpointValue(this.params.modifiers)
        if (breakpoint) {
            this.media = window.matchMedia(`(min-width: ${breakpoint})`)
        }
        this.setupParallax()
    }
    onResize() {
        this.destroyParallax()
        this.setupParallax()
    }

    get enabled() {
        if (!this.media) return true
        return this.media.matches
    }

    computeAmplitude() {
        const amplitudeParam = parseFloat(this.params.expression)
        let amplitude: number
        let unit: 'px' | '%'
        if (this.params.expression.endsWith('%')) {
            unit = '%'
            amplitude = amplitudeParam
        } else {
            const referenceWindowHeight = 1040;
            unit = 'px'
            amplitude = Math.round((amplitudeParam * window.innerHeight) / referenceWindowHeight)
        }
        this.element.style.setProperty('--parallax-amplitude', amplitude.toString() + unit)
        return {
            get val() { return amplitude + unit },
            get doubleVal() { return 2 * amplitude + unit },
            get negativeVal() { return -1 * amplitude + unit },
            get doubleNegativeVal() { return -2 * amplitude + unit },
        }
    }
    setupParallax() {
        if (!this.enabled) return
        const amplitude = this.computeAmplitude()
        let y
        switch (this.direction) {
            case 'forward':
                y = [0, amplitude.doubleVal]
                break
            case 'backward':
                y = [amplitude.doubleNegativeVal, 0]
                break
            case 'center':
            default:
                y = [amplitude.negativeVal, amplitude.val]
        }
        this.anim = animate(this.element, {
            transform: [`translateY(${y[0]})`, `translateY(${y[1]})`],
        })
        const parent = this.hasModifier('parent')
        this.stopScrollListener = scroll(this.anim, {
            offset: ['start end', 'end start'],
            target: parent ? this.element.parentElement : this.element
        })
    }
    destroyParallax() {
        this.anim?.cancel()
        this.anim = null
        this.stopScrollListener?.()
    }
    onUnmount(): void {
        this.anim?.stop()
        this.anim = null
        this.stopScrollListener?.()
        this.stopScrollListener = null
    }
} 