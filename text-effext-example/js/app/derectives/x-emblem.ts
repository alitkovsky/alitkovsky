import type {noop} from "lodash";
import {AnimationControls, animate, scroll, spring} from "motion";
import {clamp} from "../animation";
import {canIUse, ifFeature} from "../modules/features";
import type Emblem3D from "../three/components/EmblemSpotLight";
import {AlpineDirective} from "./AlpineDirective";
import {animateObjectTo} from "../animation/motionExtends";
import followCursor from "../modules/followCursor";

// @unocss-include
class EmblemCommon extends AlpineDirective {
    private cleanScroll: typeof noop;
    protected isVisible = false

    onResize(_: Event = undefined, distanceOffset = 0) {
        if (!this.isVisible) return
        this.cleanScroll?.()
        const emblemMask = document.querySelector('[data-emblem-mask]')
        if (!emblemMask) return
        const maskRect = emblemMask.getBoundingClientRect()
        const emblemRect = this.element.getBoundingClientRect()
        const distance = (window.scrollY + maskRect.top + maskRect.height) - emblemRect.top - emblemRect.height - 32 + distanceOffset
        this.cleanScroll = scroll(({y}) => {
            const progress = clamp(y.current / distance, 0, 1)
            this.onScrollProgress(progress)
        }, {
            axis: 'y',
        })
    }

    onScrollProgress(progress: number) {
    }

    onRevealStart(): void {
        this.isVisible = true
    }

    onRevealEnd(): void {
        this.isVisible = false
    }

    onTransitionLeave(transitionName?: string, nextPageColor?: string): void {
        this.cleanScroll?.()
        this.cleanScroll = null

    }

    onUnmount(): void {
        this.cleanScroll?.()
        this.cleanScroll = null
    }
}

class EmblemFallback extends EmblemCommon {

    image: HTMLImageElement;
    animation: AnimationControls

    onMount(): void {
        this.image = document.createElement('img')
        this.image.src = window.wnkExposed.themePath + '/www/img/3Demblem.png'
        this.image.className = 'w-full h-full object-contain block opacity-0 ease-power3-out'
        this.element.appendChild(this.image)
        this.element.style.pointerEvents = 'none'
        this.element.style.zIndex = '0'
        this.element.classList.add('absolute')
    }

    async onRevealStart() {
        this.image.classList.remove('opacity-0')
        this.animation = animate(this.image, {
            opacity: [0, 1],
            y: [32, 0]
        }, {
            duration: 1,
            easing: power3.out
        })
        await this.animation.finished
        super.onRevealStart()
        this.onResize()
    }
}

class Emblem extends EmblemCommon {
    private emblem: Emblem3D;
    private cursorTextAnim: AnimationControls = null

    create() {
        this.element.classList.add('fixed')
    }

    async onMount() {
        this.element.style.zIndex = "10"
        const {default: Emblem3D} = await import('../three/components/EmblemSpotLight');
        this.emblem = new Emblem3D(this.element);
        await this.emblem.onLoad()
        this.bind()
    }

    onScrollProgress(progress: number): void {
        this.emblem.opacity = 1 - progress
        this.emblem.twistYOrigin = 0
        this.emblem.twistMesh(progress * -2)
        this.element.classList.toggle('pointer-events-none', progress > 0)
        this.emblem.offsetY = this.emblem.canvas.screenToWorld(0, 0.8 * progress).y
    }

    bind() {
        // Mouse
        this.addEventListener("mousedown", this.onClickStart.bind(this));
        this.addEventListener("mouseup", this.onClickEnd.bind(this));
        this.addEventListener("mouseleave", this.onMouseLeave.bind(this));

        this.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            return false
        })
    }

    onClickStart(e: MouseEvent) {
        this.cursorTextAnim?.stop()
        this.cursorTextAnim = null
        this.emblem.startTwisting(
            (e.offsetX / this.element.clientWidth) * 2 - 1,
            (e.offsetY / this.element.clientHeight) * -2 + 1
        );
        this.cursorTextAnim = animateObjectTo({scale: followCursor.scale}, {scale: 2}, {
            duration: 4,
            easing: power5.out,
            onUpdate(_, v) {
                followCursor.setScale(v.scale, true)
            },
        })
    }

    onClickEnd(e: MouseEvent) {
        this.cursorTextAnim?.stop()
        this.cursorTextAnim = null
        this.emblem.stopTwisting();

        this.cursorTextAnim = animateObjectTo({scale: followCursor.scale}, {scale: 8}, {
            onUpdate(_, v) {
                followCursor.setScale(v.scale, true)
            },
            easing: spring({
                stiffness: 1000,
                mass: 0.8,
                damping: 16,
                velocity: 40
            })
        })
    }

    onMouseLeave() {
        this.cursorTextAnim?.stop()
        this.cursorTextAnim = null
        this.emblem.stopTwisting();
        followCursor.setScale(1)
    }

    onRevealStart() {
        super.onRevealStart()
        this.onResize()
        this.emblem.enter()
    }

    onResize(_: Event = undefined) {
        const offset = window.innerHeight * 0.2
        super.onResize(_, offset);
    }

    onTransitionLeave(name, nextPageColor) {
        this.emblem.leave(nextPageColor);
        super.onTransitionLeave()
    }

    onUnmount() {
        this.emblem.destroy();
        this.emblem = null;
        super.onUnmount()
    }
}

class EmblemToLoad extends EmblemCommon {
    public goodOne: null;

    create() {
        this.goodOne = ifFeature('emblem', Emblem, EmblemFallback)
    }
}


export default ifFeature('emblem', Emblem, EmblemFallback)
