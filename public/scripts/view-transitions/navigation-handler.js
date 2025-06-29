import { determineTransitionType } from "./transition-type.js";
import { logger } from "../utils/logger.js";
import { performanceOptimizer } from "../utils/performance-optimizer.js";
import { waitForStylesheets } from "./stylesheet-loader.js";

export function initNavigationHandler() {
  if (!window.navigation) {
    return null;
  }

  // Initialize device optimization and performance monitoring
  performanceOptimizer.monitorTransitionPerformance();

  navigation.addEventListener("navigate", (e) => {
    const url = new URL(e.destination.url);

    // Capture the current URL BEFORE navigation starts
    const currentUrl = location.href;

    // Skip cross-origin navigations
    if (url.origin !== location.origin) return;

    // Handle same-page anchor links - let browser handle them
    if (url.pathname === location.pathname && url.hash) {
      return;
    }

    e.intercept({
      handler: async () => {
        await document.fonts.ready;

        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            Pragma: "no-cache",
            "Cache-Control": "no-cache",
          },
        });
        if (!response.ok) throw Error(`HTTP ${response.status}`);

        const html = await response.text();
        const newDoc = new DOMParser().parseFromString(html, "text/html");

        // Determine transition type using captured current URL
        const fromEntry = { url: currentUrl };
        const toEntry = { url: url.href };
        const transitionType = determineTransitionType(fromEntry, toEntry);
        logger.transition("from:", currentUrl);
        logger.transition("to:", url.href);
        logger.transition("transitionType:", transitionType);

        // Enable performance mode for the transition
        performanceOptimizer.enablePerformanceMode();

        const transition = document.startViewTransition(async () => {
          // Pre-optimize for performance
          const pageElement = document.querySelector(".page");
          if (
            pageElement &&
            !performanceOptimizer.deviceCapabilities.isLowEnd
          ) {
            pageElement.classList.add("gpu-accelerated");
          }

          // Remove speculation rules script from new document to prevent re-insertion warning
          const speculationScript = newDoc.querySelector(
            'script[type="speculationrules"]'
          );
          if (speculationScript) {
            speculationScript.remove();
          }

          document.documentElement.replaceChildren(
            ...newDoc.documentElement.childNodes
          );
          await waitForStylesheets(document);
          window.scrollTo(0, 0);
        });

        // Set the transition type on the document element
        if (transitionType !== "unknown") {
          transition.types.add(transitionType);
        }

        await transition.finished;

        // Dispatch custom event to signal navigation completion and DOM update
        document.dispatchEvent(
          new CustomEvent("app:navigationend", {
            bubbles: true,
            composed: true,
          })
        );
      },
    });
  });

  return {
    navigate: (url) => navigation.navigate(url.href),
  };
}
