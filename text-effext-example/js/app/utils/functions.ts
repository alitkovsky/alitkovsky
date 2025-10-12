import { ElementOrSelector } from "motion"

export const isDev = () => (import.meta as any).env.DEV
export const cols = (numCols: number) => numCols * (window.innerWidth / 14)

export const imageLoaded = (imageEl: HTMLImageElement, cb: () => void = null) => {
    return new Promise<void>(r => {
        if (imageEl.complete) {
            cb?.()
            r()
        } else {
            imageEl.addEventListener('load', () => {
                cb?.()
                r()
            }, { once: true })
        }
    })
}

export const attrStartsWith = (sel, str) => [...document.querySelectorAll(sel)]
    .filter(ele => [...ele.attributes]
        .filter(({ name }) => name.startsWith(str))
        .length > 0
    )


export function getStackTrace() {
    var obj: any = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack.split('\n').slice(1).map(line => line.trim());
};

export function wnkWarn(message: string) {
    console.log(`%cWnkWarn: ${message}`,
        'color: #857421; background: #fcee91; padding: 4px; display: block',
    )
}

export function resolveElements(
    elements: ElementOrSelector,
): Element[] {
    if (typeof elements === "string") {
        elements = document.querySelectorAll(elements)
    } else if (elements instanceof Element) {
        elements = [elements]
    }
    return Array.from(elements || [])
}

