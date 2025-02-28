/**
 * Loads a CSS module and attaches it to a shadow root
 * @param {string} cssPath - Relative path to the CSS file
 * @param {ShadowRoot} shadowRoot - The shadow root to attach the styles to
 * @param {Function} [callback] - Optional callback when CSS is loaded
 * @returns {Promise<CSSStyleSheet|null>} - The loaded stylesheet or null if failed
 */
export async function loadCSS(cssPath, shadowRoot, callback) {
  try {
    // Using relative path and dynamic import
    const cssModule = await import(cssPath, {
      with: { type: "css" },
    });

    if (cssModule?.default) {
      shadowRoot.adoptedStyleSheets = [cssModule.default];

      if (typeof callback === "function") {
        callback(true);
      }

      return cssModule.default;
    } else {
      console.error("No default export found in CSS module");

      if (typeof callback === "function") {
        callback(false);
      }

      return null;
    }
  } catch (error) {
    console.error(`Failed to load CSS from ${cssPath}:`, error);

    if (typeof callback === "function") {
      callback(false);
    }

    return null;
  }
}
