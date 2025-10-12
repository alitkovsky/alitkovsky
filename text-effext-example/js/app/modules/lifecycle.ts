import { AlpineDirective } from "../directives/AlpineDirective"
import { globalEvents } from "../events/bus"
import loader from "./loader"

class Lifecycle {
    private mountingDirectives: AlpineDirective[] = []

    constructor() {
        globalEvents.subscribe('registerMountDirective', this.registerDirective.bind(this))
        globalEvents.subscribe('directiveMounted', this.unregisterDirective.bind(this))
    }

    registerDirective(directive: AlpineDirective) {
        this.mountingDirectives.push(directive)
    }
    unregisterDirective(directive: AlpineDirective) {
        const index = this.mountingDirectives.indexOf(directive)
        if (index !== -1) {
            this.mountingDirectives.splice(index, 1)
            if (this.mountingDirectives.length === 0) {
                this.afterInit()
            }
        }
    }

    initPage() {
        // loader.show()
        // Trigger all onmount methods
        globalEvents.publish('mountDirectives')
    }
    async afterInit() {
        if (loader.loading) {
            await loader.finish()
        }
        globalEvents.publish('pageReady')
    }

}
const lifecycle = new Lifecycle()
// window.lc = lifecycle
export default lifecycle
