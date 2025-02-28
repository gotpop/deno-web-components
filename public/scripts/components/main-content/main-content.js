import { loadCSS } from "../../utils/loadCss.js";

export class MainContent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");

    const cssPath = new URL("./main-content.css", import.meta.url).href;
    loadCSS(cssPath, shadow);

    shadow.appendChild(slot);
  }
}
