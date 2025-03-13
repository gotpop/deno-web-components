import { FeatureDetectPopover } from "./components/feature-detect-popover/feature-detect-popover.js"
import { Footer } from "./components/site-footer/site-footer.js"
import { GridItem } from "./components/grid-item/grid-item.js"
import { Hero } from "./components/site-hero/site-hero.js"
import { MainContent } from "./components/main-content/main-content.js"

const components = [
  ["site-hero", Hero],
  ["main-content", MainContent],
  ["grid-item", GridItem],
  ["site-footer", Footer],
  ["feature-detect-popover", FeatureDetectPopover],
]

// Register all components and track their definitions
const definitions = components.map(([name, constructor]) => {
  if (!customElements.get(name)) {
    customElements.define(name, constructor)
    return customElements.whenDefined(name)
  }
  return Promise.resolve()
})

// Wait for all components to be defined
Promise.all(definitions).then(() => {
  console.log("All components are ready")
})

if (location.hostname === "localhost") {
  const ws = new WebSocket(`ws://${location.host}/live-reload`)
  ws.onmessage = () => location.reload()
}

const popover = document.getElementById("feature-detect-popover")
popover.showPopover()
