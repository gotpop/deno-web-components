import { testCssFeatures } from "../../utils/test-css-features.js"

export class FeatureDetectPopover extends HTMLElement {
  constructor() {
    super()
  }

  init() {
    const test = testCssFeatures()
    this.render(test)
    document.getElementById("app-shell")?.setAttribute("inert", "")
  }

  render(features) {
    const featureList = document.createElement("div")
    featureList.className = "feature-list"

    this.appendChild(featureList)
    featureList.className = "feature-list"

    features.forEach((supported, feature) => {
      const details = document.createElement("details")
      const summary = document.createElement("summary")
      const div = document.createElement("div")

      summary.textContent = `${feature}: ${supported ? "✅" : "❌"}`
      div.textContent = `This feature is currently ${
        supported ? "supported" : "not supported"
      } in your browser.`

      details.appendChild(summary)
      details.appendChild(div)
      featureList.appendChild(details)
    })
  }

  connectedCallback() {
    this.init()
  }
}

customElements.define("feature-detect-popover", FeatureDetectPopover)
