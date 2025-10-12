import {onResize} from './sizes'
import {canIUse} from '../modules/features';
import type Particles from './components/Particles';


let particlesInstance: Particles | null = null
export const getParticles: () => Particles = () => particlesInstance

export async function initThree() {
    // Creating canvas and particles
    if (!canIUse('three')) return

    const [
        {GLCanvas, useCanvas},
        {threeComponents, clock}
    ] = await Promise.all([
        import('./components/GLCanvas'),
        import('./threeComponent')
    ])
    // const {GLCanvas, useCanvas} = await import('./components/GLCanvas')
    const canvasElement = document.querySelector<HTMLCanvasElement>('#gl-canvas')
    GLCanvas.instantiate(canvasElement)
    if (canIUse('particles')) {
        const {default: Particles} = await import('./components/Particles')
        particlesInstance = new Particles(window.wnkExposed.defaultParticlesColors)
    }
    clock.start()
    const raf = () => {
        const delta = clock.getDelta()
        const elapsed = clock.getElapsedTime()

        threeComponents.forEach(c => c.onRaf(delta, elapsed))

        requestAnimationFrame(raf)
    }
    raf()

    const resize = onResize(() => {
        useCanvas().onResize()
        threeComponents.forEach(c => c.onResize())
    })
}
