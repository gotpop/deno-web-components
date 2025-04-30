import { FeatureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { initViewTransitions } from "./view-transitions.js"
import { initWebComponents } from "./define-web-components.js"

const worklets = ["grid", "tetris", "tetris-grid"].map(
  (name) => `./scripts/worklets/worklet.${name}.js`,
)

worklets.forEach(async (worklet) => {
  try {
    if (!CSS?.paintWorklet) {
      throw new Error("CSS Paint Worklet API is not supported")
    }
    await CSS.paintWorklet.addModule(worklet)
    console.log(`Worklet loaded successfully: ${worklet}`)
  } catch (error) {
    console.error(`Failed to load worklet ${worklet}:`, error)
  }
})

initWebComponents()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()

if (window.location.hostname === "localhost") {
  initLiveReload()
}

initViewTransitions()
