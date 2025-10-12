import { AnimationControls, OnScroll, animate, scroll, timeline } from "motion";
import { EventPayload } from "../events/allEvents";
import { globalEvents } from "../events/bus";
import { ifFeature } from "../modules/features";
import { DomImage } from "../three/components/DomImage";
import { AlpineDirective, DirectiveParameters, DirectiveUtilities } from "./AlpineDirective";
import { imageLoaded } from "../utils/functions";

abstract class ImagesCommmon extends AlpineDirective {
    declare element: HTMLImageElement
    cleanupParallax: VoidFunction;

    setupParallax(animation: AnimationControls | OnScroll) {
        this.cleanupParallax = scroll(animation as any, {
            target: this.element,
            offset: ['start end', 'end start']
        })
    }

    onUnmount(): void {
        this.cleanupParallax?.()
    }

    setupScroll?(parallax: number): void

    onScrollProgress(progress: number) {
        throw new Error('Not implemented !')
    }
}

class Image extends ImagesCommmon {
    image: DomImage;

    async onMount() {
        this.element.style.opacity = '0'
        const [{ DomImage }] = await Promise.all([
            import('../three/components/DomImage')
        ])
        this.image = new DomImage(this.element, this.isInsideReveal, this.hasModifier('static'))
        this.onGlobal('barbaTransitionToImage', this.onLeaveToProject.bind(this))
        this.image.setScaleOrigin(this.params.expression)

        if (this.hasModifier('parallax')) {
            const parallax = this.getModifierValue('parallax', 0) / 100
            this.image.setParallaxAmount(parallax)
            super.setupParallax(({ y }) => {
                this.image.setParallaxProgress(y.progress)
            })
        }
    }

    onRevealStart(): void {
        this.image.onResize()
        this.image.animateIn()
    }

    onTransitionLeave(transitionName: string) {
        if (transitionName === 'to-project') {
            return
        }
        setTimeout(() => {
            this.image.leave()
        }, 500);
    }

    async onLeaveToProject(clickedElement: EventPayload<'barbaTransitionToImage'>) {
        if (clickedElement.contains(this.element)) {
            await this.image.diveTo()
            globalEvents.publish('barbaContinueTransition')
        }
    }

    onUnmount(): void {
        super.onUnmount()
        this.image.destroy()
    }
}

// @unocss-include
class ImageFallback extends ImagesCommmon {
    wrapper: HTMLSpanElement;
    test: string

    create() {
        //this.wrapper.style.borderTop = '2px solid red';
    }

    async onMount() {

        this.element.style.opacity = '0'

        // Creéation du wrapp
        this.wrapper = document.createElement('span')
        this.element.replaceWith(this.wrapper)
        this.wrapper.appendChild(this.element)

        imageLoaded(this.element, () => {
            this.setWrapperStyles();
        })
    }

    setWrapperStyles() {
        if (!this.element || !this.element.nodeType) {
            return
        }
        const imageStyle = getComputedStyle(this.element)

        // Wrapper
        this.wrapper.style.aspectRatio = imageStyle.getPropertyValue('aspect-ratio')
        this.wrapper.style.width = imageStyle.getPropertyValue('width')
        this.wrapper.style.height = imageStyle.getPropertyValue('height')
        this.wrapper.className = 'block relative overflow-clip'
        this.wrapper.style.transformOrigin = this.params.expression

        // Image
        this.element.classList.add('h-full', 'w-full', 'absolute', 'inset-0')
        this.element.style.transformOrigin = this.params.expression

        // Insallation du parallax
        if (this.hasModifier('parallax')) {
            this.element.style.aspectRatio = 'auto';
            const parallax = this.getModifierValue('parallax', 0)
            this.element.style.height = (100 + (parallax * 2)) + "%"
            super.setupParallax(animate(this.element, {
                y: [`${-parallax}%`, `0`]
            }))
        }

    }

    onRevealStart(): void {

        timeline([
            [this.element, {
                opacity: [0, 1],
            }, {
                duration: 0.4,
                at: 0
            }],
            [this.element, { scale: [1.6, 1] }, {
                at: 0,
                duration: 1.8,
                easing: power4.out
            }],
            [this.wrapper, { scale: [0.8, 1] }, {
                at: 0,
                duration: 1.8,
                easing: power4.out
            }],
        ],)
    }
}



export default ifFeature('images3d', Image, ImageFallback)