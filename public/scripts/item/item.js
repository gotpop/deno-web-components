const cssPath = "./item.css";

export class GridItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const article = document.createElement("article");
    const slot = document.createElement("slot");

    const loadCSS = async () => {
      try {
        // Using relative path and dynamic import
        const cssModule = await import(cssPath, {
          with: { type: "css" },
        });

        console.log("cssModule :", cssModule.default);

        if (cssModule?.default) {
          shadow.adoptedStyleSheets = [cssModule.default];
        } else {
          console.error("No default export found in CSS module");
        }
      } catch (error) {
        console.error("Failed to load CSS:", error);
      }
    };

    loadCSS();

    article.appendChild(slot);
    shadow.appendChild(article);
  }
}
