import { animation } from "..";
import { TriggeredAnimation } from "../TriggeredAnimation";

export abstract class BaseClip extends TriggeredAnimation {
    static SURROUNDING_CLIP = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    constructor() {
        super()
        this.addAnimationOptions({
            duration: 1.5,
            easing: power4.out
        })
        this.addKeyframes({
            opacity: [0, 1]
        })
    }
    onComplete(): void {
        this.targets?.forEach(element => {
            element.style.clipPath = null
        });
    }
}

@animation('clipLeft', 'enter')
export class ClipLeft extends BaseClip {
    constructor() {
        super()
        this.addKeyframes({
            clipPath: ["polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", BaseClip.SURROUNDING_CLIP]
        })
    }
}
@animation('clipLeftTranslate', 'enter')
export class ClipLeftTranslate extends ClipLeft {
    constructor() {
        super()
        this.addKeyframes({
            x: [-32, 0]
        })
    }
}

@animation('clipRight', 'enter')
export class ClipRight extends BaseClip {
    constructor() {
        super()
        this.addKeyframes({
            clipPath: ["polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", BaseClip.SURROUNDING_CLIP]
        })
    }
}

@animation('clipRightTranslate', 'enter')
export class ClipRightTranslate extends ClipRight {
    constructor() {
        super()
        this.addKeyframes({
            x: [32, 0]
        })
    }
}

@animation('clipTop', 'enter')
export class ClipTop extends BaseClip {
    constructor() {
        super()
        this.addKeyframes({
            clipPath: ["polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", BaseClip.SURROUNDING_CLIP]
        })
    }
}
@animation('clipTopTranslate', 'enter')
export class ClipTopTranslate extends ClipTop {
    constructor() {
        super()
        this.addKeyframes({
            y: [-32, 0]
        })
    }
}
@animation('clipBottom', 'enter')
export class ClipBottom extends BaseClip {
    constructor() {
        super()
        this.addKeyframes({
            clipPath: ["polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", BaseClip.SURROUNDING_CLIP]
        })
    }
}
@animation('clipBottomTranslate', 'enter')
export class ClipBottomTranslate extends ClipBottom {
    constructor() {
        super()
        this.addKeyframes({
            y: [32, 0]
        })
    }
}
