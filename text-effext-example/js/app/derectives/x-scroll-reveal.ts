import type Lenis from "lenis";
import { delay } from "../animation/delay";
import AnimationTriggerDirective from "../animation/scroll/AnimationTriggerDirective";
import { needsFeature } from "../modules/features";


@needsFeature('scrollReveal')
export default class ScrollReveal extends AnimationTriggerDirective {
    margin: string;

    private visible = false
    position = null
    stagger = false

    create(): void {
        this.element.setAttribute('data-reveal', '')
        this.element.querySelectorAll('.line').forEach(line => {
            line.setAttribute('data-reveal', '')
        })
        if (this.hasModifier('stagger')) {
            this.element.querySelectorAll('[stagger-item]').forEach(item => {
                item.setAttribute('data-reveal', '')
            })
        }
    }
    onMount(): void {
        super.onMount('enter')
        this.margin = this.getModifierValue('margin', '-10%')
        this.stagger = this.hasModifier('stagger')
        this.animation.setup(this.element, this.getModifierValue('stagger', 0) / 1000)
        this.animation.createAnimation()

        this.animation.onTargetStart((target) => {
            target.dispatchEvent(new CustomEvent('reveal-start'))
        })
        this.animation.onTargetEnd((target) => {
            target.dispatchEvent(new CustomEvent('reveal-end'))
        })

        this.element.querySelectorAll('image').forEach(image => {
            this.addEventListenerTo(image, 'load', () => {
                this.updateSize()
            })
        })
    }

    parseMargin(elementHeight) {
        if (this.margin.endsWith('%')) {
            return (parseFloat(this.margin) / 100) * elementHeight
        }
        return parseFloat(this.margin)
    }

    updateSize() {
        const { top, height } = this.element.getBoundingClientRect()
        const distanceFromTop = top + window.scrollY
        const margin = this.parseMargin(height)
        this.position = distanceFromTop - margin
    }

    onResize(e: UIEvent): void {
        this.updateSize()
    }

    onScroll(e: Lenis): void {
        if (this.visible || this.position === null) return
        this.checkVisible(e.animatedScroll)
    }

    checkVisible(scrollY) {
        if (scrollY + window.innerHeight > this.position) {
            this.visible = true
            this.doReveal()
        }
    }

    async doReveal() {
        await delay(this.delay)
        if (this.stagger) {
            this.element?.dispatchEvent(new CustomEvent('reveal-start'))
        }
        await this.animation?.play()
        if (this.stagger) {
            this.element?.dispatchEvent(new CustomEvent('reveal-end'))
        }
    }

    onTransitionLeave(): void {
        this.animation?.destroy()
        this.animation = null
    }

    async onPageReady() {
        this.updateSize()
        this.checkVisible(window.scrollY)
    }
}