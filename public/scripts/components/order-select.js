export function initializeOrderSelect(viewTransitionManager) {
  const orderSelect = document.getElementById("order")


  if (orderSelect) {
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
