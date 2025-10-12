// @unocss-include
import { animate, timeline } from "motion";
import { animation } from "..";
import { nextTick } from "../../delay";
import { TriggeredAnimation } from "../TriggeredAnimation";
import { BaseClip, ClipLeftTranslate } from "./clip";


abstract class LineByLineAnimation extends TriggeredAnimation {
    lineStagger: number;
    constructor(lineStagger = 0) {
        super()
        this.lineStagger = lineStagger
    }
    setup(target: HTMLElement) { // Stagger is not parametrable by directive for line by line animations
        // split by lines
        if (!target.hasAttribute('x-split-lines')) {
            console.error('x-split-lines attribute is required for line by line animations, on', target)
        }
        const lines = target.querySelectorAll('.line')
        lines.forEach((line: HTMLElement) => line.setAttribute('stagger-item', ''))
        super.setup(target, this.lineStagger)
    }
    createAnimation(): void {
        super.createAnimation()
    }
}

@animation('title', 'enter')
export class TitleEnter extends LineByLineAnimation {
    constructor() {
        super(0.1)
        this.addKeyframes({
            opacity: [0, 1],
            y: ['100%', 0],
            clipPath: ["polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", BaseClip.SURROUNDING_CLIP]
        })
        this.addAnimationOptions({
            duration: 0.7,
            easing: power3.out
        })

        this.onTargetEnd(async (target) => {
            for (let i = 0; i < 3; i++) {
                await nextTick()
                target.style.clipPath = null
            }
        })
    }

}

@animation('clipReveal', 'enter')
export class ClipReveal extends TriggeredAnimation {
    constructor() {
        super()
        this.addKeyframes({
            opacity: [0, 1],
            y: ['100%', 0],
            clipPath: ["polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", BaseClip.SURROUNDING_CLIP]
        })
        this.addAnimationOptions({
            duration: 1.2,
            easing: power5.out
        })
    }

    onComplete(): void {
        this.targets?.forEach(element => {
            element.style.clipPath = null
        });
    }
}

@animation('title', 'leave')
export class TitleLeave extends LineByLineAnimation {
    constructor() {
        super(0.07)
        this.addKeyframes({
            opacity: [1, 0],
            y: [0, '-80%'],
            clipPath: [BaseClip.SURROUNDING_CLIP, "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"]
        })
        this.addAnimationOptions({
            duration: 0.3,
            easing: power2.in
        })
    }

    onComplete(): void {
        this.targets?.forEach(element => {
            element.style.clipPath = null
        });
    }
}

@animation('clipCollage', 'enter')
export class ClipCollage extends ClipLeftTranslate {
    constructor() {
        super()
        this.addKeyframes({
            opacity: [0, 0, 0, 1]
        })
    }
}

@animation('teamPortraits', 'enter')
export class TeamPortraits extends BaseClip {
    portraitImages: HTMLElement[];

    constructor() {
        super()
    }
    setup(target: HTMLElement, staggerDuration?: number): void {
        super.setup(target, staggerDuration)

        this.portraitImages = []
        for (const wrapper of this.targets) {
            const image = wrapper.querySelector<HTMLImageElement>('.portrait-image')
            if (image) {
                this.portraitImages.push(image)
            }
        }
    }
    createAnimation(): void {
        if (!this.targets || this.targets.length === 0) {
            return
        }


        const scale = 1.2
        const clip = '20%'

        this.animation = timeline([
            [this.portraitImages, {
                opacity: [0, 1]
            }, {
                ...this.animationOptions,
                duration: 0.4,
            }],
            [this.portraitImages, {
                transform: [`scale(${scale})`, `scale(1)`],
                clipPath: [`polygon(${clip} ${clip}, 100% ${clip}, 100% 100%, ${clip} 100%)`, BaseClip.SURROUNDING_CLIP]
            }, {
                ...this.animationOptions,
                duration: 1.8,
                easing: power4.out,
                at: 0
            }],
        ])
    }
}