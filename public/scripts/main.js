import { FeatureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { initViewTransitions } from "./view-transitions.js"
import { initWebComponents } from "./define-web-components.js"

const worklets = ["grid", "tetris", "tetris-grid"].map(
  (name) => `./scripts/worklets/worklet.${name}.js`,
)

worklets.forEach((worklet) => {
  CSS
    .paintWorklet
    .addModule(worklet)
})

initWebComponents()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()

if (window.location.hostname === "localhost") {
  initLiveReload()
}

initViewTransitions()
