import { ifFeature, needsFeature } from "../modules/features";
import { FitMode } from "../three/components/Fit3D";
import type SkillIcon from "../three/components/SkillIcon";
import { AlpineDirective } from "./AlpineDirective";


class SkillIconDirective extends AlpineDirective {
    private icon: SkillIcon;
    private linkParent?: HTMLAnchorElement;
    color: string;
    thickness: number;
    async onMount() {
        const name = this.params.expression.replace(/(savoirfaire-|.svg)/g, '')


        let fitMode: FitMode = 'contain'
        if (this.hasModifier('cover')) {
            fitMode = 'cover'
        }
        this.color = this.params.value ?? '#131313'
        this.thickness = this.getModifierValue('thickness', 100)

        const { default: SkillIcon } = await import('../three/components/SkillIcon');
        this.icon = new SkillIcon(this.element, name, this.color, this.thickness / 100, fitMode);
        await this.icon.onLoad()
        this.element.style.opacity = '0';

        if (this.hasModifier('look-mouse')) {
            this.icon.startLookingAtMouse()
        }

        this.linkParent = this.element.closest('a')
        if (this.linkParent) {
            this.addEventListenerTo(this.linkParent, 'mouseover', () => {
                this.icon.startRotate()
            })
            this.addEventListenerTo(this.linkParent, 'mouseleave', () => {
                this.icon.stopRotate()
            })
        }
    }

    onRevealStart() {
        this.icon.onResize()
        this.icon.animateIn()
    }

    onTransitionLeave(transitionName?: string): void {
        this.icon.animateOut()
    }

    onUnmount() {
        this.icon.destroy();
        this.icon = null;
    }
}

class SkillIconFallback extends AlpineDirective {
    create() {
        if (this.hasModifier('mobile-reveal')) {
            this.element.setAttribute('x-parent-reveal', 'default')
        }
    }
}

export default ifFeature('skillIcons', SkillIconDirective, SkillIconFallback)
