import { animation } from ".."
import { TriggeredAnimation } from "../TriggeredAnimation"

@animation('null', 'enter')
export class NullAnimation extends TriggeredAnimation {
    constructor() {
        super()
        this.addKeyframes({
            '--progress': [0, 1]
        })
    }
}

@animation('default', 'enter')
export class DefaultAnimation extends TriggeredAnimation {
    constructor() {
        super()
        this.addKeyframes({
            y: [32, 0],
            opacity: [0, 1],
        })
        this.addAnimationOptions({
            duration: 1,
            easing: power3.out,
        })
    }
}