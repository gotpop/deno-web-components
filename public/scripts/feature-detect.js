import { testCssFeatures } from "./utils/test-css-features.js"

class FeatureDetect {
  constructor(dialog) {
    if (!dialog) {
      throw new Error("Dialog element is required")
    }

    this.dialog = dialog
    this.featureList = this.dialog.querySelector(".feature-list")
    this.template = this.dialog.querySelector("#feature-item")

    if (!this.featureList || !this.template) {
      throw new Error("Required elements not found in dialog")
    }
  }

  init() {
    const testedCSSFeatures = testCssFeatures()

    const hasUnsupportedCSSFeature = Array.from(testedCSSFeatures.values())
      .some(
        ({ supported }) => supported === false,
      )

    if (hasUnsupportedCSSFeature) {
      console.warn("Some features are not supported")
      this.dialog.showModal()
    } else {
      console.log("All features are supported")
    }

    this.render(testedCSSFeatures)
    this.logSupportedFeatures(testedCSSFeatures)
  }

  render(testedCSSFeatures) {
    testedCSSFeatures.forEach((feature) => this.createFeatureItem(feature))
  }

  createFeatureItem({ description, supported, title }) {
    const clone = this.template.content.cloneNode(true)

    const summary = clone.querySelector("summary")
    const div = clone.querySelector("div")

    const summaryText = summary.querySelector(".summary-text")
    const summaryIcon = summary.querySelector(".summary-icon")

    summaryText.textContent = title
    summaryIcon.textContent = supported ? "✅" : "❌"

    div.textContent = description

    this.featureList.appendChild(clone)
  }

  logSupportedFeatures(testedCSSFeatures) {
    const featuresArray = Array.from(testedCSSFeatures).map((
      [key, feature],
    ) => ({
      Feature: feature.title,
      Supported: feature.supported ? "✅" : "❌",
      // Description: feature.description,
    }))
    console.table(featuresArray)
    console.groupCollapsed("CSS Feature Support")
    console.groupEnd("CSS Feature Support")
  }
}



export const featureDetect = (id) => new FeatureDetect(document.getElementById(id)).init()