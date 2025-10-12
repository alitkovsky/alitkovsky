import Lenis from 'lenis';

let lenisInstance: Lenis

export function getLenis(): Lenis {
    return lenisInstance
}

export default function lenis() {
    lenisInstance = new Lenis({
        // syncTouch: true,
    })
    function raf(time) {
        lenisInstance.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    window.scrollTo(0, 0)
    return lenisInstance
}