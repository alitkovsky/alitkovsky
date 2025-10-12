import { animation } from "..";
import { TriggeredAnimation } from "../TriggeredAnimation";
@animation('fullTranslateRight', 'enter')
export class TitleEnter extends TriggeredAnimation {
    constructor() {
        super()
        this.addKeyframes({
            x: ['100%', 0],
            opacity: [0, 1],
        })
        this.addAnimationOptions({
            duration: 1.2,
            easing: power4.out
        })
    }
}