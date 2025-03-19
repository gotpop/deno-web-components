import { FeatureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { initWebComponents } from "./define-web-components.js"

initWebComponents()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()

if (window.location.hostname === "localhost") {
  initLiveReload()
}

if ("paintWorklet" in CSS) {
  try {
    await CSS.paintWorklet.addModule("./worklets/worklet.grid.js")
  } catch (error) {
    console.warn("Worklet failed to load:", error)
  }
}

// CSS.paintWorklet.addModule("/scripts/worklets/worklet.grid.js")

export function initViewTransitions() {
  if (!document.startViewTransition) return

  async function waitForStylesheets(doc) {
    const links = [...doc.getElementsByTagName("link")]
    const stylesheets = links.filter((link) =>
      link.rel === "stylesheet" ||
      link.rel === "preload" && link.as === "style"
    )

    await Promise.all(
      stylesheets.map((link) => {
        if (link.rel === "preload") {
          link.rel = "stylesheet"
        }
        return link.sheet ? Promise.resolve() : new Promise((resolve) => {
          link.onload = resolve
          link.onerror = resolve // Continue even if style fails
        })
      }),
    )
  }

  document.addEventListener("click", async (e) => {
    const link = e.target.closest("a")
    if (!link || link.target || !link.href) return

    const url = new URL(link.href)

    // Handle same-page anchor links
    if (
      url.origin === location.origin && url.pathname === location.pathname &&
      url.hash
    ) {
      e.preventDefault()
      const element = document.querySelector(url.hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      history.pushState({}, "", url.hash)
      return
    }

    // Handle cross-page navigation
    if (url.origin !== location.origin) return

    e.preventDefault()

    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Pragma": "no-cache",
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) throw Error(`HTTP ${response.status}`)
      const html = await response.text()
      const newDoc = new DOMParser().parseFromString(html, "text/html")

      await document.startViewTransition(async () => {
        document.documentElement.replaceChildren(
          ...newDoc.documentElement.childNodes,
        )
        await waitForStylesheets(document)
        // window.scrollTo(0, 0)
      }).finished

      history.pushState({}, "", url)
    } catch (err) {
      console.error("Navigation failed:", err)
      location.href = url
    }
  })

  window.addEventListener("popstate", (e) => {
    // Handle hash changes without reload
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      e.preventDefault()
      return
    }
    location.reload()
  })
}

initViewTransitions()
