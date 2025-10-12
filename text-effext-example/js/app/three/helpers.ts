import {Color, ColorRepresentation, Material, Mesh, Object3D} from 'three';

export function applyMaterial(object: Object3D, material: Material) {
    object.traverse((o) => {
        if ((o as Mesh).isMesh) {
            (o as Mesh).material = material
        }
    })

}
export function hexToRGB(hex) {
    const aRgbHex = hex.replace('#', '').match(/.{1,2}/g);
    return [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
}
export function rgbaToHex(rgbaString: string) : string {
    let numbers = rgbaString.match(/\d+\.?\d*/g)!;
    let [r, g, b, a = 1] = numbers;

    let hexColor = (n: string) => {
        let hex = Number(n).toString(16);
        if (hex.length < 2) {
            hex = '0' + hex;
        }
        return hex;
    }

    let aHex = Math.round(Number(a) * 255).toString(16);

    if (aHex.length < 2) {
        aHex = '0' + aHex;
    }

    return '#' + hexColor(r) + hexColor(g) + hexColor(b) + aHex;
}

export function pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}


export function toColor(c: ColorRepresentation) {
    const color = new Color(c)
    color.convertLinearToSRGB()
    return color
}