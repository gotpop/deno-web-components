import { loadCSS } from "../../utils/loadCss.js"

export class Footer extends HTMLElement {
  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: "open" })
    const slot = document.createElement("slot")

    this.setAttribute("hidden", "")

    loadCSS({
      callback: (success) => success && this.removeAttribute("hidden"),
      cssPath: new URL("./site-footer.css", import.meta.url).href,
      shadowRoot,
    })

    shadowRoot.appendChild(slot)
  }
}
