import { PerspectiveCamera } from 'three'

export class WnkCamera extends PerspectiveCamera {
  calculateUnitSize(distance = this.position.z) {
    const vFov = this.fov * Math.PI / 180;
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * this.aspect;
    return {
      width,
      height
    };
  }
}