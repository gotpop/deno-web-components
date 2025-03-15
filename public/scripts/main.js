import { FeatureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { initWebComponents } from "./define-web-components.js"

initWebComponents()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()

if (window.location.hostname === "localhost") {
  initLiveReload()
}
