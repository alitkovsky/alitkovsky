import {defineComponent} from ".";
import barba from "@barba/core";
import TextEffect, {EffectName} from "../animation/TextEffect";

function xor(a: any, b: any) {
    return !!a !== !!b;
}

export default defineComponent(() => ({
    menuOpen: false,
    lightNav: true,
    menuLinks: [] as HTMLAnchorElement[],
    currentLink: undefined,

    hoverEffects: new Map<HTMLElement, TextEffect>(),
    activeEffects: new Map<HTMLElement, TextEffect>(),

    async init() {
        this.menuLinks = Array.from(this.$refs.mainNav.querySelectorAll('a'))
        this.menuLinks.forEach(element => {
            // prevent default effect
            element.dataset.effectCustom = ''
        });

        await this.createEffects()

        barba.hooks.beforeLeave(() => {
            this.activeEffects?.forEach(effect => effect.animateOut())
        })
        barba.hooks.beforeEnter(() => {
            this.updateCurrent()
        })
        this.updateCurrent()

        // @ts-ignore
        Alpine.effect(() => {
            this.lightNav = xor(this.menuOpen, (this.$store.scroll.navColor as string) === 'light')
        })
    },

    async createEffects() {
        const effectsNames: EffectName[] = ['rounded', 'roundedSmall', 'roundedFat'] as const
        const setups = []
        this.menuLinks.forEach((link, i) => {
            const hoverEffect = new TextEffect(link, effectsNames[i % effectsNames.length])
            const activeEffect = new TextEffect(link, 'linethrough')
            this.hoverEffects.set(link, hoverEffect)
            this.activeEffects.set(link, activeEffect)
            setups.push(hoverEffect.setupEffect(), activeEffect.setupEffect())
            link.addEventListener('mouseover', () => {
                this.onLinkHover(link)
            })
            link.addEventListener('mouseout', () => {
                this.onLinkOut(link)
            })
        })
        await Promise.all(setups)
    },

    onLinkHover(link: HTMLElement) {
        this.hoverEffects.get(link)?.animateIn()
    },
    onLinkOut(link: HTMLElement) {
        this.hoverEffects.get(link)?.animateOut()
    },

    updateCurrent() {
        const currentLink = this.menuLinks.find((link) => {
            const url = new URL(link.getAttribute('href'))
            return window.location.pathname.startsWith(url.pathname)
        })
        this.currentLink = currentLink
        if (currentLink) {
            this.activeEffects.get(currentLink)?.animateIn()
        }
    },

    get scrolled() {
        return this.$store.scroll.value > 50
    },
    /*get lightNav() {
        // @ts-ignore TS does not handle ^operator correctly
        return xor(this.menuOpen, (this.$store.scroll.navColor as string) === 'light')
    },*/
    get topBarHidden() {
        return (
            !this.menuOpen &&
            this.scrolled &&
            this.$store.scroll.direction > 0
        )
    },
    toggleMenu(set) {
        this.menuOpen = set ?? !this.menuOpen
        document.body.classList.toggle('overflow-hidden', this.menuOpen)
    }
}))