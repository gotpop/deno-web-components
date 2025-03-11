/**
 * Loads a CSS module and attaches it to a shadow root
 * @param {string} cssPath - Relative path to the CSS file
 * @param {ShadowRoot} shadowRoot - The shadow root to attach the styles to
 * @param {Function} [callback] - Optional callback when CSS is loaded
 * @param {boolean} [useStyletag=false] - Whether to use style tag instead of adoptedStyleSheets
 * @returns {Promise<CSSStyleSheet|HTMLStyleElement|null>} - The loaded stylesheet/style element or null if failed
 */
export async function loadCSS(
  { cssPath, shadowRoot, callback, useStyletag = false },
) {
  try {
    // Using relative path and dynamic import
    const cssModule = await import(cssPath, {
      with: { type: "css" },
    })

    if (cssModule?.default) {
      if (useStyletag) {
        // Use traditional style tag approach
        const styleElement = document.createElement("style")

        // Extract actual CSS text from the stylesheet
        const sheet = cssModule.default
        let cssText = ""
        for (const rule of sheet.cssRules) {
          cssText += rule.cssText + "\n"
        }

        styleElement.textContent = cssText
        shadowRoot.appendChild(styleElement)

        if (typeof callback === "function") {
          callback(true)
        }

        return styleElement
      } else {
        // Default: Use adoptedStyleSheets (constructable stylesheets)
        shadowRoot.adoptedStyleSheets = [cssModule.default]

        if (typeof callback === "function") {
          callback(true)
        }

        return cssModule.default
      }
    } else {
      console.error("No default export found in CSS module")

      if (typeof callback === "function") {
        callback(false)
      }

      return null
    }
  } catch (error) {
    console.error(`Failed to load CSS from ${cssPath}:`, error)

    if (typeof callback === "function") {
      callback(false)
    }

    return null
  }
}
