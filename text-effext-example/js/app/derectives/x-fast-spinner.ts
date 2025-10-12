import { AnimationControls, animate } from "motion";
import { animateObjectTo } from "../animation/motionExtends";
import { AlpineDirective } from "./AlpineDirective";

export default class FastSpinner extends AlpineDirective {
    animation?: AnimationControls;
    onMount() {
        const bg = this.element.querySelector('.spinner')
        this.animation = animate(bg, {
            rotate: "-360deg",
        }, {
            duration: 14,
            repeat: Infinity,
            easing: "linear"
        })
        this.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    }
    onMouseEnter(e: MouseEvent) {
        if (e.target !== this.element) return
        // Accelerate then decelerate
        animateObjectTo(this.animation, {
            playbackRate: 40
        }, {
            duration: 0.2
        })
        setTimeout(() => {
            animateObjectTo(this.animation, {
                playbackRate: 1,
            }, {
                duration: 0.6,
                easing: sine.out
            })
        }, 200)
    }

    onUnmount(): void {
        this.animation?.cancel()
        this.animation = null
    }
}