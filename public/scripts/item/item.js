import { loadCSS } from "../utils/loadCss.js";

export class GridItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const article = document.createElement("article");
    const slot = document.createElement("slot");

    const cssPath = new URL("./item.css", import.meta.url).href;
    loadCSS(cssPath, shadow);

    article.appendChild(slot);
    shadow.appendChild(article);
  }
}
