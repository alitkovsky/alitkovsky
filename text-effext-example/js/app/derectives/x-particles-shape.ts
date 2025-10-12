import type Lenis from "lenis";
import { needsFeature } from "../modules/features";
import { getLenis } from "../modules/lenis";
import SharedParticlesShapeDirective from "./SharedParticlesShapeDirective";

/**
 * @directive "Particles Shape"
 * Makes the particles take the shape of the provided png on hover
 */
@needsFeature("particlesShape")
export default class ParticlesShape extends SharedParticlesShapeDirective {
  objectFit: "contain" | "cover";
  until: number | null;
  shape: string;

  private transitionStarted = false;

  private initial = true;

  async onMount() {
    super.onMount()
    if (!this.params.expression) {
      console.error("Missing filename for particles shape directive");
      return;
    }

    this.shape = this.params.expression;
    this.objectFit = (this.params.value || "contain") as "contain" | "cover";
    this.until = this.getModifierValue("until");
    await this.particles?.registerShape(this.shape);
  }

  onPageReady(): void {
    this.particles?.setShape(this.shape, true, 1.5);
    this.onScroll();
    this.updateSize(false);
  }

  onScroll(e: Lenis = getLenis()): void {
    if (this.until && !this.transitionStarted) {
      //@ts-ignore
      if (e.animatedScroll < this.until) {
        this.particles?.showShape();
      } else {
        this.particles?.hideShape();
      }
    }
    this.updatePosition();
  }

  onTransitionLeave(): void {
    this.transitionStarted = true;
  }

  onResize(e: UIEvent): void {
    this.updateSize();
    this.updatePosition();
  }

  updateSize(immediate = true) {
    const { width, height } = this.element.getBoundingClientRect();
    this.particles?.setShapeBounds(width, height, this.objectFit, immediate);
  }
  updatePosition() {
    const { left, top, width, height } = this.element.getBoundingClientRect();
    this.particles?.setShapeCenter(
      left + width / 2,
      top + height / 2,
      !this.initial
    );
    if (this.initial) {
      this.initial = false;
    }
  }

  onUnmount(): void {
    super.onUnmount()
    this.particles = null;
  }
}
