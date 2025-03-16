import { GridItem } from "./components/grid-item/grid-item.js"
import { Hero } from "./components/site-hero/site-hero.js"
import { MainContent } from "./components/main-content/main-content.js"
import { SiteFooter } from "./components/site-footer/site-footer.js"
import { log } from "./console-log.js"

export const initWebComponents = () => {
  const components = [
    ["site-hero", Hero],
    ["main-content", MainContent],
    ["grid-item", GridItem],
    ["site-footer", SiteFooter],
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
  ]).then(() => log.success("All components are ready"))
}
