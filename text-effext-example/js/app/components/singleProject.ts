
import { animate } from "motion";
import { defineComponent } from ".";
import { nextTick } from "../animation/delay";
import { updateNavColor } from "../modules/alpine";
import lifecycle from "../modules/lifecycle";
import { getLenis } from "../modules/lenis";
import { typoFix } from "../modules/typoFix";

export default defineComponent((projectHasCaseStudy, projectColor, sourceParticlesColor) => ({
    bgColor: projectColor,
    colorChanges: [],
    particlesColor: sourceParticlesColor,
    currentChange: null,
    caseStudyEnabled: false,

    projectContent: '',
    studyContent: '',
    contentWrapper: null,

    get activeColor() {
        return this.caseStudyEnabled ? 'white' : this.bgColor
    },
    init() {
        const params = new URLSearchParams(window.location.search)

        this.caseStudyEnabled = projectHasCaseStudy && params.get('study') !== 'false'
        this.projectContent = this.$refs.projectContent.innerHTML
        this.studyContent = this.$refs.studyContent.innerHTML
        this.contentTarget = this.$refs.contentWrapper

        this.contentTarget.innerHTML = this.caseStudyEnabled ? this.studyContent : this.projectContent
        typoFix(this.contentTarget)

        const findedXColorChange = Array.from(this.$root.querySelectorAll('[x-color-change]'));
        this.colorChanges = findedXColorChange.reverse();

        const onPopState = () => {
            if (window.location.search === '?study=false') {
                this.showStudy(false, false)
            }
        }
        window.addEventListener('popstate', onPopState)
        this.cleanupListener = () => window.removeEventListener('popstate', onPopState)
    },
    async showStudy(show, pushState = true) {
        if (show == this.caseStudyEnabled) return
        await animate(this.contentTarget, { opacity: 0 }, { duration: 0.3 }).finished
        getLenis().scrollTo(0, {
            duration: 1,
        })
        this.caseStudyEnabled = show
        if (pushState) {
            window.history.pushState(null, null, window.location.pathname + (show ? '' : '?study=false'))
        }
        this.contentTarget.innerHTML = this.caseStudyEnabled ? this.studyContent : this.projectContent
        typoFix(this.contentTarget)
        this.contentTarget.style.opacity = 1
        await nextTick()
        lifecycle.initPage()
        updateNavColor()
    },
    onScroll() {
        // We find the first color change that is above the middle of the screen
        for (const colorChange of this.colorChanges) {
            if (getComputedStyle(colorChange).display == 'none') continue
            const { top } = colorChange.getBoundingClientRect()
            if (top < window.innerHeight / 2) {
                if (colorChange === this.currentChange) return
                this.currentChange = colorChange
                const data = this.$getData(colorChange)
                this.bgColor = data.color
                if (data.particlesColor) {
                    this.particlesColor = data.particlesColor;
                }
                return
            }
        }
        this.bgColor = projectColor
        this.currentChange = null;
        this.particlesColor = sourceParticlesColor
    },
    destroy() {
        this.cleanupListener?.()
    }
}))