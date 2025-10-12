import Alpine from "alpinejs";
import type Lenis from "lenis";
import { animate } from "motion";
import { Color } from "three/src/math/Color";
import { needsFeature } from "../modules/features";
import { AlpineDirective } from "./AlpineDirective";

export const backgroundTransitionDuration = 0.5;

@needsFeature('backgroundTransition')
export default class BackgroundTransition extends AlpineDirective {
    prevColor: any;
    nextColor: any;
    currentColor: any;
    prevData: Record<string | symbol, unknown>[];
    nextData: Record<string | symbol, unknown>[];
    // prevEl: HTMLElement;
    // nextEl: HTMLElement;
    prevEls: HTMLElement[] = [];
    nextEls: HTMLElement[] = [];

    private ready = false;

    onMount() {
        this.getAdjacentBackgrounds()
    }
    onPageReady(): void {
        this.connectToAdjacentBackgrounds()
    }
    onScroll(e: Lenis): void {
        if (!this.ready) return;
        let windowHeight = window.innerHeight;
        const color =
            this.element.getBoundingClientRect().top / windowHeight > 0.5
                ? this.prevColor
                : this.nextColor;
        if (this.currentColor !== color) {
            if (e.direction > 0) {
                this.animateBackground(this.currentColor, color);
            }
            this.currentColor = color;
            this.dispatchColor();
        }
    }

    getAdjacentBackgrounds() {
        let prevEl = this.element.previousElementSibling as HTMLElement;
        this.prevColor = prevEl.getAttribute("x-background");
        do {
            this.prevEls.push(prevEl);
            prevEl = prevEl.previousElementSibling as HTMLElement;
        } while (prevEl && !prevEl.hasAttribute("x-background-transition") && prevEl.getAttribute('x-background') === this.prevColor);

        let nextEl = this.element.nextElementSibling as HTMLElement;
        this.nextColor = nextEl.getAttribute("x-background");
        do {
            this.nextEls.push(nextEl);
            nextEl = nextEl.nextElementSibling as HTMLElement;
        } while (nextEl && !nextEl.hasAttribute("x-background-transition") && nextEl.getAttribute('x-background') === this.nextColor)
        if (
            this.prevEls.length === 0 ||
            this.nextEls.length === 0
        ) {
            console.error(
                "x-background-transition must be used between 2 x-background directives"
            );
            return;
        }
    }
    async connectToAdjacentBackgrounds() {
        this.prevData = this.prevEls.map(el => Alpine.closestDataStack(el)[0]);
        this.nextData = this.nextEls.map(el => Alpine.closestDataStack(el)[0]);

        this.currentColor = this.prevColor;

        this.dispatchColor();
        this.ready = true
    }

    dispatchColor() {
        this.prevData.forEach((data, index) => {
            data.color = this.currentColor;
        })
        this.nextData.forEach((data, index) => {
            data.color = this.currentColor;
        })
        if (this.currentColor === this.prevColor) {
            this.prevEls.forEach(el => {
                el.classList.remove("inverted-bg");
            })
            this.nextEls.forEach(el => {
                el.classList.add("inverted-bg");
            })
        } else {
            this.prevEls.forEach(el => {
                el.classList.add("inverted-bg");
            })
            this.nextEls.forEach(el => {
                el.classList.remove("inverted-bg");
            })
        }
    }

    async animateBackground(from: string, to: string) {
        const value = new Color(to);
        const luminance = value.getHSL({} as any).l;
        const easing = luminance > 0.5 ? power2.in : power2.out;
        await animate(
            document.body,
            { backgroundColor: [from, to] },
            {
                duration: backgroundTransitionDuration,
                easing,
            }
        ).finished;
        document.body.style.backgroundColor = "";
    }
    onUnmount(): void {
        this.prevEls = null;
        this.nextEls = null;
        this.prevData = null;
        this.nextData = null;
        this.prevColor = null;
        this.nextColor = null;
        this.currentColor = null;
    }
}
