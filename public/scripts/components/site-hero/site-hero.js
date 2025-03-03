import { loadCSS } from "../../utils/loadCss.js";

export class Hero extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const slotContent = document.createElement("slot");
    const slotPoints = document.createElement("slot");

    slotContent.setAttribute("name", "content");
    slotPoints.setAttribute("name", "points");

    this.setAttribute("hidden", "");

    // Load CSS
    const cssPath = new URL("./site-hero.css", import.meta.url).href;

    loadCSS(cssPath, shadow, (success) => {
      if (success) {
        this.removeAttribute("hidden");
      }
    }, true);

    shadow.appendChild(slotContent);
    shadow.appendChild(slotPoints);
  }
}
