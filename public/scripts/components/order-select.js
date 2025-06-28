/**
 * Initialize order select dropdown functionality
 */
export function initializeOrderSelect(viewTransitionManager) {
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
