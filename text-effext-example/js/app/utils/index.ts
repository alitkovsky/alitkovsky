import type { ColorRepresentation } from "three";
import { Color } from "three/src/math/Color";

export const rand = (a: number, b: number) => Math.random() * (b - a) + a

export function getColorLuminance(color: ColorRepresentation) {
    const value = new Color(color);
    return value.getHSL({} as any).l;
}