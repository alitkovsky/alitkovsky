import { defineComponent } from ".";

export default defineComponent(() => ({
    emails: ['hello', 'jobs'],
    currentEmail: 'hello',
    transforms: {},
    angle: 0,
    async init() {
        await this.$nextTick()
        await this.$nextTick()
        this.computeTransforms()
    },
    async computeTransforms() {
        await this.$nextTick()
        const links = this.$el.querySelectorAll('a[data-email]')
        links.forEach(link => {
            const span = link.querySelector('span')
            const x = span.offsetWidth
            const y = span.offsetTop
            this.transforms[link.dataset.email] = {
                x, y
            }
        })

        const vals = Object.values(this.transforms)
        if (vals.length >= 2) {
            const first = vals[0]
            const last = vals[vals.length - 1]
            const yDist = last.y - first.y
            const xDist = last.x - first.x
            this.angle = Math.atan(yDist / xDist) + Math.PI / 2
        }
    },
    get transformValue() {
        if (this.transforms[this.currentEmail]) {
            const { x, y } = this.transforms[this.currentEmail]
            return `translate(${x}px, ${y}px)`
        }
        return ''
    },
}))
