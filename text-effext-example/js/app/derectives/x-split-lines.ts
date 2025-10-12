
import { typoFix } from "../modules/typoFix";
import { AlpineDirective } from "./AlpineDirective";

// const showRect = (rect: DOMRect) => {
//     // create a div to visualize the domrect
//     const div = document.createElement('div')
//     div.style.position = 'absolute'
//     div.style.left = rect.left + 'px'
//     div.style.top = (rect.top + window.scrollY) + 'px'
//     div.style.width = rect.width + 'px'
//     div.style.height = rect.height + 'px'
//     div.style.outline = 'solid 1px #f00'
//     document.body.appendChild(div)
// }

export default class SplitLines extends AlpineDirective {

    lineHeight: number;

    create() {
        typoFix(this.element)
        this.prepareMultilineChildren()
        this.setupSplit()
        this.addEventListenerTo(document.fonts, 'loadingdone', this.onResize.bind(this))
    }

    onResize() {
        this.unSplitLines()
        this.setupSplit()
    }

    setupSplit() {
        this.lineHeight = parseFloat(getComputedStyle(this.element).getPropertyValue('line-height'))
        this.splitWords()
        this.splitLines()
    }

    prepareMultilineChildren() {
        const multilineChildren = this.element.querySelectorAll(':scope > em')
        for (const el of multilineChildren) {
            const newContent = document.createDocumentFragment()
            const nodes = Array.from(el.childNodes)
            for (const node of nodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const words = node.textContent?.split(' ')
                    for (const word of words) {
                        const em = document.createElement('em')
                        em.textContent = word
                        newContent.appendChild(em)
                        newContent.append(' ')
                    }
                } else {
                    (node as HTMLElement).classList.add('em')
                    newContent.appendChild(node)
                }
            }
            el.replaceWith(newContent)
        }
    }

    splitWords() {
        const nodes = Array.from(this.element.childNodes) // Array form to unlink from DOM changes
        const appendWhitespace = () => {
            const whitespace = document.createElement('span')
            whitespace.textContent = ' '
            whitespace.classList.add('whitespace')
            this.element.appendChild(whitespace)
        }
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length === 0) continue
                const words = node.textContent?.split(' ')
                for (let j = 0; j < words.length; j++) {
                    const word = words[j]
                    if (word.trim().length === 0) continue
                    const span = document.createElement('span')
                    span.classList.add('word')
                    span.textContent = word
                    this.element.appendChild(span)
                    if (j < words.length - 1) {
                        appendWhitespace()
                    }
                }
                node.remove()
            } else {
                this.element.appendChild(node)
                if (i < nodes.length - 1) {
                    appendWhitespace()
                }
            }
        }
        // this.element.innerHTML = ''
        // this.element.appendChild(newContent)
    }

    splitLines() {
        const chunks = this.element.children

        let lastRect: DOMRect
        let lines = []
        let currentLineItems = []
        for (const chunk of chunks) {
            if (chunk.classList.contains('whitespace')) {
                currentLineItems.push(chunk)
                continue
            }
            const rect = chunk.getBoundingClientRect()

            if (lastRect && Math.abs(rect.top - lastRect.top) > this.lineHeight * 0.2) {
                lines.push(currentLineItems)
                currentLineItems = [];
            }
            currentLineItems.push(chunk)
            lastRect = rect
        }
        lines.push(currentLineItems)
        lines.forEach(line => this.createLine(line))
    }

    createLine(items: HTMLElement[]) {
        const line = document.createElement('span')
        this.element.appendChild(line)
        line.classList.add('line')
        items.forEach(item => line.appendChild(item))
        // line.innerHTML += '&nbsp;'
        this.mergeLineWords(line)
    }

    mergeLineWords(line: HTMLElement) {
        this.unWrapNodes(line, ['word', 'whitespace'])
    }

    unSplitLines() {
        // this.element.
        this.unWrapNodes(this.element, ['line'])
    }

    unWrapNodes(parent: HTMLElement, classNames: string[]) {
        const nodes = Array.from(parent.childNodes)
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i] as HTMLElement
            if (classNames.some(className => node.classList?.contains(className))) {
                parent.append(...node.childNodes)
                node.remove()
            } else {
                parent.appendChild(node)
            }
        }
        parent.normalize()
    }

}