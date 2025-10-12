import directives from "./directives"
import alpine from './modules/alpine'
import { initBarba } from './modules/barba'
import followCursor from "./modules/followCursor"
import lenis from './modules/lenis'
import { initThree } from './three/init'

import '@lottiefiles/lottie-player'
import components from "./components"
import setFeatureConfig, {canIUse, setFlag} from "./modules/features"
import lifecycle from "./modules/lifecycle"
import { typoFix } from "./modules/typoFix"
import { nextTick } from "./animation/delay"
import loader from "./modules/loader"
import linksEffects from "./modules/linksEffects"
/**
 * Initialisation spécifique au projet
 */
export async function initApp() {
  loader.setup()

  setFeatureConfig()

  typoFix()
  lenis()
  initBarba()

  followCursor.init()
  await initThree()

  linksEffects()
  components()
  directives()
  alpine()
  await nextTick()
  lifecycle.initPage()
}
