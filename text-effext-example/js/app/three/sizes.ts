// @unocss-include
const sizer = document.createElement('div')
sizer.className = 'fixed top-0 left-0 w-100lvw h-100lvh pointer-events-none visibilty-hidden'
document.body.appendChild(sizer)

const sizes = {
    width: sizer.clientWidth,
    height: sizer.clientHeight
}
let resizeCallbacks: (() => void)[] = []

export const triggerResize = () => {
    if (sizes.width === sizer.clientWidth && sizes.height === sizer.clientHeight) {
        return
    }
    sizes.width = sizer.clientWidth
    sizes.height = sizer.clientHeight
    resizeCallbacks.forEach(c => c())

    // @todo https://trello.com/c/g0RhaBU5/244-g%C3%A9rer-le-resize-des-animations-sur-mobile
    // setTimeout(() => {
    //     sizes.width = sizer.clientWidth
    //     sizes.height = sizer.clientHeight
    //     resizeCallbacks.forEach(c => c())
    // }, 300)
}
window.addEventListener('resize', triggerResize)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        triggerResize()
    }
})
export const useSizes = () => sizes

export const onResize = (cb: () => void) => {
    resizeCallbacks.push(cb)
    return {
        unsubscribe: () => resizeCallbacks = resizeCallbacks.filter(c => c !== cb),
        trigger: () => cb()
    }
}

