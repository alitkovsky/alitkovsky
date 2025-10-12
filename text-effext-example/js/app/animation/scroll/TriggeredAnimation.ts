import { AnimationControls, AnimationOptions, MotionKeyframesDefinition, animate, stagger } from "motion";
import type ScrollReveal from "../../directives/scroll-reveal";
import { resolveElements } from "../../utils/functions";
import { EventBus } from "../../events/bus";

/**
 * These animations are tied to the {@link ScrollReveal} directive, with a normalized behavior.
 */

// Base class
export abstract class TriggeredAnimation {
    targets: HTMLElement[] | NodeListOf<HTMLElement>
    keyframes: MotionKeyframesDefinition = {}
    animationOptions: AnimationOptions = { autoplay: false }
    animation: AnimationControls = null;

    needsSplitLines = false

    stagger: number = 0

    protected bus = new EventBus<{
        startTarget: HTMLElement
        endTarget: HTMLElement
    }>()

    protected addKeyframes(keyframes: MotionKeyframesDefinition) {
        this.keyframes = {
            ...this.keyframes,
            ...keyframes
        }
    }

    protected addAnimationOptions(options: AnimationOptions) {
        this.animationOptions = {
            ...this.animationOptions,
            ...options
        }
    }

    setup(target: HTMLElement, staggerDuration = 0) {
        if (staggerDuration) {
            this.targets = target.querySelectorAll('[stagger-item]')
            this.animationOptions.delay = stagger(staggerDuration)
            this.stagger = staggerDuration
        } else {
            this.targets = resolveElements(target) as HTMLElement[]
        }
    }

    setDuration(durationInMs: typeof this.animationOptions.duration) {
        this.animationOptions.duration = durationInMs / 1000
    }

    createAnimation() {
        if (!this.targets || this.targets.length === 0) {
            return
        }
        this.animation = animate(this.targets, this.keyframes, this.animationOptions)
        // this.animation.pause()
    }

    async play() {
        this.targets.forEach((target, i) => {
            setTimeout(() => {
                this.bus?.publish('startTarget', target)
            }, (i * this.stagger) * 1000)
            setTimeout(() => {
                this.bus?.publish('endTarget', target)
            }, ((this.animationOptions.duration ?? 0) + i * this.stagger) * 1000)
        });
        this.animation?.play?.()
        await this.animation?.finished
        this.onComplete?.()
    }

    onTargetStart(callback: (target: HTMLElement) => void) {
        this.bus.subscribe('startTarget', callback)
    }

    onTargetEnd(callback: (target: HTMLElement) => void) {
        this.bus.subscribe('endTarget', callback)
    }

    destroy() {
        this.animation?.stop()
        this.animation = null
        this.targets = null
        this.keyframes = null
        this.animationOptions = null
        this.bus = null
    }

    onComplete?(): void
}
