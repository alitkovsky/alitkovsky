import AnimationTriggerDirective from "../animation/scroll/AnimationTriggerDirective";
import { needsFeature } from "../modules/features";

@needsFeature('leaveEffect')
export default class ScrollReveal extends AnimationTriggerDirective {
    onMount() {
        super.onMount('leave')
        this.animation.setup(this.element, this.getModifierValue('stagger', 0) / 1000)
    }

    async onTransitionLeave() {
        this.animation.createAnimation()
        this.element.dispatchEvent(new CustomEvent('leave-start'))
        await this.animation?.play()
        this.element?.dispatchEvent(new CustomEvent('leave-end'))
        this.animation?.onComplete?.()
    }
}
