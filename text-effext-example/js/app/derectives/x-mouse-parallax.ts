import followCursor from "../modules/followCursor";
import { AlpineDirective } from "./AlpineDirective";

export default class MouseParallax extends AlpineDirective {
    onMount() {
        const parallaxElements = this.element.querySelectorAll('[data-parallax]')

        const mousePosition = followCursor.getMousePosition(0.1)
        this.utilities.effect(() => {
            const x = (mousePosition.x - window.innerWidth / 2) / (window.innerWidth / 2)
            const y = (mousePosition.y - window.innerHeight / 2) / (window.innerHeight / 2)

            parallaxElements.forEach((parallaxElement: HTMLElement) => {
                const parallaxAmount = parseFloat(parallaxElement.dataset.parallax)
                parallaxElement.style.transform = `translate(${x * parallaxAmount}px, ${y * parallaxAmount}px)`
            })
        })
    }
}