/**
 * Performance optimization utilities for view transitions
 * Adapts animations based on device capabilities
 */

export class PerformanceOptimizer {
  constructor() {
    this.deviceCapabilities = this.assessDeviceCapabilities()
    this.applyOptimizations()
  }

  assessDeviceCapabilities() {
    const capabilities = {
      cpuCores: navigator.hardwareConcurrency || 1,
      memory: navigator.deviceMemory || 1,
      connection: navigator.connection,
      pixelRatio: window.devicePixelRatio || 1,
      isLowEnd: false,
      performanceLevel: "medium",
    }

    // Assess if device is low-end
    const hasLowCores = capabilities.cpuCores <= 2
    const hasLowMemory = capabilities.memory <= 2
    const hasSlowConnection = capabilities.connection &&
      (capabilities.connection.effectiveType === "slow-2g" ||
        capabilities.connection.effectiveType === "2g" ||
        capabilities.connection.saveData === true)
    const hasLowPixelRatio = capabilities.pixelRatio < 1.5

    // Determine performance level
    if (hasLowCores || hasLowMemory || hasSlowConnection) {
      capabilities.isLowEnd = true
      capabilities.performanceLevel = "low"
    } else if (capabilities.cpuCores >= 8 && capabilities.memory >= 8) {
      capabilities.performanceLevel = "high"
    }

    return capabilities
  }

  applyOptimizations() {
    const html = document.documentElement

    // Add performance classes
    html.classList.add(
      `performance-${this.deviceCapabilities.performanceLevel}`,
    )

    if (this.deviceCapabilities.isLowEnd) {
      html.classList.add("low-end-device")
    } else {
      html.classList.add("high-end-device")
    }

    // Set CSS custom properties for dynamic optimization
    html.style.setProperty(
      "--cpu-cores",
      this.deviceCapabilities.cpuCores.toString(),
    )
    html.style.setProperty(
      "--device-memory",
      this.deviceCapabilities.memory.toString(),
    )
    html.style.setProperty(
      "--performance-level",
      this.deviceCapabilities.performanceLevel,
    )

    // Adjust animation durations based on performance
    this.setAnimationDurations()

    // Log capabilities for debugging
    this.logCapabilities()
  }

  setAnimationDurations() {
    const html = document.documentElement

    switch (this.deviceCapabilities.performanceLevel) {
      case "low":
        html.style.setProperty("--view-transition-duration", "100ms")
        html.style.setProperty("--animation-complexity", "minimal")
        break
      case "medium":
        html.style.setProperty("--view-transition-duration", "250ms")
        html.style.setProperty("--animation-complexity", "standard")
        break
      case "high":
        html.style.setProperty("--view-transition-duration", "300ms")
        html.style.setProperty("--animation-complexity", "enhanced")
        break
    }
  }

  // Method to temporarily boost performance for critical animations
  enablePerformanceMode() {
    const pageElements = document.querySelectorAll(
      ".page, [view-transition-name]",
    )
    pageElements.forEach((element) => {
      element.style.willChange = "transform, opacity"
      element.style.transform = "translateZ(0)"
      element.style.backfaceVisibility = "hidden"
    })

    // Auto-cleanup after animation completes
    setTimeout(() => this.disablePerformanceMode(), 500)
  }

  disablePerformanceMode() {
    const pageElements = document.querySelectorAll(
      ".page, [view-transition-name]",
    )
    pageElements.forEach((element) => {
      element.style.willChange = ""
      element.style.transform = ""
      element.style.backfaceVisibility = ""
    })
  }

  // Throttle frame rate for very weak devices
  setupFrameRateThrottling() {
    if (this.deviceCapabilities.performanceLevel === "low") {
      // Force lower frame rate for weak devices using requestAnimationFrame throttling
      let lastFrameTime = 0
      const targetFrameRate = 30 // 30fps instead of 60fps
      const frameInterval = 1000 / targetFrameRate

      const originalRAF = window.requestAnimationFrame
      window.requestAnimationFrame = (callback) => {
        return originalRAF((currentTime) => {
          if (currentTime - lastFrameTime >= frameInterval) {
            lastFrameTime = currentTime
            callback(currentTime)
          } else {
            originalRAF((nextTime) => {
              if (nextTime - lastFrameTime >= frameInterval) {
                lastFrameTime = nextTime
                callback(nextTime)
              }
            })
          }
        })
      }
    }
  }

  logCapabilities() {
    // Only log if debug mode is enabled
    if (!globalThis.DEBUG_PERFORMANCE && !window.DEBUG_PERFORMANCE) return

    console.group("🚀 Performance Optimizer")
    console.log("Device Capabilities:", this.deviceCapabilities)
    console.log("Optimizations Applied:", {
      performanceLevel: this.deviceCapabilities.performanceLevel,
      isLowEnd: this.deviceCapabilities.isLowEnd,
      animationDuration: getComputedStyle(
        document.documentElement,
      ).getPropertyValue("--view-transition-duration"),
    })
    console.groupEnd()
  }

  // Monitor performance during transitions
  monitorTransitionPerformance() {
    if (!("PerformanceObserver" in window)) return

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (
          entry.name.includes("view-transition") ||
          entry.entryType === "navigation"
        ) {
          // Only log if debug mode is enabled
          if (globalThis.DEBUG_PERFORMANCE || window.DEBUG_PERFORMANCE) {
            console.log(
              `Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`,
            )
          }

          // Auto-adjust if performance is poor
          if (
            entry.duration > 100 &&
            this.deviceCapabilities.performanceLevel !== "low"
          ) {
            if (globalThis.DEBUG_PERFORMANCE || window.DEBUG_PERFORMANCE) {
              console.warn(
                "Poor animation performance detected, reducing complexity",
              )
            }
            this.reduceAnimationComplexity()
          }
        }
      })
    })

    try {
      observer.observe({ entryTypes: ["measure", "navigation"] })
    } catch (e) {
      console.warn("Performance monitoring not available:", e)
    }
  }

  reduceAnimationComplexity() {
    const html = document.documentElement
    html.style.setProperty("--view-transition-duration", "150ms")
    html.classList.add("reduced-motion-auto")
  }

  // Preload optimization for smoother transitions
  preloadNextPage(url) {
    if (this.deviceCapabilities.isLowEnd) return // Skip preloading on weak devices

    // Check if already preloaded to avoid duplicates
    const existingPrefetch = document.querySelector(
      `link[rel="prefetch"][href="${url}"]`,
    )
    if (existingPrefetch) return

    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = url

    // Remove prefetch after a short delay to avoid browser warnings
    const timeoutId = setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
    }, 2000) // Remove after 2 seconds if not used

    // Clean up timeout if page is actually navigated to
    link.addEventListener("load", () => {
      clearTimeout(timeoutId)
    })

    document.head.appendChild(link)
  }
}

// Export singleton instance
export const performanceOptimizer = new PerformanceOptimizer()
