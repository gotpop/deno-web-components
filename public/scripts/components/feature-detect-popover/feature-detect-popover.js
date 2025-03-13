import { testCssFeatures } from "../../utils/test-css-features.js"

export class FeatureDetectPopover extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  init() {
    const test = testCssFeatures()
    this.render(test)
  }

  render(features) {
    const template = `
      <style>
        :host {
          display: block;
        }
        
        .feature-list {
          padding: 1rem;
        }
      </style>
      
      <div class="feature-list">
        ${
      Object.entries(features).map(([feature, supported]) => `
          <div>
            ${feature}: ${supported ? "✅" : "❌"}
          </div>
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
