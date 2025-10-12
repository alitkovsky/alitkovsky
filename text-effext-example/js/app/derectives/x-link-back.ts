import { AlpineDirective } from "./AlpineDirective";
import barba from '@barba/core'

/**
 * @directive "Link back"
 * Prevents following the link and performs a history back if the refferer is from the same domain
 */
export default class LinkBack extends AlpineDirective {
    onMount() {
        const domain = this.getDomain(window.location.href)
        const refererDomain = this.getDomain(document.referrer)
        if (barba.history.previous || domain === refererDomain) {
            this.addEventListener('click', (ev: Event) => {
                ev.preventDefault()
                ev.stopPropagation()
                history.back()
                return
            })
        }
    }

    getDomain(url: string) {
        if (!url) return;
        const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return matches && matches[1];
    }
}