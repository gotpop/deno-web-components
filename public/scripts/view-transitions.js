// Feature ordering based on the allFeatures array from features/index.ts
const FEATURE_ORDER = [
  "css-anchor-position-1",
  "css-mixins",
  "css-paint-api",
  "css-properties-values-api",
  "css-typed-om",
  "css-values-5",
  "custom-elements",
  "css-view-transitions-2",
  "popover-api",
]

function extractPageIndexFromPath(pathname) {
  // Handle main pages with a base index
  if (pathname === "/" || pathname === "/index") return 0
  if (pathname === "/about") return 100
  if (pathname === "/contact") return 200
  if (pathname === "/features") return 300
  if (pathname === "/test") return 350

  // Handle individual feature pages
  const featureMatch = pathname.match(/^\/features\/(.+)$/)
  if (featureMatch) {
    const featureSlug = featureMatch[1]
    const featureIndex = FEATURE_ORDER.indexOf(featureSlug)
    // Features start at index 400 to avoid conflicts with main pages
    return featureIndex !== -1 ? 400 + featureIndex : 999
  }

  return 999 // Unknown pages get highest index
}

const determineTransitionType = (fromNavigationEntry, toNavigationEntry) => {
  const currentURL = new URL(fromNavigationEntry.url)
  const destinationURL = new URL(toNavigationEntry.url)

  const currentPathname = currentURL.pathname
  const destinationPathname = destinationURL.pathname

  if (currentPathname === destinationPathname) {
    return "reload"
  } else {
    const currentPageIndex = extractPageIndexFromPath(currentPathname)
    console.log("currentPageIndex :", currentPageIndex)
    const destinationPageIndex = extractPageIndexFromPath(destinationPathname)
    console.log("destinationPageIndex :", destinationPageIndex)

    // Handle circular navigation for features
    const isCurrentFeature = currentPageIndex >= 400 && currentPageIndex < 999
    const isDestinationFeature = destinationPageIndex >= 400 &&
      destinationPageIndex < 999

    if (isCurrentFeature && isDestinationFeature) {
      const currentFeatureIndex = currentPageIndex - 400
      const destinationFeatureIndex = destinationPageIndex - 400
      const totalFeatures = FEATURE_ORDER.length

      // Calculate the shortest path considering circular navigation
      const forwardDistance =
        (destinationFeatureIndex - currentFeatureIndex + totalFeatures) %
        totalFeatures
      const backwardDistance =
        (currentFeatureIndex - destinationFeatureIndex + totalFeatures) %
        totalFeatures

      console.log("forwardDistance :", forwardDistance)
      console.log("backwardDistance :", backwardDistance)

      // If forward distance is shorter or equal, go forwards; otherwise go backwards
      if (forwardDistance <= backwardDistance) {
        return "forwards"
      } else {
        return "backwards"
      }
    }

    // Handle regular navigation (non-circular)
    if (currentPageIndex > destinationPageIndex) {
      return "backwards"
    }
    if (currentPageIndex < destinationPageIndex) {
      return "forwards"
    }

    return "unknown"
  }
}

export function initViewTransitions() {
  if (!document.startViewTransition) {
    return {
      navigate: (urlObject) => {
        window.location.href = urlObject.href
      },
    }
  }

  async function waitForStylesheets(doc) {
    const links = [...doc.getElementsByTagName("link")]
    const stylesheets = links.filter((link) =>
      link.rel === "stylesheet" ||
      (link.rel === "preload" && link.as === "style")
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

  async function performNavigation(url) {
    try {
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

      // Determine transition type
      const fromEntry = { url: window.location.href }
      const toEntry = { url: url.href }
      const transitionType = determineTransitionType(fromEntry, toEntry)
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

      history.pushState({}, "", url.href)

      // Dispatch custom event to signal navigation completion and DOM update
      document.dispatchEvent(
        new CustomEvent("app:navigationend", { bubbles: true, composed: true }),
      )
    } catch (err) {
      window.location.href = url.href // Fallback
    }
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
      location.hash = url.hash.substring(1)
      const element = document.querySelector(url.hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      return
    }

    // Handle SPA navigation for same-origin links
    if (url.origin === location.origin) {
      e.preventDefault()
      await performNavigation(url)
    }
    // Cross-origin links will be handled by the browser by default
  })

  window.addEventListener("popstate", async (e) => {
    // Handle hash changes without reload
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      e.preventDefault()
      return
    }

    // Use performNavigation for browser back/forward to get proper transitions
    if (document.startViewTransition) {
      await performNavigation(new URL(location.href))
    } else {
      location.reload()
    }
  })

  return { navigate: performNavigation }
}
