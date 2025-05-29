import { FeatureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { initViewTransitions } from "./view-transitions.js"
import { initWebComponents } from "./define-web-components.js"

const worklets = ["grid", "tetris", "tetris-grid"].map(
  (name) => `/scripts/worklets/worklet.${name}.js`,
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

// const orderSelect = document.getElementById("order")

// console.log("Order select element:", orderSelect)

// if (orderSelect) {
//   orderSelect.addEventListener("change", function () {
//     const url = new URL(window.location.href)
//     const params = new URLSearchParams(url.search)

//     console.log("Order changed to:", this.value)

//     // Update or add the selected value to the query string
//     if (this.value) {
//       params.set(this.name, this.value)
//     } else {
//       params.delete(this.name)
//     }

//     // Navigate to the new URL directly
//     const newUrl = `${url.pathname}?${params.toString()}`
//     window.location.href = newUrl
//   })
// }
