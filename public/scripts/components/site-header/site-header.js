import { loadCSS } from "../../utils/loadCss.js";

export class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const slot = document.createElement("slot");

    const cssPath = new URL("./site-header.css", import.meta.url).href;

    loadCSS(cssPath, shadow, (success) => {
      if (success) {
        this.removeAttribute("hidden");
      }
    });

    shadow.appendChild(slot);
  }
}
