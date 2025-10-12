export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export const nextTick = () => new Promise(resolve => requestAnimationFrame(resolve))
export const forever = () => new Promise(() => {})