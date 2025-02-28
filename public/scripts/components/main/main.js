import { loadCSS } from "../../utils/loadCss.js";

export class Main extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");

    const cssPath = new URL("./main.css", import.meta.url).href;
    loadCSS(cssPath, shadow);

    shadow.appendChild(slot);
  }
}
