import { determineTransitionType } from "./utils/transition-type.js"
import { waitForStylesheets } from "./utils/stylesheet-loader.js"

export function initNavigationHandler() {
  if (!window.navigation) {
    return null
  }

  navigation.addEventListener("navigate", (e) => {
    const url = new URL(e.destination.url)

    // Capture the current URL BEFORE navigation starts
    const currentUrl = location.href

    // Skip cross-origin navigations
    if (url.origin !== location.origin) return

    // Handle same-page anchor links - let browser handle them
    if (url.pathname === location.pathname && url.hash) {
      return
    }

    e.intercept({
      handler: async () => {
        await document.fonts.ready

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

        // Determine transition type using captured current URL
        const fromEntry = { url: currentUrl }
        const toEntry = { url: url.href }
        const transitionType = determineTransitionType(fromEntry, toEntry)
        console.log("from:", currentUrl)
        console.log("to:", url.href)
        console.log("transitionType :", transitionType)

        const transition = document.startViewTransition(async () => {
          document.documentElement.replaceChildren(
            ...newDoc.documentElement.childNodes,
          )
          await waitForStylesheets(document)
          window.scrollTo(0, 0)
        })

        // Set the transition type on the document element
        if (transitionType !== "unknown") {
          transition.types.add(transitionType)
        }

        await transition.finished

        // Dispatch custom event to signal navigation completion and DOM update
        document.dispatchEvent(
          new CustomEvent("app:navigationend", {
            bubbles: true,
            composed: true,
          }),
        )
      },
    })
  })

  return {
    navigate: (url) => navigation.navigate(url.href),
  }
}
