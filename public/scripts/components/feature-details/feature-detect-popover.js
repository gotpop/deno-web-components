import { testCssFeatures } from "../../utils/test-css-features.js"

export class FeatureDetectPopover extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  init() {
    const test = testCssFeatures()
    this.render(test)
    document.getElementById("app-shell")?.setAttribute("inert", "")
  }

  render(features) {
    const template = `

      
      <div class="feature-list">
      ${
      Object.entries(features).map(([feature, supported]) => `
        <details>
        <summary>${feature}: ${supported ? "✅" : "❌"}</summary>
        <div>
          This feature is currently ${
        supported ? "supported" : "not supported"
      } in your browser.
        </div>
        </details>
      `).join("")
    }
      </div>
    `

    this.shadowRoot.innerHTML = template
  }

  connectedCallback() {
    this.init()
  }
}

customElements.define("feature-detect-popover", FeatureDetectPopover)
