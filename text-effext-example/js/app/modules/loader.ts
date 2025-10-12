import { AnimationControls, animate } from "motion"
import { clamp } from "../animation"
import { delay } from "../animation/delay"
import { isDev } from "../utils/functions"

class Loader {
    element: HTMLElement
    letters: NodeListOf<HTMLElement>
    loading = true
    animation: AnimationControls

    duration = 0.7

    appearPromise?: Promise<void>
    setup() {
        this.element = document.querySelector('#loader')
        this.letters = this.element.querySelectorAll('.loader-letter')

        this.appearPromise = this.appear()
        if (isDev()) {
            this.element.setAttribute('data-hot-exclude', 'true')
        }
    }
    async appear() {
        for (const letter of this.letters) {
            letter.classList.remove('opacity-0')
            await delay((this.duration * 500) / this.letters.length)
        }
        this.animation = animate((p) => {
            this.onFrame(p)
        }, {
            duration: this.duration,
            repeat: Infinity,
            easing: 'linear',
        })
        await delay(this.duration * 500) // await for at least 1 cycle
    }
    async disappear() {
        for (const letter of this.letters) {
            letter.classList.add('opacity-0')
            await delay((this.duration * 500) / this.letters.length)
        }
        this.letters.forEach(l => l.classList.remove('light'))
    }
    onFrame(p: number) {
        const start = Math.floor(clamp(p * 2, 0, 0.99) * this.letters.length)
        const end = Math.floor(clamp((p - 0.5) * 2, 0, 0.99) * this.letters.length)
        this.letters.forEach((letter, i) => {
            letter.classList.toggle('light', i <= start && i >= end)
        })
    }

    // Finish the loading animation and hide.
    async finish() {
        await this.appearPromise
        this.animation.stop()
        this.element.classList.add('loaded')
        await this.disappear()
        this.loading = false
        await delay(100) // <-- delay before starting page appear
    }
    async start() {
        this.appearPromise = this.appear()
        this.loading = true
    }
}

export default new Loader()
