import barba, { type ITransitionData } from '@barba/core';
import { animate } from 'motion';
import { globalEvents } from '../../events/bus';
import { getColorLuminance } from '../../utils';
import { isDev } from '../../utils/functions';
import { canIUse } from '../features';
import { getLenis } from "../lenis";
import lifecycle from '../lifecycle';
import loader from '../loader';

// @unocss-include

type ExtendedTransitionData = ITransitionData & {
    nextPageColor?: string
}

const backgroundsWrapper = document.querySelector<HTMLDivElement>('#backgrounds')
function getNextPageBackgroundColor(data: ExtendedTransitionData) {
    // Cache result for transition
    if (data.nextPageColor) return data.nextPageColor
    let result = ''
    const loader = document.querySelector('#loader')
    if ((data.trigger as HTMLAnchorElement).hasAttribute?.('next-background')) {
        result = (data.trigger as HTMLAnchorElement).getAttribute('next-background')
        loader.classList.add(getColorLuminance(result) > 0.5 ? 'force-black' : 'force-white')
    } else {
        loader.classList.remove('force-black', 'force-white')
        const path = data.next.url.path === '/' ? '/' : data.next.url.path.slice(1)
        result = window.wnkExposed?.xback?.[path] ?? '#131313'
    }
    data.nextPageColor = result
    return result

}

function setAllBackgroundsToColor(color: string, duration?: number) {
    const backgrounds = document.querySelectorAll<HTMLElement>('.background-square')
    for (const background of backgrounds) {
        if (duration) {
            background.style.transitionDuration = duration.toString() + 's'
        }
        background.style.backgroundColor = color
    }
}

export function initBarba() {
    const excludeWordpressLinks = () => document.querySelectorAll("#wpadminbar a").forEach(item => item.setAttribute('data-barba-prevent', 'self'));

    // barba.use(alterFetch, {
    //     alterResult: (result) => {
    //         return typoFixInHTMLString(result)
    //     }
    // })

    barba.init({
        debug: isDev(),
        prefetchIgnore: true,
        timeout: 10e3,
        transitions: [
            {
                name: 'to-project',
                from: {
                    custom: (data: ITransitionData) => {
                        return canIUse('images3d') && (data.trigger as HTMLElement)?.getAttribute?.('data-barba-to-project') === ''
                    }
                },
                async leave(data) {
                    const targetBackground = getNextPageBackgroundColor(data)
                    setAllBackgroundsToColor(targetBackground, 0.6)
                    animate(data.current.container, {
                        opacity: 0,
                    }, {
                        duration: 0.4,
                    })
                    globalEvents.publish('barbaTransitionToImage', data.trigger as Element)
                    setTimeout(() => {
                        animate(
                            document.body,
                            {
                                backgroundColor: targetBackground,
                            },
                            {
                                duration: 0.6,
                            }
                        )
                    }, 600)
                    await globalEvents.once('barbaContinueTransition')
                    getLenis().scrollTo(0, {
                        immediate: true
                    })
                },
                async enter(data) {
                    lifecycle.initPage()
                    backgroundsWrapper.style.opacity = '1'

                    data.next.container.style.visibility = 'hidden'
                    data.current.container.style.display = 'none'

                    await globalEvents.once('pageReady')
                    data.next.container.style.visibility = null

                    setTimeout(() => {
                        document.body.style.backgroundColor = "";
                    }, 2000);
                }
            },
            {
                name: 'default-transition',
                async leave(data, scroll = true) {
                    const targetBackground = getNextPageBackgroundColor(data)
                    setAllBackgroundsToColor(targetBackground)

                    await animate(
                        document.body,
                        {
                            backgroundColor: targetBackground,
                        }, {
                        duration: 0.4,
                    }
                    ).finished

                    await animate(data.current.container, {
                        opacity: 0,
                    }, {
                        duration: 0.4,
                    }).finished

                    loader.start()

                    getLenis().scrollTo(0, {
                        immediate: true
                    })
                },
                async enter(data) {
                    lifecycle.initPage()
                    data.next.container.style.visibility = 'hidden'
                    data.current.container.style.display = 'none'

                    await globalEvents.once('pageReady')
                    data.next.container.style.visibility = null

                    setTimeout(() => {
                        document.body.style.backgroundColor = "";
                    }, 2000);
                }
            }

        ],
    })

    barba.hooks.before((data, transition) => {
        window.dispatchEvent(new CustomEvent('close-menu'))
        const color = getNextPageBackgroundColor(data)
        window.dispatchEvent(new CustomEvent('barba-start', {
            detail: {
                name: transition.name,
                nextPageColor: color
            }
        }))
    })


    barba.hooks.after(() => {
        window.dispatchEvent(new CustomEvent('barba-end'))
        getLenis().resize()
    })

    excludeWordpressLinks()

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
}
