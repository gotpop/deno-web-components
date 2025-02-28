import { loadCSS } from "../../utils/loadCss.js";

export class GridItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.setAttribute("hidden", "");

    const article = document.createElement("article");
    const slot = document.createElement("slot");

    const cssPath = new URL("./grid-item.css", import.meta.url).href;

    loadCSS(cssPath, shadow, (success) => {
      if (success) {
        this.removeAttribute("hidden");
      }
    });

    article.appendChild(slot);
    shadow.appendChild(article);
  }
}
