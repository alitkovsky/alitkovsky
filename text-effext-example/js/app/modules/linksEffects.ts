import delegate, { DelegateEvent } from "delegate-it"
import followCursor from "./followCursor"
import TextEffect from "../animation/TextEffect"
import { nextTick } from "../animation/delay"
import barba from "@barba/core"

let isHover = false

const cachedEffects = new Map<HTMLElement, TextEffect>()

async function onLinkHover(e: DelegateEvent<MouseEvent>) {
    const el = e.target as HTMLElement
    if (el !== e.delegateTarget) return
    if (!followCursor.running) return
    // Cursor stuff
    isHover = true
    followCursor.setScale(0)
    // followCursor.enableDifference()
    followCursor.enableFill()

    // Effect stuff
    if (el.dataset.effectCustom !== undefined) return

    if(!("effectNone" in el.dataset)) {
        let effect = cachedEffects.get(el)
        if (!effect && !("effectNone" in el.dataset)) {
            effect = new TextEffect(el)
            cachedEffects.set(el, effect)
            await effect.setupEffect()
        }
        await nextTick()
        effect.animateIn()
    }
}
async function onLinkLeave(e: DelegateEvent<MouseEvent>) {
    const el = e.target as HTMLElement
    if (el !== e.delegateTarget) return

    isHover = false
    followCursor.setScale(1)
    await followCursor.disableFill()

    if (el.dataset.effectCustom !== undefined) return
    if (!followCursor.running) return
    const effect = cachedEffects.get(el)
    effect?.animateOut()

}

function cleanCachedEffects() {
    for (const effect of cachedEffects.values()) {
        effect.destroy()
    }
    cachedEffects.clear()
}

export default function linksEffects() {
    delegate('a:not([data-cursor-custom]), [link-effect]', 'mouseover', onLinkHover)
    delegate('a:not([data-cursor-custom]), [link-effect]', 'mouseout', onLinkLeave)

    barba.hooks.after(() => {
        cleanCachedEffects()
    })
}