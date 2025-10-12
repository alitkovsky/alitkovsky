import { needsFeature } from "../modules/features";
import followCursor from "../modules/followCursor";
import { AlpineDirective } from "./AlpineDirective";

@needsFeature('cursorIcon')
export default class CursorIcon extends AlpineDirective {
    onMount() {
        this.addEventListener('mouseenter', this.onMouseEnter.bind(this))
        this.addEventListener('mouseleave', this.onMouseLeave.bind(this))
    }
    onMouseEnter() {
        followCursor.setText(this.params.expression)
        followCursor.setScale(8)
    }
    onMouseLeave() {
        followCursor.setText('')
        followCursor.setScale(1)
    }
    onUnmount(): void {
        this.onMouseLeave()
    }
}