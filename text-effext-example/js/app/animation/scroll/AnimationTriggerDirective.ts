import './index'
import { AlpineDirective } from "../../directives/AlpineDirective";
import { AnimationType, getAnimation } from '.';
import { TriggeredAnimation } from './TriggeredAnimation';

export default class AnimationTriggerDirective extends AlpineDirective {
    animation?: TriggeredAnimation
    animationName: string;
    delay: number;

    onMount(type: AnimationType = 'enter') {
        this.animationName = this.params.expression || 'default'

        this.animation = getAnimation(this.animationName, type)
        this.delay = this.getModifierValue('delay', 0)

        const customDuration = this.getModifierValue('duration', 0)
        if (customDuration) {
            this.animation.setDuration(customDuration)
        }

        // this.start = this.element.dataset.start ?? 'top 85%'
    }

    onUnmount(): void {
        this.animation?.destroy()
        this.animation = null
    }
}