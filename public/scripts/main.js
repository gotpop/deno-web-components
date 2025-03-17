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

      await document.startViewTransition(() => {
        document.documentElement.replaceChildren(
          ...newDoc.documentElement.childNodes,
        )
        window.scrollTo(0, 0)
      }).finished

      history.pushState({}, "", url)
    } catch (err) {
      console.error("Navigation failed:", err)
      location.href = url
    }
  })

  window.addEventListener("popstate", () => {
    location.reload()
  })
}

initViewTransitions()
