import barba from "@barba/core";

const regexBefore = /\s[\\?:!»]/gm
const replaceBefore = (match) => {
    return ` ${match.trim()}`
}
const regexAfter = /[«]\s/gm
const replaceAfter = (match) => {
    return `${match.trim()} `
}

export const typoFixInString = (input: string) => input.replace(regexBefore, replaceBefore).replace(regexAfter, replaceAfter)

export function searchReplaceInDom(element, replace) {
    for (let node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                searchReplaceInDom(node, replace);
                break;
            case Node.TEXT_NODE:
                node.textContent = replace(node.textContent)
                break;
            case Node.DOCUMENT_NODE:
                searchReplaceInDom(node, replace);
        }
    }
}

export const typoFix = (element = document.body) => {
    searchReplaceInDom(element, typoFixInString)
}

barba.hooks.beforeEnter((data) => {
    typoFix(data.next.container)
})