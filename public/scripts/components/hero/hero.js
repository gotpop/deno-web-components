import { loadCSS } from "../../utils/loadCss.js";

export class Hero extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const section = document.createElement("section");
    const h1 = document.createElement("h1");
    const slot = document.createElement("slot");

    // Set content and attributes
    h1.textContent = "Hero Title";
    h1.className = "hero-title";
    section.className = "hero";

    // Load CSS
    const cssPath = new URL("./hero.css", import.meta.url).href;
    loadCSS(cssPath, shadow);

    // Build component structure
    section.appendChild(h1);
    section.appendChild(slot);
    shadow.appendChild(section);
  }
}
