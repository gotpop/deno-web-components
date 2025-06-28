import { initializeOrderSelect } from "./components/order-select.js"
import { initWebComponents } from "./define-web-components.js"
import { FeatureDetect } from "./feature-detect.js"
import { initMobilePopover } from "./init-mobile-popover.js"
import { initLiveReload } from "./live-reload.js"
import { initPerformanceAwarePreloading } from "./utils/preloading.js"
import { setScrollbarWidth } from "./utils/scrollbar-width.js"
import { initWorklets } from "./utils/worklets.js"
import { initViewTransitions } from "./view-transitions/init.js"

initWorklets()
initWebComponents()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()
const viewTransitionManager = initViewTransitions()

if (window.location.hostname === "localhost") {
  initLiveReload()
}

document.addEventListener("DOMContentLoaded", () => {
  setScrollbarWidth()
  initializeOrderSelect(viewTransitionManager)
  initPerformanceAwarePreloading()
  initMobilePopover()
})

// Re-initialize after custom navigation event
document.addEventListener("app:navigationend", function () {
  console.log(
    "[main.js] app:navigationend event received. Re-initializing order select.",
  )
  initializeOrderSelect(viewTransitionManager)
  initMobilePopover()
})
