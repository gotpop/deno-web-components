import { FeatureDetect } from "./feature-detect.js"
import { Footer } from "./components/site-footer/site-footer.js"
import { GridItem } from "./components/grid-item/grid-item.js"
import { Hero } from "./components/site-hero/site-hero.js"
import { MainContent } from "./components/main-content/main-content.js"

const components = [
  ["site-hero", Hero],
  ["main-content", MainContent],
  ["grid-item", GridItem],
  ["site-footer", Footer],
]

// Register remaining components
const definitions = components.map(([name, constructor]) => {
  if (!customElements.get(name)) {
    customElements.define(name, constructor)
    return customElements.whenDefined(name)
  }
  return Promise.resolve()
})

Promise.all([
  ...definitions,
]).then(() => {
  console.log("All components are ready")
})

const dialog = document.getElementById("feature-detect-popover")
new FeatureDetect(dialog).init()
