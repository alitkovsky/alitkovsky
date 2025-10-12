import { needsFeature } from "../modules/features";
import { AlpineDirective } from "./AlpineDirective";
import TextEffect, { EffectName } from "../animation/TextEffect";
// @unocss-include

@needsFeature('textEffects')
export default class TextEffectDirective extends AlpineDirective {
    effect: TextEffect;
    linkParent: HTMLAnchorElement;
    manualReveal: boolean;
    noReveal: boolean;

    async onMount() {
        this.effect = new TextEffect(this.element, this.params.expression as EffectName)
        await this.effect.setupEffect()

        this.linkParent = this.element.closest('a')
        if (this.linkParent) {
            this.addEventListenerTo(this.linkParent, 'mouseover', (e) => {
                this.effect.animateIn()
            })
            this.addEventListenerTo(this.linkParent, 'mouseleave', (e) => {
                if (e.currentTarget !== e.target) return
                this.effect.animateOut()
            })
        }

        this.manualReveal = this.hasModifier('manual-reveal')
        this.noReveal = this.hasModifier('no-reveal')

        if (this.noReveal || !this.manualReveal && !this.isInsideReveal && !this.linkParent) {
            this.effect.animateIn();
        }

    }

    onRevealEnd() {
        if (this.manualReveal) return
        this.effect.animateIn()
    }

    onTransitionLeave() {
        this.effect.animateOut()
    }

    onUnmount(): void {
        this.effect.destroy()
        this.effect = null
    }
}
