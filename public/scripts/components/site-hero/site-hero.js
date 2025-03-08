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

    const cssPath = new URL("./site-hero-styletag.css", import.meta.url).href;
    const cssPathConstructed =
      new URL("./site-hero-constructed.css", import.meta.url).href;

    const cssConfig = {
      cssPath: cssPathConstructed,
      shadowRoot: shadow,
      callback: (success) => {
        if (success) {
          this.removeAttribute("hidden");
        }
      },
    };

    const cssConfigStyled = {
      cssPath: cssPath,
      shadowRoot: this,
      callback: (success) => {
        if (success) {
          this.removeAttribute("hidden");
        }
      },
      useStyletag: true,
    };

    loadCSS(cssConfig);
    loadCSS(cssConfigStyled);

    shadow.appendChild(slotContent);
    shadow.appendChild(slotPoints);
  }
}
