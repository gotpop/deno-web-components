import { initNavigationHandler } from "./navigation-handler.js";

/**
 * Initialize View Transitions API
 *
 * Logging can be controlled with environment variables:
 * - DEBUG_VIEW_TRANSITIONS: OFF|ERROR|WARN|INFO|DEBUG
 * - LOG_LEVEL: OFF|ERROR|WARN|INFO|DEBUG
 *
 * Example: window.DEBUG_VIEW_TRANSITIONS = 'DEBUG' for verbose logging
 */
export function initViewTransitions() {
  if (!document.startViewTransition || !window.navigation) {
    return {
      navigate: (urlObject) => {
        window.location.href = urlObject.href;
      },
    };
  }

  return initNavigationHandler();
}
