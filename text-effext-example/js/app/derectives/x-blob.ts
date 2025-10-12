import { device } from "../modules/alpine";
import { createBlob } from "../animation/createBlob";
import { cols } from "../utils/functions";
import { AlpineDirective } from "./AlpineDirective";
import { lerp } from "../animation/index.js";
import { clamp } from "../animation";
import followCursor from "../modules/followCursor";
import type Lenis from "lenis";
import { needsFeature } from "../modules/features";

// @unocss-include
@needsFeature('blob')
export default class Blob extends AlpineDirective {
    blob: ReturnType<typeof createBlob>
    blobSVG: SVGSVGElement;
    iconWrapper: HTMLSpanElement;

    static DIMENSION = 1000;

    private minScale: number;
    private maxDesktopScale: number;
    private maxMobileScale: number;
    private maxDistance: number;
    private mousePosition: { x: number; y: number; };
    private currentScale: number;
    private currentTranslateX: number;
    private currentTranslateY: number;
    private currentArrowTranslateX: number;
    private currentArrowTranslateY: number;
    rect: DOMRect;
    targetTranslateX: number;
    targetTranslateY: number;

    onMount() {
        this.element.classList.add("relative");

        this.mousePosition = followCursor.getMousePosition()

        this.createBlob();
        this.connectIcon();
        this.setupAnimation();
        setTimeout(() => this.onResize(), 0)
    }
    connectIcon() {
        const icon = this.element.querySelector('[class*="icon-"]') as HTMLElement;
        if (!icon) return

        this.iconWrapper = document.createElement("span");
        this.iconWrapper.className =
            "block absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-1";
        icon.className += " bg-transition";
        this.iconWrapper.appendChild(icon);
        this.element.appendChild(this.iconWrapper);
    }
    createBlob() {
        this.blobSVG = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        this.blobSVG.setAttribute("viewBox", "0 0 1000 1000");
        this.blobSVG.style.flexShrink = "0";
        this.blobSVG.style.width = "3rem";
        this.blobSVG.style.height = "3rem";


        this.blob = createBlob({
            numPoints: 8,
            centerX: Blob.DIMENSION / 2,
            centerY: Blob.DIMENSION / 2,
            minRadius: 430,
            maxRadius: 490,
            minDuration: 1,
            maxDuration: 2,
        });
        this.blob.path.setAttribute("stroke-width", "20");
        this.blob.path.classList.add("bg-transition", "blob-outline");
        this.blobSVG.appendChild(this.blob.path);

        this.element.append(this.blobSVG);
    }

    setupAnimation() {
        this.minScale = 1;
        this.maxDesktopScale = this.getModifierValue("max-desktop", 8);
        this.maxMobileScale = this.getModifierValue("max-mobile", 6);
        this.maxDistance = window.innerWidth - cols(2);

        this.currentScale = 1;
        this.currentTranslateX = 0;
        this.currentTranslateY = 0;
        this.currentArrowTranslateX = 0;
        this.currentArrowTranslateY = 0;
        this.rect = this.element.getBoundingClientRect();
    }
    onScroll(e: Lenis): void {
        this.rect = this.element.getBoundingClientRect();
    }
    onResize(): void {
        this.rect = this.element.getBoundingClientRect();
    }
    onRaf({ delta }) {
        if (document.hidden) {
            return;
        }
        const { left, top, width, height } = this.rect
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        let distance;

        if (device.touchScreenOnly) {
            distance = Math.abs(centerY - window.innerHeight / 2);
        } else {
            distance = Math.sqrt(
                Math.pow(this.mousePosition.x - centerX, 2) +
                Math.pow(this.mousePosition.y - centerY, 2)
            );
        }

        const maxScale = device.touchScreenOnly
            ? this.maxMobileScale
            : this.maxDesktopScale;
        // compute the scale so that the blob is at minScale when the cursor is at maxDistance
        // and at maxScale when the cursor is at minDistance
        const scaleAmount = Math.pow(clamp((1 - distance / this.maxDistance), 0, 1), 2)
        const scale = clamp((maxScale - this.minScale) * scaleAmount + this.minScale, this.minScale, maxScale);

        // then lerp the scale of the svg
        this.currentScale += (scale - this.currentScale) * 0.05 * (delta / 16);
        this.currentScale = Math.min(this.currentScale, maxScale);

        this.targetTranslateX = 0;
        this.targetTranslateY = 0;
        let arrowTranslateX = 0;
        let arrowTranslateY = 0;

        if (!device.touchScreenOnly && distance < this.maxDesktopScale * 30) {
            this.targetTranslateX = (this.mousePosition.x - centerX) * 0.06;
            this.targetTranslateY = (this.mousePosition.y - centerY) * 0.06;
            arrowTranslateX = (this.mousePosition.x - centerX) * 0.1;
            arrowTranslateY = (this.mousePosition.y - centerY) * 0.1;
            this.onMouseOver()
        } else {
            this.onMouseOut()
        }
        this.currentTranslateX = lerp(this.currentTranslateX, this.targetTranslateX, 0.2 * (delta / 16)); // (translateX - currentTranslateX) * 0.2 * (delta / 16) +  currentTranslateX;
        this.currentTranslateY = lerp(this.currentTranslateY, this.targetTranslateY, 0.2 * (delta / 16)); // (translateX - currentTranslateX) * 0.2 * (delta / 16) +  currentTranslateX;
        //currentTranslateY = lerp(translateY - currentTranslateY) * 0.2 * (delta / 16) + currentTranslateY;
        this.currentArrowTranslateX = (arrowTranslateX - this.currentArrowTranslateX) * 0.2 * (delta / 16) + this.currentArrowTranslateX;
        this.currentArrowTranslateY = (arrowTranslateY - this.currentArrowTranslateY) * 0.2 * (delta / 16) + this.currentArrowTranslateY;

        this.blobSVG.style.transform = `scale(${this.currentScale}) translate(${this.currentTranslateX}px, ${this.currentTranslateY}px)`;
        const strokeWidth = 20 / this.currentScale;
        this.blob.path.setAttribute("stroke-width", `${strokeWidth}`);
        if (this.iconWrapper) {
            this.iconWrapper.style.transform = `translate(${this.currentArrowTranslateX}px, ${this.currentArrowTranslateY}px)`;
        }
    }

    private isHover = false
    onMouseOver() {
        const { x, y, width, height } = this.blobSVG.getBoundingClientRect();
        const magnetX = clamp((this.mousePosition.x - x) / width, 0, 1) * Blob.DIMENSION;
        const magnetY = clamp((this.mousePosition.y - y) / height, 0, 1) * Blob.DIMENSION;
        this.blob.setMagnet(magnetX, magnetY);

        followCursor.lockTo(this.rect.left + this.rect.width / 2 + this.targetTranslateX * 12, this.rect.top + this.rect.height / 2 + this.targetTranslateY * 12);

        if (this.isHover) {
            return;
        }
        this.isHover = true
        // Next is only done on enter
        this.blob.path.classList.add("fill");
        this.iconWrapper?.classList.add("filter-invert");
        followCursor.enableFill(true)

        // We let time for follower to enter the blob. Then if it's still hovering, we hide the follower
        setTimeout(() => {
            if (this.isHover) {
                followCursor.hide()
            }
        }, 150);
    }
    onMouseOut() {
        if (!this.isHover) {
            return;
        }
        this.isHover = false
        this.blob.path.classList.remove("fill");
        this.iconWrapper?.classList.remove("filter-invert");
        followCursor.show()
        followCursor.disableFill()
        followCursor.unlock()
    }

    onUnmount(): void {
        this.blob?.destroy();
    }
}
