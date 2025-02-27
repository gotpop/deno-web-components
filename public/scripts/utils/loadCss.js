/**
 * Loads a CSS module and attaches it to a shadow root
 * @param {string} cssPath - Relative path to the CSS file
 * @param {ShadowRoot} shadowRoot - The shadow root to attach the styles to
 * @returns {Promise<CSSStyleSheet|null>} - The loaded stylesheet or null if failed
 */
export async function loadCSS(cssPath, shadowRoot) {
  try {
    // Using relative path and dynamic import
    const cssModule = await import(cssPath, {
      with: { type: "css" },
    });

    if (cssModule?.default) {
      shadowRoot.adoptedStyleSheets = [cssModule.default];
      return cssModule.default;
    } else {
      console.error("No default export found in CSS module");
      return null;
    }
  } catch (error) {
    console.error(`Failed to load CSS from ${cssPath}:`, error);
    return null;
  }
}
