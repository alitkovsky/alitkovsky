import '@fancyapps/ui/dist/carousel/carousel.css';
import { AlpineDirective } from "./AlpineDirective";

// Type only import so at runtime the carousel library is only loaded when needed
import type { Carousel } from "@fancyapps/ui";


/**
 * Mobile Carousel
 * Displays a carousel only on mobile
 */
export default class MobileCarousel extends AlpineDirective {
    static Carousel: any;
    carouselInstance: Carousel;

    onMount() {
        this.onResize()
    }
    onResize() {
        let shouldBeActive = window.getComputedStyle(this.element).display !== 'none'
        const maxWidth = parseFloat(this.params.value)
        if (maxWidth) {
            shouldBeActive = shouldBeActive && window.innerWidth <= maxWidth
        }
        if (this.carouselInstance) {
            if (shouldBeActive) {
                return
            }
            this.carouselInstance.destroy()
            this.carouselInstance = null
        } else if (shouldBeActive) {
            this.setupCarousel()
        }
    }
    static async importCarousel() {
        if (!this.Carousel) {
            const { Carousel } = await import('@fancyapps/ui/dist/carousel/carousel.esm.js')
            this.Carousel = Carousel
        }
        return this.Carousel
    }
    async setupCarousel() {
        const Carousel = await MobileCarousel.importCarousel()
        this.carouselInstance = new Carousel(this.element, {
            infinite: false,
            Navigation: false,
            transition: 'fade'
        })
    }

    onUnmount(): void {
        this.carouselInstance?.destroy()
        this.carouselInstance = null
    }
}