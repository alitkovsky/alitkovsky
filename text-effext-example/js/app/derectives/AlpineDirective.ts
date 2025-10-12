import type Lenis from "lenis";
import AlpineInstance from "alpinejs";
import { EventName, EventTypes } from "../events/allEvents";
import { globalEvents } from "../events/bus";
import { getLenis } from "../modules/lenis";
import { getStackTrace, wnkWarn } from "../utils/functions";

type Handler = ((e: CustomEvent) => void) | ((e: Event) => void)
export abstract class AlpineDirective {
    protected unMounted = false

    protected revealParent?: HTMLElement;
    get isInsideReveal() { return !!this.revealParent }

    // Event listeners
    private eventListenersCleaners: (() => void)[] = [];

    // Parent class Stuff
    constructor(public element: HTMLElement, protected params: DirectiveParameters, protected utilities: DirectiveUtilities) {
        this.detectRevealParent()

        globalEvents.once('mountDirectives', this.onMountSignal.bind(this))
        utilities.cleanup(() => {
            this.destroy()
        })
    }

    private async onMountSignal() {
        globalEvents.publish('registerMountDirective', this)
        await this.onMount?.()
        this.bindBuiltInEvents()
        globalEvents.publish('directiveMounted', this)
    }
    private async destroy() {
        this.onUnmount?.()
        this.removeEventListeners()
        this.element = null
        this.params = null
        this.utilities = null
        this.unMounted = true
    }

    // Lifecycle stuff
    create?(): void
    onMount?(): void
    onPageReady?(): void
    onTransitionLeave?(transitionName?: string, nextPageColor?: string): void
    onUnmount?(): void

    // Built in event listeners
    onResize?(e: UIEvent): void
    onScroll?(e: Lenis): void
    onRaf?(e: { delta: number, elapsed: number }): void

    onRevealStart?(): void
    onRevealEnd?(): void

    private bindBuiltInEvents() {
        if (this.onScroll) {
            this.addScrollListener(this.onScroll.bind(this), true)
        }
        if (this.onResize) {
            this.addEventListenerTo(window, 'resize', this.onResize.bind(this), undefined, true)
        }
        if (this.onRaf) {
            this.addRafFn(this.onRaf.bind(this), true)
        }
        if (this.onPageReady) {
            globalEvents.once('pageReady', this.onPageReady.bind(this))
        }
        if (this.onTransitionLeave) {
            this.addEventListenerTo(window, 'barba-start', (e: CustomEvent) => {
                this.onTransitionLeave(e.detail.name, e.detail.nextPageColor)
            }, undefined, true)
        }

        if (this.revealParent) {
            if (this.onRevealStart) {
                this.addEventListenerTo(this.revealParent, 'reveal-start', this.onRevealStart.bind(this), undefined, true)
            }
            if (this.onRevealEnd) {
                this.addEventListenerTo(this.revealParent, 'reveal-end', this.onRevealEnd.bind(this), undefined, true)
            }
        }
    }

    private detectRevealParent() {
        this.revealParent = this.element.closest('[data-reveal]')
    }

    private removeEventListeners() {
        this.eventListenersCleaners.forEach(cleaner => cleaner())
        this.eventListenersCleaners = null
    }

    protected addEventListenerTo(target: EventTarget, event: string, handler: Handler, options?: boolean | AddEventListenerOptions, ignoreRebindWarning = false) {
        if (!ignoreRebindWarning && target === window && (event === 'resize' || event === 'barba-start')) {
            if (handler.name.includes('bound onResize') || handler.toString().includes('this.onResize')) {
                wnkWarn('It seems that you are manually binding the 𝗼𝗻𝗥𝗲𝘀𝗶𝘇𝗲 method to the window resize event. This is not necessary as it is automatically bound.\n' + getStackTrace()[1])
            }
            if (handler.name.includes('bound onTransitionLeave') || handler.toString().includes('this.onTransitionLeave')) {
                wnkWarn('It seems that you are manually binding the onTransitionLeave method to the window resize event. This is not necessary as it is automatically bound.\n' + getStackTrace()[1])
            }
        }
        target.addEventListener(event, handler, options);
        this.eventListenersCleaners.push(() => target.removeEventListener(event, handler, options))
    }
    protected addEventListener(event: string, handler: Handler, options?: boolean | AddEventListenerOptions): void {
        this.addEventListenerTo(this.element, event, handler, options)
    }
    protected onGlobal<T extends EventName>(event: T, handler: (e: EventTypes[T]) => void) {
        const unsubscribe = globalEvents.subscribe(event, handler)
        this.eventListenersCleaners.push(unsubscribe)
        return unsubscribe
    }
    protected addScrollListener(handler: (e: Lenis) => void, ignoreRebindWarning = false) {
        if (!ignoreRebindWarning) {
            if (handler.name.includes('bound onScroll') || handler.toString().includes('this.onScroll')) {
                wnkWarn('It seems that you are manually binding the 𝗼𝗻𝗦𝗰𝗿𝗼𝗹𝗹 method. This is not necessary as it is automatically bound.\n' + getStackTrace()[1])
            }
        }
        this.eventListenersCleaners.push(getLenis().on('scroll', handler))
    }
    protected addRafFn(handler: (Data: { delta: number, elapsed: number }) => void, ignoreRebindWarning = false) {
        if (!ignoreRebindWarning) {
            if (handler.name.includes('bound onRaf') || handler.toString().includes('this.onRaf')) {
                wnkWarn('It seems that you are manually binding the 𝗼𝗻𝗥𝗮𝗳 method. This is not necessary as it is automatically bound.\n' + getStackTrace()[1])
            }
        }
        let rafId: number;
        let lastTime = performance.now();
        const frame = (elapsed) => {
            const delta = elapsed - lastTime;
            handler({ elapsed, delta });
            lastTime = elapsed;
            rafId = requestAnimationFrame(frame);
        };
        rafId = requestAnimationFrame(frame);
        this.eventListenersCleaners.push(() => cancelAnimationFrame(rafId));
    }

    // Directive utils
    /**
     * Gets the value of a modifier, with support for default value
     * The syntax is: x-foo.modifier.value
     * More about modifiers: https://alpinejs.dev/advanced/extending#custom-directives:~:text=x%2Dfoo%3Abar-,modifiers,-An%20array%20of
     * @param modifier The name of the modifier
     * @param defaultVal The default value to return if the modifier is not present
     * @returns The value of the modifier, or the default value if the modifier is not present. Null otherwise
     */
    protected getModifierValue<T = any>(
        modifier: string,
        defaultVal: T = null
    ): T {
        const { modifiers } = this.params;
        const index = modifiers.indexOf(modifier);
        if (index === -1) {
            return defaultVal;
        }
        let value: number | string = modifiers[index + 1];
        if (typeof defaultVal === "number") {
            value = parseFloat(value);
        }
        return value as T;
    }
    protected hasModifier(modifier: string): boolean {
        return this.params.modifiers.includes(modifier)
    }
}

export interface DirectiveUtilities {
    Alpine: typeof AlpineInstance;
    effect: (callback: () => void) => void;
    cleanup: (callback: () => void) => void;
    evaluate: (expression: string) => unknown;
    evaluateLater: (expression: string) => (result: unknown) => void;
}
export interface DirectiveParameters {
    value: string;
    modifiers: string[];
    expression: string;
    original: string;
    type: string;
}
