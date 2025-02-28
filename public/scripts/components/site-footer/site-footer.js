import { loadCSS } from "../../utils/loadCss.js";

export class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");
    this.setAtribute("hidden", "");

    const cssPath = new URL("./site-footer.css", import.meta.url).href;

    loadCSS(cssPath, shadow, (success) => {
      if (success) {
        this.removeAttribute("hidden");
      }
    });

    shadow.appendChild(slot);
  }
}
