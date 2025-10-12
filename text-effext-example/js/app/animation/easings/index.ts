export const sine = {
    in: [0.47, 0, 0.745, 0.715],
    out: [0.39, 0.575, 0.565, 1],
    inOut: [0.445, 0.05, 0.55, 0.95],
} as const
export const power2 = {
    in: [0.55, 0.085, 0.68, 0.53],
    out: [0.25, 0.46, 0.45, 0.94],
    inOut: [0.455, 0.03, 0.515, 0.955],
} as const
export const power3 = {
    in: [0.55, 0.055, 0.675, 0.19],
    out: [0.215, 0.61, 0.355, 1],
    inOut: [0.645, 0.045, 0.355, 1],
} as const
export const power4 = {
    in: [0.895, 0.03, 0.685, 0.22],
    out: [0.165, 0.84, 0.44, 1],
    inOut: [0.77, 0, 0.175, 1],
} as const
export const power5 = {
    in: [0.755, 0.05, 0.855, 0.06],
    out: [0.23, 1, 0.32, 1],
    inOut: [0.86, 0, 0.07, 1],
} as const
export const expo = {
    in: [0.95, 0.05, 0.795, 0.035],
    out: [0.19, 1, 0.22, 1],
    inOut: [1, 0, 0, 1],
} as const
export const circ = {
    in: [0.6, 0.04, 0.98, 0.335],
    out: [0.075, 0.82, 0.165, 1],
    inOut: [0.785, 0.135, 0.15, 0.86],
} as const
export const back = {
    in: [0.6, -0.28, 0.735, 0.045],
    out: [0.175, 0.885, 0.32, 1.275],
    inOut: [0.68, -0.55, 0.265, 1.55],
} as const

// Elastic easing from gsap
const easeInOutFromOut = easeOut => (p => p < .5 ? (1 - easeOut(1 - (p * 2))) / 2 : .5 + easeOut((p - .5) * 2) / 2)
const _2PI = 2 * Math.PI
const buildElastic = (type: 'in' | 'out' | 'inOut', amplitude: number, period: number) => {
    let p1 = (amplitude >= 1) ? amplitude : 1, //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
        p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
        p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
        easeOut = p => p === 1 ? 1 : p1 * (2 ** (-10 * p)) * Math.sin((p - p3) * p2) + 1,
        ease = (type === "out") ? easeOut : (type === "in") ? p => 1 - easeOut(1 - p) : easeInOutFromOut(easeOut);
    p2 = _2PI / p2; //precalculate to optimize
    return ease;
}

export const elastic = {
    out: (amplitude, period) => buildElastic('out', amplitude, period),
    in: (amplitude, period) => buildElastic('in', amplitude, period),
    inOut: (amplitude, period) => buildElastic('inOut', amplitude, period),
} as const;

