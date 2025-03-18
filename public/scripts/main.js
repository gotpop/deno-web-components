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

  async function updateDOM(newDoc) {
    // Create init function outside transition
    // const init = async () => {
    //   try {
    //     await initWebComponents()
    //     const popover = document.getElementById("feature-detect-popover")
    //     if (popover) {
    //       new FeatureDetect(popover).init()
    //     }
    //     if (window.location.hostname === "localhost") {
    //       initLiveReload()
    //     }
    //   } catch (error) {
    //     console.error("Init error:", error)
    //   }
    // }

    return document.startViewTransition(async () => {
      // Update DOM
      document.documentElement.replaceChildren(
        ...newDoc.documentElement.childNodes,
      )

      // Ensure DOM is updated before continuing
      await new Promise((resolve) => requestAnimationFrame(resolve))
      await init()
      window.scrollTo(0, 0)
    }).finished
  }

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

      await updateDOM(newDoc)
      history.pushState({}, "", url)
    } catch (err) {
      console.error("Navigation failed:", err)
      location.href = url
    }
  })

  // Handle back/forward navigation
  window.addEventListener("popstate", async () => {
    try {
      const response = await fetch(location.href)
      const html = await response.text()
      const newDoc = new DOMParser().parseFromString(html, "text/html")
      await updateDOM(newDoc)
    } catch {
      location.reload()
    }
  })
}

// initViewTransitions()
