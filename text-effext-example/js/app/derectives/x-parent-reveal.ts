import AnimationTriggerDirective from "../animation/scroll/AnimationTriggerDirective";
import { needsFeature } from "../modules/features";


@needsFeature('scrollReveal')
export default class ParentReveal extends AnimationTriggerDirective {
    onMount() {
        super.onMount('enter')
        this.animation.setup(this.element, this.getModifierValue('stagger', 0) / 1000)
        this.animation.createAnimation()
    }

    async onRevealStart() {
        await this.animation?.play()
        this.animation?.onComplete?.()
    }

    onTransitionLeave(transitionName?: string, nextPageColor?: string): void {
        this.animation?.destroy()
        this.animation = null
    }
}
