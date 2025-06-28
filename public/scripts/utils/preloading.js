import { performanceOptimizer } from "../utils/performance-optimizer.js"

/**
 * Initialize performance-aware link preloading
 */
export function initPerformanceAwarePreloading() {
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
