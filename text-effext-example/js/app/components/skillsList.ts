import { defineComponent } from ".";

export default defineComponent((skillsNum) => ({
    currentSkill: 0,
    totalSkills: skillsNum,
    skillVisible: false,
    absolutePositions: [],
    strokeTranslates: [],
    init() {
        this.onResize()
    },
    onResize() {
        if (window.innerWidth >= 768) return
        const parentRect = this.$refs.slogansWrapper.getBoundingClientRect()
        this.absolutePositions = []
        this.strokeTranslates = []
        for (let i = 0; i < this.totalSkills; i++) {
            const rect = this.$refs[`slogan_${i}`]?.getBoundingClientRect();
            this.absolutePositions.push(rect.y + window.scrollY);
            this.strokeTranslates.push(rect.y - parentRect.y)
        }
    },
    onScroll() {
        if (window.innerWidth >= 768) return
        for (let i = this.totalSkills - 1; i >= 0; i--) {
            const position = this.absolutePositions[i];
            if (!position) continue
            const posOnScreen = position - window.scrollY - 200
            if (posOnScreen < 300 && posOnScreen > 200) {
                this.currentSkill = i
                this.skillVisible = true
                return
            }
        }
        //this.skillVisible = false
    },
    rootBindings: {
        ['@scroll.window']() {
            this.onScroll()
        },
        ['@resize.window']() {
            this.onResize()
            this.onScroll()
        }
    }
}))