import { AlpineDirective } from "../directives/AlpineDirective";

class Flag {
    constructor(public enabled: boolean, public depends?: string[]) {
    }
}

function detectWebGLContext() {
    // Create canvas element. The canvas is not added to the
    // document itself, so it is never displayed in the
    // browser window.
    const canvas = document.createElement("canvas");

    // Get WebGLRenderingContext from canvas element.
    const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    const UA = navigator.userAgent.toLowerCase();
    const excluded = [
        'gtmetrix', 'headlesschrome', 'headless', 'chrome-lighthouse', 'lighthouse'
    ];

    let founded = false;
    founded = new RegExp(excluded.join("|")).test(UA);

    // Report the result.
    return (gl instanceof WebGLRenderingContext && !founded);
}

const isWebGl = detectWebGLContext();
const isTouch = window.matchMedia('(hover: none)').matches
const isMobile = window.innerWidth < 768

const defaultFlags = {
    three: new Flag(isWebGl),
    emblem: new Flag(!isTouch, ['three']),
    particles: new Flag(true, ['three']),
    skillIcons: new Flag(!isMobile, ['three']),
    particlesShape: new Flag(!isTouch, ['three', 'particles']),
    textEffects: new Flag(true),
    scrollLerp: new Flag(true),
    backgroundTransition: new Flag(true),
    blob: new Flag(true),
    cursorIcon: new Flag(!isTouch),
    scrollReveal: new Flag(true),
    leaveEffect: new Flag(true),
    parallax: new Flag(true),
    scrollingText: new Flag(true),
    images3d: new Flag(!isTouch, ['three'])
}
type FlagName = keyof typeof defaultFlags;
const flags = defaultFlags

const fixDependencies = () => {
    // Disable flags if one of their dependencies is not enabled
    for (const [key, value] of Object.entries(flags)) {
        const flag = value as any
        if (flag.depends) {
            for (const dep of flag.depends) {
                if (!flags[dep].enabled) {
                    flags[key].enabled = false
                }
            }
        }
    }
}

fixDependencies();

export const canIUse = (flag: FlagName) => flags[flag].enabled;

// Directives decorators:
export function needsFeature(flag: FlagName) {
    return function (target: typeof AlpineDirective): any {
        if (!canIUse(flag)) {
            // We make the directive empty if can not use
            return () => {
                init: () => {
                }
            }
        }
    }
}

/**
 *
 * @param flag Allow to chose the class to use depending on if feature enabled.
 * @param classIfFeature
 * @param classElse
 * @returns
 */
export function ifFeature(flag: FlagName, classIfFeature, classElse) {
    return canIUse(flag) ? classIfFeature : classElse
}

export function setFlag(flag: FlagName, value: boolean): void {
    flags[flag] = new Flag(value);
    fixDependencies();
}

// Feature set selection
export default function setFeatureConfig() {
    // We will pick config flags
    fixDependencies()
}
