import { loadCSS } from "../../utils/loadCss.js";

export class NavItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Create anchor element
    const anchor = document.createElement("a");
    anchor.setAttribute("part", "anchor"); // Allows external styling if needed

    // Create slot and put it inside anchor
    const slot = document.createElement("slot");
    anchor.appendChild(slot);

    const cssPath = new URL("./nav-item.css", import.meta.url).href;
    loadCSS(cssPath, shadow);

    // Append anchor to shadow DOM
    shadow.appendChild(anchor);
  }
}
