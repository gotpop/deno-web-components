import { FeatureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { initWebComponents } from "./define-web-components.js"

initWebComponents()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()

if (window.location.hostname === "localhost") {
  initLiveReload()
}

export function initViewTransitions() {
  if (!document.startViewTransition) return

  document.addEventListener("click", async (e) => {
    const link = e.target.closest("a")
    if (!link || link.target || !link.href) return

    const url = new URL(link.href)
    if (url.origin !== location.origin) return

    e.preventDefault()

    try {
      const response = await fetch(url)
      if (!response.ok) throw Error(`HTTP ${response.status}`)

      const html = await response.text()
      const newDoc = new DOMParser().parseFromString(html, "text/html")

      // Start transition before any DOM changes
      const transition = document.startViewTransition(async () => {
        // Re-initialize components and features
        const init = async () => {
          initWebComponents()
          new FeatureDetect(
            document.getElementById("feature-detect-popover"),
          ).init()
          if (window.location.hostname === "localhost") {
            initLiveReload()
          }
        }

        document.documentElement.replaceChildren(
          ...newDoc.documentElement.childNodes,
        )

        // Wait for DOM update before re-initializing
        await Promise.resolve()
        await init()
        window.scrollTo(0, 0)
      })

      // Wait for transition to complete
      await transition.finished
      history.pushState({}, "", url)
    } catch (err) {
      console.error("Navigation failed:", err)
      location.href = url
    }
  })

  // Handle back/forward navigation
  window.addEventListener("popstate", async () => {
    if (document.startViewTransition) {
      await document.startViewTransition(() => location.reload()).finished
    } else {
      location.reload()
    }
  })
}

// Initialize on page load
initViewTransitions()
