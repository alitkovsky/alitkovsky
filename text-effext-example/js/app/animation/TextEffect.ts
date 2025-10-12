import { clamp } from ".";
import { localStorageSupported } from "../utils/testLocalStorage";
import { delay, nextTick } from "./delay";
// @unocss-include

const effects = {
  underline: {
    file: "UnderlineLong.svg",
    classes: "absolute left-0 top-100% w-full h-auto -translate-y-1/2",
    animationDuration: 400,
  },
  linethrough: {
    file: "UnderlineLong.svg",
    classes: "absolute -left-10% top-1/2 w-120% h-auto",
    animationDuration: 400,
  },
  sideline: {
    file: "SidelineThin.svg",
    classes: "absolute -left-2 top-0 h-full w-auto",
    animationDuration: 400,
  },
  sideline2: {
    file: "SidelineBold.svg",
    classes: "absolute -left-2 top-0 h-full w-auto",
    animationDuration: 400,
  },
  underlineSmall: {
    file: "UnderlineThin.svg",
    classes: "absolute left-0 top-100% w-full h-auto -translate-y-1/2",
    animationDuration: 400,
  },
  underlineZigzag: {
    file: "UnderlineZigzag.svg",
    classes: "absolute left-0 top-93% w-full h-auto",
    animationDuration: 400,
  },
  underlineSkew: {
    file: "UnderlineCurved.svg",
    classes: "absolute left-0 top-100% w-full h-auto -translate-y-1/2",
    animationDuration: 400,
  },
  rounded: {
    file: "Ellipse.svg",
    classes: "absolute -inset-10% h-120% w-120%",
    animationDuration: 500,
  },
  roundedFat: {
    file: "EllipseBold.svg",
    classes: "absolute -top-10% -left-20% h-120% w-140%",
    animationDuration: 500,
  },
  roundedSmall: {
    file: "EllipseThin.svg",
    classes: "absolute -inset-10% h-120% w-120%",
    animationDuration: 500,
  },
  quote: {
    file: "quote.svg",
    classes: "absolute inset-0 w-full",
    animationDuration: 500,
  },
} as const;
export type EffectName = keyof typeof effects;
export type Effect = (typeof effects)[EffectName];

export default class TextEffect {
  framesPaths = [];
  currentFrame = 0;
  path: SVGPathElement;
  pathLength: number;
  running = false;
  svg: HTMLElement;
  raf: number;
  onAnimateOutTimeout: number;
  effectName: EffectName;
  eventCleaners: (() => void)[] = [];
  fpsInterval = 1000 / 10;
  lastFrame = 0;
  private lastAnimation = 0;

  constructor(public element: HTMLElement, effectName?: EffectName) {
    if (!effectName) {
      // pick random effect name
      const excludedFromRandomPick = [
        "linethrough",
        "sideline",
        "sideline2",
        "underlineSmall",
        "roundedSmall",
        "quote",
      ];
      const selectedEffects = Object.keys(effects).filter(
        (effect) => !excludedFromRandomPick.includes(effect)
      );
      effectName = selectedEffects[
        Math.floor(Math.random() * selectedEffects.length)
      ] as EffectName;
    }
    this.effectName = effectName;
    if (!this.effect) {
      throw new Error(`Text effect ${this.effectName} not found`);
    }
    const rafFn = (time: number) => {
      this.onRaf(time);
      this.raf = requestAnimationFrame(rafFn);
    };
    rafFn(performance.now());

    const resize = this.onResize.bind(this);
    window.addEventListener("resize", resize);
    this.eventCleaners.push(() => window.removeEventListener("resize", resize));

    setTimeout(() => {
      this.setSizes();
    }, 2000);
  }

  async setupEffect() {
    if (!this.effect) return;
    
    let svgData
    const localName =
      "text-effect-" + this.effect.file + window.wnkExposed.themeVersion;
    if(localStorageSupported()) {
      svgData = localStorage.getItem(localName);
    }

    // @ts-ignore
    if (svgData == null || import.meta.env.DEV) {
      svgData = await fetch(
        window.wnkExposed.themePath +
          "/www/img/text-effects/" +
          this.effect.file
      ).then((res) => res.text());
      if(localStorageSupported()) localStorage.setItem(localName, svgData);
    }

    this.svg = new DOMParser().parseFromString(
      svgData,
      "image/svg+xml"
    ).documentElement;
    if (!this.element) return;
    this.element.prepend(this.svg);
    this.svg.classList.add(
      "pointer-events-none",
      ...this.effect.classes.split(" ")
    );
    this.svg.querySelectorAll("path").forEach((path, i) => {
      this.framesPaths.push(path.getAttribute("d"));
      if (i === 0) {
        this.path = path;
      } else {
        path.remove();
      }
    });

    if (this.path) {
      this.path.setAttribute("d", this.framesPaths[this.currentFrame]);
      this.path.setAttribute("stroke", "currentColor");
      this.path.setAttribute("vector-effect", "non-scaling-stroke");
      this.svg.setAttribute("preserveAspectRatio", "none");
      this.path.style.opacity = "0";
    }
    this.setSizes();
  }

  setSizes() {
    const width = clamp(
      parseFloat(getComputedStyle(this.element).getPropertyValue("font-size")) /
        16,
      1,
      2
    );
    if (this.path) {
      this.path.setAttribute("stroke-width", width.toString());
      this.updatePathLength();
      this.path.style.strokeDasharray = this.pathLength.toString();
      this.path.style.strokeDashoffset = this.running
        ? "0"
        : this.pathLength.toString();
    }
  }

  get effect(): Effect | undefined {
    return effects[this.effectName];
  }

  updatePathLength() {
    if (!this.path) return;
    const widthScale =
      this.path.getBoundingClientRect().width / this.path.getBBox().width;
    const heightScale =
      this.path.getBoundingClientRect().height / this.path.getBBox().height;
    const scale = (widthScale + heightScale) / 2;
    this.pathLength = this.path.getTotalLength() * scale * 1.2;
  }

  async animatePath(before: () => any, after: () => any = null) {
    if (!this.path) {
      return;
    }
    this.lastAnimation++;
    const animationId = this.lastAnimation;
    const animationDuration = this.effect.animationDuration;
    this.path.style.transition = `stroke-dashoffset ${animationDuration}ms steps(${Math.round(
      (20 * animationDuration) / 1000
    )}), stroke-dasharray ${animationDuration}ms steps(${Math.round(
      (20 * animationDuration) / 1000
    )})`;

    await before();
    await delay(animationDuration + 10);

    if (animationId !== this.lastAnimation) return;
    // Uniquement si on est sur la dernière animation
    if (after && this.path?.style) {
      // On stop
      this.path.style.transition = "none";
      // on reset
      after();
    }
  }

  async animateIn() {
    if (this.running) return;
    this.running = true;

    await this.animatePath(() => {
      this.path.style.strokeDashoffset = "0";
      this.path.style.opacity = "1";
    });
  }

  async animateOut() {
    this.currentFrame = 0;
    await nextTick();
    this.running = false;
    if (!this.path) {
      return;
    }

    await this.animatePath(
      () => {
        this.path.style.strokeDashoffset = (-this.pathLength).toString();
      },
      () => {
        this.path.style.opacity = "0";
        this.path.style.strokeDashoffset = this.pathLength.toString();
      }
    );
  }

  async onResize(e: UIEvent) {
    await nextTick();
    this.setSizes();
  }

  randomFrame() {
    let targetFrame = Math.floor(Math.random() * this.framesPaths.length);
    if (targetFrame === this.currentFrame) {
      targetFrame = (targetFrame + 1) % this.framesPaths.length;
    }
    this.currentFrame = targetFrame;
  }

  onRaf(now: number): void {
    if (!this.path || !this.running) return;
    // Limiting FPS
    const elapsed = now - this.lastFrame;
    if (elapsed < this.fpsInterval) return;
    this.lastFrame = now - (elapsed % this.fpsInterval);

    this.path.setAttribute("d", this.framesPaths[this.currentFrame]);
    this.randomFrame();
  }

  destroy(): void {
    this.running = false;
    this.path?.remove();
    this.path = null;
    this.eventCleaners.forEach((fn) => fn());
    cancelAnimationFrame(this.raf);
  }
}
