export const rawLerp = (a, b, t) => a + (b - a) * t;
export const clamp = (a, min, max) => Math.min(Math.max(a, min), max);
export const lerp = (a, b, t, threshold = 0.001) => {
    const v = rawLerp(a, b, t);
    if (Math.abs(v - b) < threshold)
        return b;
    return v;
}
export const mix = (min, max, progress) => -progress * min + progress * max + min;
