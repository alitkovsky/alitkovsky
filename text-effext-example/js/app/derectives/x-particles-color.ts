import { needsFeature } from "../modules/features";
import { getParticles } from "../three/init";
import { AlpineDirective } from "./AlpineDirective";

@needsFeature('particles')
export default class ParticlesColor extends AlpineDirective {
    onMount(): void {
        const { effect, evaluateLater } = this.utilities
        const getColors = evaluateLater(this.params.expression)

        const particles = getParticles()
        effect(() => {
            getColors((colors: string[]) => {
                particles?.setColors(colors)
            })
        })
    }
    onUnmount() {
        // If there is not another directive with x-particles-color, reset the colors
        if (!document.querySelector('[x-particles-color]')) {
            getParticles()?.resetColors()
        }
    }
}