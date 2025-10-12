import { lerp } from "../animation";
import { needsFeature } from "../modules/features";
import { getLenis } from "../modules/lenis";
import { AlpineDirective } from "./AlpineDirective";

/**
 * @directive "Scroll lerp"
 */
// @unocss-include
@needsFeature('scrollLerp')
export default class ScrollLerp extends AlpineDirective {
    async onMount() {
        if (!this.params.value) {
            this.setupScrollLerp(this.element, this.params.expression ?? -1)
        } else if (this.params.value === 'lines') {
            // if (!this.element.getAttribute('x-split-lines')) {
            //     this.element.setAttribute('x-split-lines', '')
            //     await nextTick()
            // }
            // const lines = this.element.querySelectorAll('.line')
            // lines.forEach((line: HTMLElement, i) => {
            //     const lerpLine = document.createElement('span')
            //     line.parentNode.insertBefore(lerpLine, line)
            //     lerpLine.classList.add('line')
            //     this.setupScrollLerp(lerpLine, `($store.scroll.direction > 0 ? ${-i} : ${-lines.length + 1 + i}) * ${this.params.expression}`)
            // })
        }
    }
    setupScrollLerp(elements: HTMLElement | HTMLElement[], expression: string | number) {
        if (!Array.isArray(elements)) elements = [elements]
        let target = 0
        let transform = 0
        const { evaluate, evaluateLater, effect } = this.utilities
        let amount = evaluate(expression.toString()) as number * -1
        let getAmount = evaluateLater(expression.toString())
        effect(() => {
            getAmount((n: number) => {
                amount = n * -1
            })
        })

        // this.addScrollListener((e) => {
        //     console.log()
        //     target = e.velocity * amount
        // })

        const lenis = getLenis()
        let lastScroll = lenis.animatedScroll
        let lastScrolled = Date.now()
        this.addEventListenerTo(window, 'scroll', () => {
            lastScrolled = Date.now()
            const velocity = lenis.animatedScroll - lastScroll
            lastScroll = lenis.animatedScroll
            target = velocity * amount
        })
        this.addRafFn(() => {
            if (target !== 0 && Date.now() - lastScrolled > 10) {
                target = 0
            };

            transform = lerp(transform, target, 0.1)
                ; (elements as HTMLElement[]).forEach(element => {
                    element.style.transform = `translateY(${transform}px)`
                })
        })

    }
}