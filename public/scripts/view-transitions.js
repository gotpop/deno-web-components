export function initViewTransitions() {
  if (!document.startViewTransition) {
    console.log(
      "[view-transitions.js] View Transitions API not supported. Falling back to standard navigation.",
    )
    return {
      navigate: (urlObject) => {
        console.log(
          "[view-transitions.js] Fallback navigate to:",
          urlObject.href,
        )
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
    console.log(`[ViewTransitions] performNavigation START for: ${url.href}`)
    try {
      await document.fonts.ready
      console.log(`[ViewTransitions] Fonts ready for: ${url.href}`)

      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Pragma": "no-cache",
          "Cache-Control": "no-cache",
        },
      })
      console.log(
        `[ViewTransitions] Fetch response status: ${response.status} for: ${url.href}`,
      )
      if (!response.ok) throw Error(`HTTP ${response.status}`)

      const html = await response.text()
      const newDoc = new DOMParser().parseFromString(html, "text/html")
      console.log(`[ViewTransitions] HTML parsed for: ${url.href}`)

      const transition = document.startViewTransition(async () => {
        console.log(
          `[ViewTransitions] ViewTransition: update DOM START for: ${url.href}`,
        )
        document.documentElement.replaceChildren(
          ...newDoc.documentElement.childNodes,
        )
        await waitForStylesheets(document)
        console.log(
          `[ViewTransitions] ViewTransition: update DOM END & stylesheets loaded for: ${url.href}`,
        )
        window.scrollTo(0, 0)
      })

      await transition.finished
      console.log(`[ViewTransitions] ViewTransition: FINISHED for: ${url.href}`)

      history.pushState({}, "", url.href)
      console.log(
        `[ViewTransitions] history.pushState CALLED for: ${url.href}. Current window.location.href: ${window.location.href}`,
      )
      // Check if URL actually changed
      if (window.location.href !== url.href) {
        console.warn(
          `[ViewTransitions] WARNING: window.location.href (${window.location.href}) did NOT update to target (${url.href}) after pushState.`,
        )
      }

      // Dispatch custom event to signal navigation completion and DOM update
      console.log("[ViewTransitions] Dispatching app:navigationend event")
      document.dispatchEvent(
        new CustomEvent("app:navigationend", { bubbles: true, composed: true }),
      )
    } catch (err) {
      console.error(
        `[ViewTransitions] performNavigation FAILED for: ${url.href}`,
        err,
      )
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
    // For non-hash popstate, consider if a full reload or performNavigation is needed
    // For simplicity, keeping reload, but performNavigation(new URL(location.href)) could be an option.
    location.reload()
  })

  return { navigate: performNavigation }
}
