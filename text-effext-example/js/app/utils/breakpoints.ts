const breakpoints = {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    'xxl': '1536px',
    '3xl': '1800px',
    '4xl': '2000px',
}

export const getBreakpoint = (modifiers: string[]) => {
    return  modifiers.find(modifier => breakpoints[modifier])
}
export const getBreakpointValue = (modifiers: string[]) => {
    return  breakpoints[getBreakpoint(modifiers)] ?? null
}