import { initNavigationHandler } from "./navigation-handler.js"

export function initViewTransitions() {
  if (!document.startViewTransition || !window.navigation) {
    return {
      navigate: (urlObject) => {
        window.location.href = urlObject.href
      },
    }
  }

  return initNavigationHandler()
}
