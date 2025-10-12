import type Lenis from "lenis";
import { needsFeature } from "../modules/features";
import { AlpineDirective } from "./AlpineDirective";

// @unocss-include
/**
 * @directive "Scrolling Text"
 * Makes the text infinite scroll horizontally
*/
@needsFeature('scrollingText')
export default class ScrollingText extends AlpineDirective {

    contentDiv: HTMLDivElement;
    text: string;

    spacingClass = 'pr-0.25em';
    textWidth: number;
    animationDuration: number;

    transform = 0;
    playbackRate = 1;

    onMount() {
        this.text = this.element.textContent ?? ''
        this.element.classList.add('relative')
        this.contentDiv = document.createElement('div')
        this.contentDiv.className = 'absolute top-0 left-0 whitespace-nowrap flex'
        this.element.innerHTML = ''
        this.element.appendChild(this.contentDiv)

        this.contentDiv.innerText = this.text
        this.contentDiv.classList.add(this.spacingClass)
        this.textWidth = this.contentDiv.offsetWidth
        this.contentDiv.classList.remove(this.spacingClass)
        this.onResize()

        this.animationDuration = this.text.length / parseFloat(this.params.expression ?? '1')
        this.element.style.height = this.contentDiv.offsetHeight + 4 + 'px'

        // this.animation = animate(this.contentDiv, {
        //     transform: `translateX(-${this.textWidth}px)`,
        // }, {

        //     duration: animationDuration,
        //     easing: 'linear',
        //     repeat: Infinity,
        // })
    }

    onScroll(e: Lenis): void {
        this.playbackRate = (Math.abs(e.velocity) / 5) + 1
    }

    onRaf(e: { delta: number; elapsed: number; }): void {
        // const progress = ((e.elapsed / 1000) / this.animationDuration) % 1
        const addTransform = ((e.delta / 1000) / this.animationDuration) * this.textWidth * this.playbackRate
        this.transform = (this.transform + addTransform) % this.textWidth
        this.contentDiv.style.transform = `translateX(-${this.transform}px)`
    }

    onResize() {
        const ratio = this.element.offsetWidth / this.textWidth
        const displayTimes = Math.ceil(ratio) + 1
        this.contentDiv.innerHTML = ''
        for (let i = 0; i < displayTimes; i++) {
            const block = document.createElement('span')
            block.className = `block whitespace-nowrap shrink-0 ` + this.spacingClass
            block.innerHTML = this.text.trim()
            this.contentDiv.appendChild(block)
        }
    }
    onUnmount(): void {
        this.contentDiv = null
    }
}