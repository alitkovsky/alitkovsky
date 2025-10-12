import { defineComponent } from ".";
import followCursor from "../modules/followCursor";

export default defineComponent((desktopAmount, mobileAmount) => ({
    amount: 0,
    hover: false,
    active: false,
    init() {
        this.updateAmount()
    },
    updateAmount() {
        if (window.innerWidth >= 1280) {
            this.amount = desktopAmount
        } else {
            this.amount = mobileAmount
        }
    },
    cursorIn() {
        if (this.hover) return
        this.hover = true
        followCursor.setScale(0)
        // followCursor.enableDifference()
        followCursor.enableFill()
    },
    cursorOut() {
        this.hover = false
        followCursor.setScale(1)
        // followCursor.enableDifference()
        followCursor.disableFill()

    }
}))