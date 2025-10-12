import Alpine from 'alpinejs';
import morph from '@alpinejs/morph'
import { getLenis } from "./lenis";
import barba from "@barba/core";
import {globalEvents} from "../events/bus";

const defaultNavColor = 'dark'
export const updateNavColor = () => {
    const store: any = Alpine.store('scroll')

    const elementsAtHeaderPosition = document.elementsFromPoint(0, 100)
    const el = elementsAtHeaderPosition.find((el: HTMLElement) => el.dataset.navColor) as HTMLElement
    store.navColor = el ? el.dataset.navColor : defaultNavColor
}

const touchMatch = window.matchMedia('(hover: none)')
export const device = Alpine.reactive({
    touchScreenOnly: touchMatch.matches,
})
Alpine.store('device', device);
touchMatch.addEventListener('change', () => {
    device.touchScreenOnly = touchMatch.matches
})

export default function alpine() {
    Alpine.plugin(morph)
    Alpine.store('scroll', {
        value: window.scrollY,
        direction: -1,
        velocity: 0,
        navColor: defaultNavColor,
    });
    Alpine.store('route', {
        namespace: null
    })
    Alpine.magic('lenis', () => getLenis())
    Alpine.magic('barba', () => barba)
    Alpine.magic('getData', () => (el: HTMLElement) => Alpine.closestDataStack(el)[0])

    const scrollStore: any = Alpine.store('scroll');
    const lenis = getLenis()
    lenis.on('scroll', () => {
        scrollStore.direction = Math.sign(lenis.animatedScroll - scrollStore.value);
        scrollStore.value = lenis.animatedScroll
        scrollStore.velocity = lenis.velocity
        updateNavColor()
    });

    const routeStore = Alpine.store('route') as any
    routeStore.namespace = barba.data.current.namespace
    barba.hooks.beforeEnter((data) => {
        routeStore.namespace = data.next.namespace
    })

    barba.hooks.after(() => {
        setTimeout(updateNavColor, 100)
    })

    Alpine.start()

    // @ts-expect-error Devtools
    window.Alpine = Alpine

    updateNavColor();
    globalEvents.subscribe('pageReady', updateNavColor);

}
