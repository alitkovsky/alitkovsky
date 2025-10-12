import { animate } from "motion";
import { defineComponent } from ".";
import { canIUse } from "../modules/features";

let rgbshiftModule
const disableRGBShift = async () => {
    if (!canIUse('three')) return
    if (!rgbshiftModule) {
        const { RGBShiftMaterial } = await import('../three/postprocessing/RGBShiftMaterial')
        rgbshiftModule = RGBShiftMaterial
    }
    rgbshiftModule.disabled = true
}
const enableRGBShift = async () => {
    if (!rgbshiftModule) return
    rgbshiftModule.disabled = false
}

export default defineComponent(() => ({
    openId: null,
    isOpening: false,
    async openPerson(id) {
        this.openId = id;
        const targetWrapper = this.$refs[`portraitOpenTarget-${id}`];
        const targetImage = this.$refs[`portraitImage-${id}`];
        await this.moveImage(targetImage, targetWrapper);
        disableRGBShift()
    },
    async closePerson() {
        if (this.isOpening) return;
        const targetWrapper = this.$refs[`portraitClosedTarget-${this.openId}`];
        const targetImage = this.$refs[`portraitImage-${this.openId}`];
        targetImage.style.width = '';
        targetImage.style.height = '';
        targetWrapper.appendChild(targetImage);
        this.openId = null;
        enableRGBShift()
    },
    async moveImage(image, target, delay = 0) {
        // Flip First
        await this.$nextTick();
        const initialBounds = image.getBoundingClientRect();
        // Flip Last
        target.appendChild(image);
        await this.$nextTick();
        const finalBounds = image.getBoundingClientRect()
        // FLIP Invert
        // FLIP Play
        this.isOpening = true
        // await gsap.fromTo(image,
        //     {
        //         width: initialBounds.width,
        //         height: initialBounds.height,
        //         x: initialBounds.left - finalBounds.left,
        //         y: initialBounds.top - finalBounds.top,
        //     },
        //     {
        //         duration: 0.6,
        //         delay,
        //         ease: 'power4.out',
        //         width: finalBounds.width,
        //         height: finalBounds.height,
        //         x: 0,
        //         y: 0,
        //     });
        await animate(image, {
            width: [initialBounds.width + 'px', finalBounds.width + 'px'],
            height: [initialBounds.height + 'px', finalBounds.height + 'px'],
            x: [initialBounds.left - finalBounds.left, 0],
            y: [initialBounds.top - finalBounds.top, 0],
        }, {
            duration: 0.6,
            delay,
            easing: power4.out
        }).finished
        image.style.transform = '';
        image.style.width = '';
        image.style.height = '';
        this.isOpening = false
    },
    get isMobile() {
        return window.innerWidth < 1024;
    },
    destroy() {
        enableRGBShift()
    }
}))