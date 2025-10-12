// Styles
import '@unocss/reset/tailwind.css'
import '@wearewanaka.com/boiler-tools/devtools'
import 'virtual:phprefresh'
import 'virtual:uno.css'
import '../css/scss/styles.scss'
import { initApp } from './app/app'
import { globalEvents } from './app/events/bus'

// Init
if (document.readyState !== 'loading') {
    initApp()
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}

// @ts-ignore
if (import.meta.env.DEV && window.phpRefreshScrollRestore) {
    globalEvents.once('mountDirectives', () => {
        // @ts-ignore
        window.scrollTo(0, window.phpRefreshScrollRestore)
    })
}
