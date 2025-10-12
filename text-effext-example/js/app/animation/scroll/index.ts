import type { TriggeredAnimation } from "./TriggeredAnimation"

const animationsImport = (import.meta as any).glob(["./animations/*.ts", "!./animations/_*.ts"], {
    eager: true,
  });

declare global {
    interface Window { animationsStore: {
        enter: Record<string, any>,
        leave: Record<string, any>
    }; }
}
export type AnimationType = keyof typeof window.animationsStore
export function getAnimation(name: string, type: AnimationType) {
    const animationClass = window.animationsStore[type][name]
    if (!animationClass) {
        throw new Error(`Animation ${name} of type ${type} not found. Did you use @animationName on the subsequent class ?`)
    }
    return new animationClass()
}


export function animation(animationName: string, type: AnimationType) {
    return function (target: typeof TriggeredAnimation) {
        if (!window.animationsStore) {
            window.animationsStore = {
                enter: {},
                leave: {}
            }
        }
        window.animationsStore[type][animationName] = target
    }
}
