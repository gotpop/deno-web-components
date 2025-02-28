import { loadCSS } from "../../utils/loadCss.js";

export class Hero extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");

    // Load CSS
    const cssPath = new URL("./site-hero.css", import.meta.url).href;
    loadCSS(cssPath, shadow);

    shadow.appendChild(slot);
  }
}
