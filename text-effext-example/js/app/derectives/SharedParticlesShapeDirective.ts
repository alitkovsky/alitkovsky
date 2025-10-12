import { AxisScrollInfo, ScrollInfo, scroll } from "motion";
import { needsFeature } from "../modules/features";
import type Particles from "../three/components/Particles";
import { getParticles } from "../three/init";
import { AlpineDirective } from "./AlpineDirective";
import { clamp } from "../animation";
import Alpine from "alpinejs";
import followCursor from "../modules/followCursor";

/**
 * @directive "Particles Shape FIxed"
 * Makes the particles take the shape of the provided png when scrolled to
 */

export default class SharedParticlesShapeDirective extends AlpineDirective {
    particles: Particles;

    static instances: SharedParticlesShapeDirective[] = []

    async onMount() {
        SharedParticlesShapeDirective.instances.push(this)
        this.particles = getParticles()
    }

    onUnmount(): void {
        SharedParticlesShapeDirective.instances.splice(SharedParticlesShapeDirective.instances.indexOf(this), 1)
        if (SharedParticlesShapeDirective.instances.length === 0) {
            this.particles?.hideShape()
        }
        this.particles = null
    }
}