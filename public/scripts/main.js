import { initWebComponents } from "./define-web-components.js"
import { FeatureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { performanceOptimizer } from "./utils/performance-optimizer.js"
import { initViewTransitions } from "./view-transitions/init.js"

const worklets = ["grid", "tetris", "tetris-grid"].map(
  (name) => `/scripts/worklets/worklet.${name}.js`,
)

worklets.forEach(async (worklet) => {
  try {
    if (!CSS?.paintWorklet) {
      throw new Error("CSS Paint Worklet API is not supported")
    }
    await CSS.paintWorklet.addModule(worklet)
    console.log(`Worklet loaded successfully: ${worklet}`)
  } catch (error) {
    console.error(`Failed to load worklet ${worklet}:`, error)
  }
})

initWebComponents()

new FeatureDetect(document.getElementById("feature-detect-popover")).init()

if (window.location.hostname === "localhost") {
  initLiveReload()
}

const viewTransitionManager = initViewTransitions()

function initializeOrderSelect() {
  const orderSelect = document.getElementById("order")
  console.log("Initializing order select. Found element:", orderSelect)

  if (orderSelect) {
    // Remove existing event listener to prevent duplicates if re-initializing
    // A more robust way would be to store the handler and remove it specifically,
    // but for this case, replacing the element or a simple flag might be enough.
    // For now, we'll rely on the fact that a new element is fetched or this is a first init.

    orderSelect.addEventListener("change", function () {
      const url = new URL(window.location.href)
      const params = new URLSearchParams(url.search)

      if (this.value) {
        params.set(this.name, this.value)
      } else {
        params.delete(this.name)
      }

      const newUrl = new URL(
        `${url.pathname}?${params.toString()}`,
        window.location.origin,
      )
      console.log("[main.js] Order select changed. Navigating to:", newUrl.href)
      if (viewTransitionManager && viewTransitionManager.navigate) {
        viewTransitionManager.navigate(newUrl)
      } else {
        window.location.href = newUrl.href
      }
    })
  } else {
    console.log("[main.js] Order select element not found on this page.")
  }
}

// Initialize performance-aware link preloading
function initPerformanceAwarePreloading() {
  if (performanceOptimizer.deviceCapabilities.isLowEnd) {
    // Skip preloading on low-end devices to save bandwidth and CPU
    return
  }

  // Preload links on hover for better perceived performance
  document.addEventListener("mouseover", (e) => {
    const link = e.target.closest("a[href]")
    if (link && link.hostname === location.hostname) {
      const url = new URL(link.href)
      if (url.pathname !== location.pathname) {
        performanceOptimizer.preloadNextPage(url.href)
      }
    }
  })
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  
  initializeOrderSelect()
  initPerformanceAwarePreloading()
  // initMobilePopover()
})

// Re-initialize after custom navigation event
document.addEventListener("app:navigationend", function () {
  console.log(
    "[main.js] app:navigationend event received. Re-initializing order select.",
  )
  initializeOrderSelect()
})



