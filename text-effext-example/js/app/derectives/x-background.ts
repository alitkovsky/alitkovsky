import Alpine from "alpinejs";
import { nextTick } from "../animation/delay";
import { AlpineDirective } from "./AlpineDirective";
import { getLenis } from "../modules/lenis";
import { getColorLuminance } from "../utils";

const darkTransitionDuration = 0.5
const lightTransitionDuration = 1

export default class Background extends AlpineDirective {
    private static _wrapper: HTMLDivElement;
    data: any;
    square: HTMLDivElement;
    observer: IntersectionObserver;

    static get wrapper() {
        if (!this._wrapper) {
            this._wrapper = document.querySelector('#backgrounds')
        }
        return this._wrapper;
    }

    async onMount() {
        this.square = document.createElement("div");
        this.square.classList.add("background-square");
        // this.square.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        Background.wrapper.appendChild(this.square);

        if (!this.element.getAttribute("x-data")) {
            this.element.setAttribute("x-data", "{}");
        }
        this.addEventListenerTo(window, "load-more", async () => {
            await nextTick();
            await nextTick();
            this.onResize();
        });
        this.element.querySelectorAll("img").forEach((img) => {
            this.addEventListenerTo(img, "load", () => {
                this.onResize();
            })
        })

        // Binding to color changes that can come from x-background-transition
        await nextTick();
        this.data = Alpine.closestDataStack(this.element)[0];
        const { effect, evaluateLater } = this.utilities
        let getColor
        let expression = this.params.expression
        getColor = (c) => c(expression)

        /**
         * Ce truc un peu cryptique permet de réagir à la réactivité: si on passe
         * une variable Alpine, la directive réagira au changement.
         */
        if (expression.includes('#')) {
            getColor = (c) => c(expression)
        } else {
            getColor = evaluateLater(this.params.expression = '(() => {try {return '
                + this.params.expression
                + ';} catch (e) {return "'
                + this.params.expression.replace(/"/g, '\\"')
                + '"}})()')
        }

        effect(() => {
            getColor((color: string) => {
                this.data.color = color
            })
        })
        effect(async () => {
            await this.updateColor();
        });
        this.onResize();

        this.observer = new IntersectionObserver(() => {
            this.onResize()
        })
        this.observer.observe(this.square)
    }
    async onPageReady() {
        setTimeout(() => { // Edge case where the square is not positioned correctly
            this.onResize();
        }, 200);
    }
    onResize() {
        if (!this.element) return
        const rect = this.element.getBoundingClientRect();
        this.square.style.width = `${rect.width}px`;
        this.square.style.height = `${rect.height}px`;
        this.square.style.top = `${rect.top + window.scrollY}px`;
        this.square.style.left = `${rect.left}px`;
    }
    async updateColor() {
        this.element.style.setProperty("--background-color", this.data.color);
        this.element.classList.remove('text-transparent');

        const darkForeground = getColorLuminance(this.data.color) > 0.5;
        this.element.style.setProperty(
            "--foreground-color",
            darkForeground ? "#131313" : "white"
        );
        this.element.style.setProperty(
            "--filter-fg",
            darkForeground ? "invert(1)" : "none"
        );
        this.element.dataset.navColor = darkForeground ? "dark" : "light";

        const maxTransitionDuration = darkForeground ? lightTransitionDuration : darkTransitionDuration
        const minTransitionDuration = 0.2
        const maxVelocity = 50
        const minVelocity = 20
        // @ts-ignore
        const velocity = Math.abs(getLenis().velocity)

        const range = maxVelocity - minVelocity;
        const clampedVelocity = Math.max(minVelocity, Math.min(velocity, maxVelocity));
        const interpolation = (clampedVelocity - minVelocity) / range;
        const transitionDuration = minTransitionDuration + (maxTransitionDuration - minTransitionDuration) * (1 - interpolation);

        this.square.style.transition = 'background-color ' + transitionDuration + 's ease';
        this.square.style.backgroundColor = this.data.color;
    }
    onUnmount(): void {
        this.square.remove();
        this.square = null;
        this.data = null;
        this.observer.disconnect()
        this.observer = null
    }
}
