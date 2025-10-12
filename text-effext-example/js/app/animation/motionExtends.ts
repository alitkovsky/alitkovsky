import { animate, AnimationControls, AnimationOptions, AnimationOptionsWithOverrides, EasingGenerator, ElementOrSelector, MotionKeyframesDefinition } from "motion";
import { mix } from ".";
import { resolveElements } from "../utils/functions";

type AnimationOptionsWithHooks<T> = AnimationOptions & {
    onUpdate?: (p: number, target: T) => void,
}

/**
 * Animate an object to a target state by interpolating its properties.
 * For animating an element use motion's native `animate` function.
 *
 * @param {T} target - The object to animate.
 * @param {Partial<T>} values - The target state of the object.
 * @param {AnimationOptionsWithHooks} options - Optional animation options.
 * @return {void} - This function does not return a value.
 */
export function animateObjectTo<T extends any>(target: T, values: Partial<T>, options: AnimationOptionsWithHooks<T> = {}) {
    const from: Partial<T> = {}
    for (let key in values) {
        from[key] = target[key]
    }
    return animate((p: number) => {
        for (const [key, value] of Object.entries(values)) {
            target[key] = mix(from[key], value, p)
        }
        options.onUpdate?.(p, target)
    }, options)
}

/**
 * Animates an object from its current state to a target state using provided animation values and options.
 * For animating an element use `animateFrom` function.
 *
 * @param {T} target - The object to animate.
 * @param {Partial<T>} values - The partial target state to animate the object to.
 * @param {AnimationOptionsWithHooks} options - The animation options and hooks to control the animation.
 * @return {void}
 */
export function animateObjectFrom<T extends any>(target: T, values: Partial<T>, options: AnimationOptionsWithHooks<T> = {}) {
    const to: Partial<T> = {}
    for (const [key, value] of Object.entries(values)) {
        to[key] = target[key]
        // We apply the first frame
        target[key] = value
    }
    return animate((p: number) => {
        for (const [key, value] of Object.entries(values)) {
            target[key] = mix(value, to[key], p)
        }
        options.onUpdate?.(p, target)
    }, options)
}

export function animationsGroup(animations?: AnimationControls[]) {
    animations ??= []
    const add = (animation: AnimationControls) => {
        animations.push(animation)
    }
    const pause = () => {
        animations.forEach(animation => animation.pause())
    }
    const play = () => {
        animations.forEach(animation => animation.play())
    }
    const finish = () => {
        animations.forEach(animation => animation.finish())
    }
    const cancel = () => {
        animations.forEach(animation => animation.cancel())
    }
    const stop = () => {
        animations.forEach(animation => animation.stop())
    }
    const kill = () => {
        stop()
        animations = []
    }

    const finished = Promise.all(animations.map(animation => animation.finished))

    return {
        add,
        pause,
        play,
        finish,
        cancel,
        stop,
        kill,
        finished
    }
}
export type AnimationsGroup = ReturnType<typeof animationsGroup>

/**
 * Animate the given element from a specified set of keyframes to their current state.
 *
 * @param {E} elements - The elements to animate.
 * @param {MotionKeyframesDefinition} keyframes - The keyframes to animate the elements to.
 * @param {AnimationOptionsWithOverrides} options - Additional options and overrides for the animation.
 */
export function animateFrom(elements: ElementOrSelector, keyframes: MotionKeyframesDefinition, options: AnimationOptionsWithOverrides) {
    options.direction = 'reverse'
    if (options.easing instanceof Function) {
        const originalEasing = options.easing
        options.easing = (p) => originalEasing(1 - p)
    }
    if (Array.isArray(options.easing)) {
        options.easing = (options.easing as any).map((c) => 1 - c)
    }
    const animation = animate(elements, keyframes, options)
    animation.finished.then(() => {
        resolveElements(elements).forEach(element => element.setAttribute('style', ''))
    })
    return animation
}
