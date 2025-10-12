import { type GLCanvas, useCanvas } from './components/GLCanvas'
import { useSizes } from './sizes'
import { Clock } from "three";

/**
 * TS Types
 */
type Constructor = new (...args: any[]) => {}
export interface ThreeComponent {
    canvas: GLCanvas
    sizes: { width: number, height: number }
    onRaf(delta: number, elapsed: number)
    destroy()
    onResize()
}
export const clock = new Clock()
/**
 * Components registration
 */
export const threeComponents: ThreeComponent[] = []
const register = (component: ThreeComponent) => {
    // unshift car le canvas est créé en premier et il doit etre rendu en dernier
    threeComponents.unshift(component)
}
const unregister = (component: ThreeComponent) => {
    const index = threeComponents.indexOf(component)
    if (index > -1) {
        threeComponents.splice(index, 1)
    }
}

/**
 * Cette macron transforme une classe pour lui ajouter nos hooks de three
 * @param Base
 */
// @ts-expect-error TS est un peu trop strict sur la classe par défaut
export function threeComponent<TBase extends Constructor>(Base: TBase = class { }) {
    return class extends Base implements ThreeComponent {
        destroyed = false

        canvas: GLCanvas
        sizes: { width: number, height: number }

        loadListeners: (() => void)[] = []

        constructor(...args: any[]) {
            super(...args)
            this.canvas = useCanvas()
            this.sizes = useSizes()
            register(this)
        }

        protected get clock() {
            return clock
        }

        onRaf(delta: number, elapsed: number) { }
        onResize() { }
        onLoad(callback?: () => void) {
            if (callback) {
                this.loadListeners.push(callback)
            } else {
                return new Promise<void>(resolve => {
                    this.loadListeners.push(resolve)
                })
            }
        }
        protected loaded() {
            this.loadListeners.forEach(cb => cb())
            this.loadListeners = []
        }

        destroy() {
            unregister(this)
            this.destroyed = true
        }
    }
}
