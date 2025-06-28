import { initializeOrderSelect } from "./components/order-select.js"
import { FeatureDetect } from "./feature-detect.js"
import { initMobilePopover } from "./init-mobile-popover.js"
import { initLiveReload } from "./live-reload.js"
import { initPerformanceAwarePreloading } from "./utils/preloading.js"
import { setScrollbarWidth } from "./utils/scrollbar-width.js"
import { initWorklets } from "./utils/worklets.js"
import { initViewTransitions } from "./view-transitions/init.js"

initWorklets()
setScrollbarWidth()
initializeOrderSelect(viewTransitionManager)
initPerformanceAwarePreloading()
initMobilePopover()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()
const viewTransitionManager = initViewTransitions()

const isLocalhost = import.meta.env?.DEV || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"

if (isLocalhost) {
  initLiveReload()
}

document.addEventListener("app:navigationend", function() {
  initializeOrderSelect(viewTransitionManager)
  initMobilePopover()
})
 