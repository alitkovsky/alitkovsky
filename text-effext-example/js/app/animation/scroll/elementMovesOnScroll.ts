/**
 * This function marks an element to tell if it is supposed
 * to move on scroll (ex: parallax)
 * This allow for checking later if the position of a 3D
 * element will need to be updated whenever the user scrolls
 * or if this update can be skipper for better perf.
 * @param element The element to mark
 */

export function declareElementMovesOnScroll(element: HTMLElement): void {
    element.setAttribute('data-moves-on-scroll', '')
}

/**
 * Checks if the element is marked as move on scroll or is child
 * of an element that is marked to move on scroll.
 * @see declareElementMovesOnScroll explanation
 * @param element The element to check
 * @returns True the element is supposed to move on scroll, false otherwise.
 */
export function elementMovesOnScroll(element: HTMLElement): boolean {
    return !!element.closest('[data-moves-on-scroll]')
}