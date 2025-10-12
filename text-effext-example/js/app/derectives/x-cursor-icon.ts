import { needsFeature } from "../modules/features";
import followCursor from "../modules/followCursor";
import { AlpineDirective } from "./AlpineDirective";

@needsFeature('cursorIcon')
export default class CursorIcon extends AlpineDirective {
    size: number;
    onMount() {
        this.size = this.getModifierValue('size', 16)
        this.element.setAttribute('data-cursor-custom', '')

        this.addEventListener('mouseenter', this.onMouseEnter.bind(this))
        this.addEventListener('mouseleave', this.onMouseLeave.bind(this))
    }
    onMouseEnter() {
        followCursor.setIcon(this.params.expression)
        followCursor.setIconSize(this.size)
        followCursor.setScale(8)
    }
    onMouseLeave() {
        followCursor.setIcon('')
        followCursor.setScale(1)
    }
    onUnmount(): void {
        this.onMouseLeave()
    }
}