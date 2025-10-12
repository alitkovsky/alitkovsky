import { scroll } from "motion";
import { defineComponent } from ".";

export default defineComponent(() => ({
    progress: 0,
    translate: 0,
    cleanupScroll: null,
    init() {
        // this.updatePosition()
        // this.updateProgress()
        this.cleanupScroll = scroll(({ y }) => {
            this.progress = y.progress
            this.translate = (1 - this.progress) * (window.innerWidth < 768 ? -225 : -450)
        }, {
            target: this.$root,
            offset: ['start end', 'start 10%'],
        })
    },
    destroy() {
        this.cleanupScroll?.()
    },
    updatePosition() { },
    updateProgress() { },
    // rootBindings: {
    //     ['@scroll.window']() {
    //         this.updateProgress()
    //     }
    // }
}))